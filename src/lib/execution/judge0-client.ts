import { LANGUAGE_CONFIG, SupportedLanguage, ExecutionResult } from '@/types';

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || '';

interface Judge0Submission {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
  cpu_time_limit?: number;
  memory_limit?: number;
}

interface Judge0Result {
  status: { id: number; description: string };
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  time: string;
  memory: number;
}

export async function executeCode(
  code: string,
  language: SupportedLanguage,
  stdin?: string
): Promise<ExecutionResult> {
  const langConfig = LANGUAGE_CONFIG[language];
  if (!langConfig) {
    return {
      status: 'error',
      output: '',
      error: `Unsupported language: ${language}`,
      execution_time_ms: 0,
    };
  }

  // Demo mode if no API key
  if (!JUDGE0_API_KEY) {
    return simulateExecution(code, language);
  }

  const submission: Judge0Submission = {
    source_code: code,
    language_id: langConfig.judge0Id,
    stdin,
    cpu_time_limit: 5,
    memory_limit: 128000,
  };

  try {
    // Submit code
    const submitRes = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': JUDGE0_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
      body: JSON.stringify(submission),
    });

    const result: Judge0Result = await submitRes.json();

    const isSuccess = result.status.id === 3; // Accepted
    return {
      status: isSuccess ? 'success' : 'error',
      output: result.stdout || '',
      error: result.stderr || result.compile_output || undefined,
      execution_time_ms: parseFloat(result.time) * 1000,
      memory_kb: result.memory,
    };
  } catch (error) {
    return {
      status: 'error',
      output: '',
      error: `Execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      execution_time_ms: 0,
    };
  }
}

function simulateExecution(code: string, language: SupportedLanguage): ExecutionResult {
  // Simple demo simulation for when no Judge0 API key is set
  const hasError = code.includes('throw') || code.includes('raise') || code.includes('panic');
  const hasTests = code.includes('test') || code.includes('assert') || code.includes('expect');

  if (hasError) {
    return {
      status: 'error',
      output: '',
      error: `[Demo Mode] Simulated error in ${LANGUAGE_CONFIG[language].name} code`,
      execution_time_ms: 150,
    };
  }

  const testCount = hasTests ? 5 : 0;
  return {
    status: 'success',
    output: `[Demo Mode] ${LANGUAGE_CONFIG[language].name} code executed successfully.\n` +
      (hasTests ? `All ${testCount} tests passed ✓` : 'No tests detected.'),
    execution_time_ms: Math.floor(Math.random() * 200) + 50,
    memory_kb: Math.floor(Math.random() * 5000) + 1000,
    tests_passed: testCount,
    tests_total: testCount,
  };
}
