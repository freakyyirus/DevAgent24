import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize Supabase only if keys exist to prevent local dev crashes
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

interface Judge0Response {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: { id: number; description: string };
  time: string;
  memory: number;
}

const LANGUAGE_IDS: Record<string, number> = {
  python: 71,
  javascript: 63,
  typescript: 74,
  java: 62,
  go: 60,
  rust: 73,
  cpp: 54,
  ruby: 72,
};

const executeSchema = z.object({
  code: z.string().min(1, "Code cannot be empty").max(100000, "Code is too long"),
  language: z.string().refine((val) => Object.keys(LANGUAGE_IDS).includes(val), {
    message: "Invalid or unsupported language",
  }),
  tests: z.string().optional(),
  challengeId: z.string().optional(),
  userId: z.string().optional(),
});

// Test shims so that the `_run_test` or `test()` calls from challenges-data.ts actually work in Judge0
const TEST_SHIMS: Record<string, string> = {
  python: `
def _run_test(name, fn):
    try:
        fn()
        print(f"✓ {name}")
    except AssertionError:
        print(f"✗ {name}: Assertion failed")
    except Exception as e:
        print(f"✗ {name}: {str(e)}")
`,
  javascript: `
function test(name, fn) {
    try {
        fn();
        console.log("✓ " + name);
    } catch (e) {
        console.log("✗ " + name + ": " + e.message);
    }
}
const expect = (actual) => ({
    toBe: (expected) => { if (actual !== expected) throw new Error("Expected " + expected + " got " + actual); },
    toEqual: (expected) => { if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error("Expected " + JSON.stringify(expected) + " got " + JSON.stringify(actual)); },
    toContain: (expected) => { if (!actual.includes(expected)) throw new Error("Expected to contain " + expected); }
});
`,
  typescript: `
function test(name: string, fn: () => void) {
    try {
        fn();
        console.log("✓ " + name);
    } catch (e: any) {
        console.log("✗ " + name + ": " + (e.message || 'Error'));
    }
}
const expect = (actual: any) => ({
    toBe: (expected: any) => { if (actual !== expected) throw new Error("Expected " + expected + " got " + actual); },
    toEqual: (expected: any) => { if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error("Expected " + JSON.stringify(expected) + " got " + JSON.stringify(actual)); },
    toContain: (expected: any) => { if (!actual.includes(expected)) throw new Error("Expected to contain " + expected); }
});
`
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request body
    const parseResult = executeSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: 'Validation failed', details: parseResult.error.issues }, { status: 400 });
    }

    const { code, language, tests, challengeId, userId } = parseResult.data;

    const apiKey = process.env.JUDGE0_API_KEY;
    if (!apiKey) {
      // Mock execution for local testing if no API key is set
      return mockExecution(code, tests || '');
    }

    // Prepare full code with test shims
    const shim = TEST_SHIMS[language] || '';
    const fullCode = tests ? (code + '\n\n' + shim + '\n\n' + tests) : code;

    // Send to Judge0
    const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
      body: JSON.stringify({
        language_id: LANGUAGE_IDS[language],
        source_code: Buffer.from(fullCode).toString('base64'),
        cpu_time_limit: 5,
        memory_limit: 128000,
      }),
    });

    if (!response.ok) {
      console.error('Judge0 response error:', await response.text());
      throw new Error('Judge0 API error');
    }

    const result: Judge0Response = await response.json();
    
    // Parse the outputs
    const stdout = result.stdout ? Buffer.from(result.stdout, 'base64').toString() : '';
    const stderr = result.stderr ? Buffer.from(result.stderr, 'base64').toString() : '';
    const compileOutput = result.compile_output ? Buffer.from(result.compile_output, 'base64').toString() : '';
    
    const outputString = stdout || compileOutput || stderr || 'No output';
    
    // Check tests logic
    const lines = outputString.split('\n');
    let testsPassed = lines.filter(l => l.includes('✓') || l.includes('PASS')).length;
    const testsFailed = lines.filter(l => l.includes('✗') || l.includes('FAIL') || l.includes('AssertionError')).length;
    
    let totalTests = testsPassed + testsFailed;
    // If we didn't use our test shims, count success via exit code id=3
    if (totalTests === 0) {
      totalTests = 1;
      if (result.status.id === 3) testsPassed = 1; // accepted
    }

    const allPassed = testsPassed === totalTests && result.status.id === 3;

    // Save attempt to database
    if (userId && challengeId && supabase) {
      await supabase.from('challenge_attempts').insert({
        user_id: userId,
        challenge_id: challengeId,
        status: allPassed ? 'completed' : 'red',
        user_code: code,
        completed_at: allPassed ? new Date().toISOString() : null,
      });
    }

    return NextResponse.json({
      status: allPassed ? 'success' : 'error',
      output: outputString,
      tests_passed: testsPassed,
      tests_total: totalTests,
      execution_time_ms: Math.round((parseFloat(result.time) || 0) * 1000),
      memory_kb: result.memory || 0,
      mode: 'judge0'
    });
  } catch (error) {
    console.error('Execution error:', error);
    return NextResponse.json({ error: 'Execution failed', status: 'error', output: 'Internal server error while executing' }, { status: 500 });
  }
}

function mockExecution(code: string, tests: string) {
  const hasReturn = code.includes('return') || code.includes('=>') || code.includes('print');
  const isStub = code.includes('pass') || code.includes('return []') || code.includes('return false');

  let output = '';
  let passed = 0;
  const total = 5;

  if (isStub || !hasReturn) {
    output = '❌ Tests Failed (0/' + total + ' passed)\n\n  ✗ Test 1: Expected return value\n  ✗ Test 2: Function not implemented\n\nPhase: RED — Write code to make tests pass!';
    passed = 0;
  } else {
    output = '✅ All Tests Passed (' + total + '/' + total + ')\n\n  ✓ Test 1: Basic case\n  ✓ Test 2: Edge case\n  ✓ Test 3: Large input\n  ✓ Test 4: Boundary values\n  ✓ Test 5: Special characters\n\nExecution time: ' + (Math.floor(Math.random() * 100) + 20) + 'ms\nMemory: 2048KB';
    passed = total;
  }

  return NextResponse.json({
    status: passed === total ? 'success' : 'error',
    output,
    tests_passed: passed,
    tests_total: total,
    execution_time_ms: Math.floor(Math.random() * 100) + 20,
    memory_kb: 2048,
    mode: 'demo'
  });
}

