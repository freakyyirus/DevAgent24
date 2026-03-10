'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { getChallengeById } from '@/lib/challenges-data';
import { LANGUAGE_CONFIG, type SupportedLanguage, type TDDPhase } from '@/types';
import {
  Play,
  RotateCcw,
  Lightbulb,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Terminal,
  ArrowRight,
  Bot,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

// Dynamically load Monaco Editor (client-only)
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const PHASE_CONFIG: Record<TDDPhase, { label: string; color: string; icon: React.ReactNode; desc: string }> = {
  red: { label: 'RED', color: '#f43f5e', icon: <XCircle size={18} />, desc: 'Tests are failing. Write code to make them pass!' },
  green: { label: 'GREEN', color: '#10b981', icon: <CheckCircle2 size={18} />, desc: 'All tests pass! Now refactor your solution.' },
  refactor: { label: 'REFACTOR', color: '#6366f1', icon: <RotateCcw size={18} />, desc: 'Optimize your code. Improve readability and performance.' },
  completed: { label: 'COMPLETED', color: '#f59e0b', icon: <CheckCircle2 size={18} />, desc: '🎉 Challenge completed! Great job.' },
};

export default function ChallengeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const challenge = getChallengeById(resolvedParams.id);
  const [language, setLanguage] = useState<SupportedLanguage>('python');
  const [code, setCode] = useState('');
  const [phase, setPhase] = useState<TDDPhase>('red');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showMentor, setShowMentor] = useState(false);
  const [mentorHint, setMentorHint] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  // Keyboard shortcut listener for Ctrl+M (or Cmd+M)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        askMentor();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, language]); // Re-bind when code changes so askMentor has fresh state

  useEffect(() => {
    if (challenge) {
      setCode(challenge.solution_template[language] || '');
    }
  }, [challenge, language]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  if (!challenge) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
        <h2>Challenge not found</h2>
        <Link href="/dashboard/challenges" className="btn-secondary" style={{ marginTop: 16, display: 'inline-flex' }}>
          <ChevronLeft size={18} /> Back to Challenges
        </Link>
      </div>
    );
  }

  const handleRun = async () => {
    setRunning(true);
    setOutput('');

    // Simulate code execution (in production this hits the API route)
    await new Promise((r) => setTimeout(r, 1500));

    const testCode = challenge.initial_tests[language] || '';
    const hasReturn = code.includes('return') || code.includes('=>');
    const isStub =
      code.includes('pass') ||
      code.includes('return []') ||
      code.includes('return -1') ||
      code.includes('return 0;') ||
      code.includes('return nil') ||
      code.includes('return {};') ||
      code.includes('return false') ||
      code.includes('return "";') ||
      code.includes('return None');

    if (isStub && !hasReturn) {
      // Still a stub — tests should fail
      setOutput(
        `❌ Tests Failed (0/5 passed)\n\n` +
        `  ✗ Test 1: Expected a return value, got None\n` +
        `  ✗ Test 2: Function not implemented\n` +
        `  ✗ Test 3: No implementation detected\n` +
        `  ✗ Test 4: Stub code detected\n` +
        `  ✗ Test 5: Please implement the solution\n\n` +
        `Phase: RED — Write code to make the tests pass!`
      );
      setPhase('red');
    } else if (hasReturn && !isStub) {
      // User wrote something — simulate passing tests
      setOutput(
        `✅ All Tests Passed (5/5)\n\n` +
        `  ✓ Test 1: Basic case\n` +
        `  ✓ Test 2: Edge case\n` +
        `  ✓ Test 3: Large input\n` +
        `  ✓ Test 4: Boundary values\n` +
        `  ✓ Test 5: Special characters\n\n` +
        `Execution time: ${Math.floor(Math.random() * 200) + 50}ms\n` +
        `Memory: ${Math.floor(Math.random() * 5000) + 1000}KB`
      );

      if (phase === 'red') {
        setPhase('green');
        toast.success('Tests passing! Move to REFACTOR phase.');
      } else if (phase === 'green' || phase === 'refactor') {
        setPhase('completed');
        toast.success('🎉 Challenge completed!');
      }
    } else {
      // Partial implementation
      const passed = Math.floor(Math.random() * 3) + 1;
      setOutput(
        `⚠️ Partial Pass (${passed}/5)\n\n` +
        `  ✓ Test 1: Basic case\n` +
        (passed >= 2 ? `  ✓ Test 2: Edge case\n` : `  ✗ Test 2: Expected correct output\n`) +
        (passed >= 3 ? `  ✓ Test 3: Large input\n` : `  ✗ Test 3: Time limit exceeded\n`) +
        `  ✗ Test 4: Boundary case failed\n` +
        `  ✗ Test 5: Special case not handled\n\n` +
        `Keep going! Fix the failing tests.`
      );
      setPhase('red');
    }

    setRunning(false);
  };

  const askMentor = async () => {
    if (!code.trim()) {
      toast.error('Write some code first before asking the mentor!');
      return;
    }
    
    setIsThinking(true);
    setShowMentor(true);
    setMentorHint('');

    try {
      const res = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      
      const data = await res.json();
      if (data.hint) {
        setMentorHint(data.hint);
        toast.success('💬 Mentor analyzed your code!');
      } else {
        toast.error('Mentor unavailable right now.');
      }
    } catch (e) {
      toast.error('Failed to connect to Mentor.');
    } finally {
      setIsThinking(false);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link
            href="/dashboard/challenges"
            style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{challenge.title}</h1>
          <span className={`badge badge-${challenge.difficulty}`}>{challenge.difficulty}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <Clock size={14} />
            {formatTime(elapsed)}
          </div>

          {/* TDD Phase indicator */}
          <motion.div
            key={phase}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              borderRadius: 8,
              border: `1px solid ${PHASE_CONFIG[phase].color}40`,
              background: `${PHASE_CONFIG[phase].color}15`,
              color: PHASE_CONFIG[phase].color,
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          >
            {PHASE_CONFIG[phase].icon}
            {PHASE_CONFIG[phase].label}
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, flex: 1, minHeight: 0 }}>
        {/* Left: Description + Tests */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
          {/* Description */}
          <div className="glass-card" style={{ padding: '20px', flex: '0 0 auto' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 10, color: '#818cf8' }}>Description</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              {challenge.description}
            </p>
            <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
              {challenge.skills_tested.map((s) => (
                <span
                  key={s}
                  style={{
                    padding: '2px 8px',
                    borderRadius: 6,
                    background: 'rgba(99,102,241,0.1)',
                    fontSize: '0.7rem',
                    color: '#818cf8',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Test Code */}
          <div className="glass-card" style={{ padding: '20px', flex: 1, overflow: 'auto' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 10, color: '#f43f5e' }}>
              <Terminal size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
              Tests ({PHASE_CONFIG[phase].label} Phase)
            </h3>
            <pre
              style={{
                background: 'rgba(0,0,0,0.3)',
                padding: 16,
                borderRadius: 8,
                fontSize: '0.8rem',
                lineHeight: 1.6,
                color: '#e2e8f0',
                overflow: 'auto',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {challenge.initial_tests[language] || 'No tests available for this language.'}
            </pre>
          </div>

          {/* Hints */}
          {showHint && hintsUsed <= challenge.hints.length && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="glass-card"
              style={{ padding: '16px', borderColor: 'rgba(245,158,11,0.3)' }}
            >
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fbbf24', marginBottom: 8 }}>
                💡 Hint {hintsUsed}/{challenge.hints.length}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                {challenge.hints[hintsUsed - 1]}
              </p>
            </motion.div>
          )}
        </div>

        {/* Right: Editor + Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
          {/* Editor Header */}
          <div className="editor-area" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div className="editor-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Language selector */}
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 6,
                    padding: '4px 10px',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  {Object.entries(LANGUAGE_CONFIG).map(([key, config]) => (
                    <option key={key} value={key} style={{ background: '#1a1a2e' }}>
                      {config.icon} {config.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => {
                    if (hintsUsed < challenge.hints.length) {
                      setHintsUsed((p) => p + 1);
                      setShowHint(true);
                      toast.info('Hint revealed! (This affects your score)');
                    }
                  }}
                  className="btn-secondary"
                  style={{ padding: '4px 12px', fontSize: '0.75rem' }}
                  disabled={hintsUsed >= challenge.hints.length}
                >
                  <Lightbulb size={14} /> Hint
                </button>
                <button
                  onClick={askMentor}
                  className="btn-secondary"
                  style={{ padding: '4px 12px', fontSize: '0.75rem', borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                  disabled={isThinking}
                  title="Keyboard shortcut: Ctrl+M"
                >
                  <Bot size={14} /> {isThinking ? 'Analyzing...' : 'Ask AI Mentor'}
                </button>
                <button
                  onClick={handleRun}
                  className="btn-primary"
                  style={{ padding: '4px 16px', fontSize: '0.8rem' }}
                  disabled={running}
                >
                  {running ? <Loader2 size={14} className="animate-spin" style={{ animation: 'spin-slow 1s linear infinite' }} /> : <Play size={14} />}
                  {running ? 'Running...' : 'Run Tests'}
                </button>
              </div>
            </div>

            {/* Monaco Editor */}
            <div style={{ flex: 1, minHeight: 0 }}>
              <MonacoEditor
                height="100%"
                language={LANGUAGE_CONFIG[language]?.monacoLang || 'python'}
                value={code}
                onChange={(v) => setCode(v || '')}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  padding: { top: 16 },
                  lineNumbers: 'on',
                  renderLineHighlight: 'gutter',
                  automaticLayout: true,
                }}
              />
              
              {/* Floating AI Mentor Widget */}
              {showMentor && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{
                    position: 'absolute',
                    bottom: 24,
                    right: 24,
                    width: 320,
                    background: 'rgba(20, 20, 20, 0.95)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(212, 168, 67, 0.3)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                    padding: 'var(--space-200)',
                    zIndex: 50,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-100)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-accent)', fontWeight: 600, fontSize: 'var(--size-xs)' }}>
                      <Sparkles size={14} /> Live AI Mentor
                    </div>
                    <button onClick={() => setShowMentor(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                      <XCircle size={14} />
                    </button>
                  </div>
                  
                  {isThinking ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-secondary)', fontSize: 'var(--size-small)', padding: 'var(--space-100) 0' }}>
                      <Loader2 size={14} className="animate-spin" /> Analyzing your implementation...
                    </div>
                  ) : (
                    <div style={{ color: 'var(--color-text)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      {mentorHint}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Output panel */}
          <div
            className="glass-card"
            style={{
              padding: '16px',
              flex: '0 0 200px',
              overflow: 'auto',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.8rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <Terminal size={14} color="#06b6d4" />
              <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Output</span>
            </div>
            {output ? (
              <pre
                style={{
                  color: output.includes('✅')
                    ? '#34d399'
                    : output.includes('❌')
                    ? '#fb7185'
                    : '#fbbf24',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.5,
                }}
              >
                {output}
              </pre>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Click &quot;Run Tests&quot; to execute your code...
              </p>
            )}
          </div>

          {/* Phase progress */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {(['red', 'green', 'refactor', 'completed'] as TDDPhase[]).map((p, i) => (
              <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    background:
                      phase === p
                        ? PHASE_CONFIG[p].color
                        : (['red', 'green', 'refactor', 'completed'].indexOf(phase) > i
                          ? `${PHASE_CONFIG[p].color}40`
                          : 'rgba(255,255,255,0.05)'),
                    color:
                      phase === p
                        ? 'white'
                        : (['red', 'green', 'refactor', 'completed'].indexOf(phase) > i
                          ? PHASE_CONFIG[p].color
                          : 'var(--text-muted)'),
                  }}
                >
                  {i + 1}
                </div>
                <span style={{ fontSize: '0.7rem', color: phase === p ? PHASE_CONFIG[p].color : 'var(--text-muted)', fontWeight: phase === p ? 700 : 400 }}>
                  {PHASE_CONFIG[p].label}
                </span>
                {i < 3 && <ArrowRight size={12} color="var(--text-muted)" style={{ margin: '0 2px' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
