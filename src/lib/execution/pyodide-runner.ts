// Pyodide Runner — Browser-based Python execution via WebAssembly
// This runs entirely client-side with zero server cost

export interface PyodideResult {
  success: boolean;
  output: string;
  error?: string;
  executionTimeMs: number;
}

let pyodideInstance: unknown = null;
let pyodideLoading = false;

export async function loadPyodideRuntime(): Promise<unknown> {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoading) {
    // Wait for existing load
    while (pyodideLoading) {
      await new Promise((r) => setTimeout(r, 100));
    }
    return pyodideInstance;
  }

  pyodideLoading = true;
  try {
    // Dynamic import — Pyodide is loaded from CDN
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { loadPyodide } = await (window as any).eval(
      `import('https://cdn.jsdelivr.net/npm/pyodide@0.25.0/pyodide.mjs')`
    );
    pyodideInstance = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/npm/pyodide@0.25.0/',
    });
    return pyodideInstance;
  } catch (error) {
    console.error('Failed to load Pyodide:', error);
    throw error;
  } finally {
    pyodideLoading = false;
  }
}

export async function runPython(code: string): Promise<PyodideResult> {
  const start = performance.now();

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pyodide = (await loadPyodideRuntime()) as any;

    // Capture stdout
    pyodide.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
    `);

    // Execute user code
    await pyodide.runPythonAsync(code);

    // Get output
    const stdout = pyodide.runPython('sys.stdout.getvalue()');
    const stderr = pyodide.runPython('sys.stderr.getvalue()');

    // Reset stdout
    pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
    `);

    return {
      success: !stderr,
      output: stdout || '(no output)',
      error: stderr || undefined,
      executionTimeMs: performance.now() - start,
    };
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : String(error),
      executionTimeMs: performance.now() - start,
    };
  }
}

export async function runPythonTDD(
  userCode: string,
  testCode: string
): Promise<PyodideResult & { testsPassed: number; testsTotal: number }> {
  const combinedCode = `
${userCode}

# === TEST HARNESS ===
import json as _json

_test_results = []
_passed = 0
_total = 0

def _run_test(name, fn):
    global _passed, _total
    _total += 1
    try:
        fn()
        _passed += 1
        _test_results.append({"name": name, "passed": True})
    except AssertionError as e:
        _test_results.append({"name": name, "passed": False, "error": str(e)})
    except Exception as e:
        _test_results.append({"name": name, "passed": False, "error": str(e)})

${testCode}

print(f"Tests passed: {_passed}/{_total}")
for r in _test_results:
    status = "✓" if r["passed"] else "✗"
    msg = f"  {status} {r['name']}"
    if not r["passed"]:
        msg += f" — {r.get('error', 'Failed')}"
    print(msg)
`;

  const result = await runPython(combinedCode);

  // Parse test results from output
  const match = result.output.match(/Tests passed: (\d+)\/(\d+)/);
  const testsPassed = match ? parseInt(match[1]) : 0;
  const testsTotal = match ? parseInt(match[2]) : 0;

  return {
    ...result,
    testsPassed,
    testsTotal,
  };
}
