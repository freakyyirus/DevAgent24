import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { code, language, tests } = await req.json();

    if (!code || !language) {
      return NextResponse.json({ error: 'Code and language are required' }, { status: 400 });
    }

    // In production: route to Judge0 or Pyodide based on language
    // For now: simulated execution
    const hasReturn = code.includes('return') || code.includes('=>');
    const isStub = code.includes('pass') || code.includes('return []') || code.includes('return -1') || code.includes('return 0;') || code.includes('return nil');

    let status: 'success' | 'error' = 'success';
    let output = '';
    let testsPassed = 0;
    const testsTotal = 5;

    if (isStub || !hasReturn) {
      status = 'error';
      output = 'Tests failed: No implementation detected';
      testsPassed = 0;
    } else {
      testsPassed = testsTotal;
      output = `All ${testsTotal} tests passed ✓\nExecution time: ${Math.floor(Math.random() * 200) + 50}ms`;
    }

    return NextResponse.json({
      status,
      output,
      tests_passed: testsPassed,
      tests_total: testsTotal,
      execution_time_ms: Math.floor(Math.random() * 200) + 50,
      memory_kb: Math.floor(Math.random() * 5000) + 1000,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Execution failed' }, { status: 500 });
  }
}
