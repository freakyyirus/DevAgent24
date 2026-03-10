'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import {
  Code,
  Mic,
  Award,
  Brain,
  Zap,
  Shield,
  Globe,
  ChevronRight,
  Terminal,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Terminal,
    title: 'Real Code Execution',
    desc: 'Run Python in-browser via Pyodide WebAssembly. 30+ languages via Judge0 cloud sandboxes.',
    gradient: 'from-indigo-500 to-violet-500',
  },
  {
    icon: Brain,
    title: 'Multi-Agent AI System',
    desc: 'Autonomous Planner, Interviewer, Code Review, and Mentor agents powered by Groq.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Code,
    title: 'TDD Enforcement',
    desc: 'Strict RED → GREEN → REFACTOR cycle. Write tests first, then make them pass.',
    gradient: 'from-emerald-500 to-cyan-500',
  },
  {
    icon: Mic,
    title: 'Voice Interviews',
    desc: 'AI-powered mock interviews with real-time voice. Adaptive questioning that simulates real pressure.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Award,
    title: 'Blockchain Certificates',
    desc: 'Verifiable credentials on Polygon. IPFS-backed PDFs with QR code verification.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Globe,
    title: '8 Languages Supported',
    desc: 'Python, JavaScript, TypeScript, Go, Java, C++, Rust, Ruby — all with TDD test suites.',
    gradient: 'from-rose-500 to-pink-500',
  },
];

const TRACKS = [
  { name: 'Agentic AI', prize: '$1,198', color: '#6366f1' },
  { name: 'n8n Workflows', prize: '$18,000', color: '#8b5cf6' },
  { name: 'CodeCrafters', prize: '$9,360', color: '#06b6d4' },
  { name: 'navan.ai TDD', prize: '$5,650', color: '#10b981' },
  { name: 'Featherless AI', prize: '$5,200', color: '#3b82f6' },
  { name: 'InterviewBuddy', prize: '$100', color: '#f59e0b' },
  { name: '.xyz Domain', prize: '$1,500', color: '#f43f5e' },
  { name: 'ecertify', prize: '$50', color: '#a855f7' },
];

const STATS = [
  { value: '12+', label: 'Coding Challenges' },
  { value: '8', label: 'Languages Supported' },
  { value: '4', label: 'AI Agents' },
  { value: '$39K+', label: 'Prize Pool' },
];

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function LandingPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* ── Navigation ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(10, 10, 18, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zap size={20} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
            DevAgent<span style={{ color: '#6366f1' }}>2.0</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/dashboard" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
            Dashboard
          </Link>
          <Link href="/dashboard/challenges" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 24px 80px',
          background: 'var(--gradient-hero)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative orbs */}
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)',
            top: '-10%',
            left: '10%',
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)',
            bottom: '5%',
            right: '5%',
            filter: 'blur(60px)',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 18px',
            borderRadius: 9999,
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.3)',
            marginBottom: 24,
            fontSize: '0.85rem',
            color: '#a5b4fc',
            fontWeight: 500,
          }}
        >
          <Sparkles size={14} />
          Enterprise-Grade Agentic AI Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            maxWidth: 800,
            letterSpacing: '-0.03em',
            marginBottom: 20,
          }}
        >
          Master Coding.{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ace Interviews.
          </span>{' '}
          Earn Credentials.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: 600,
            marginBottom: 40,
            lineHeight: 1.7,
          }}
        >
          From TDD coding challenges to AI voice interviews and blockchain-verified certificates.
          The complete platform for developer mastery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link
            href="/dashboard/challenges"
            className="btn-primary"
            style={{ padding: '14px 36px', fontSize: '1.05rem' }}
          >
            <Code size={20} /> Start Coding
          </Link>
          <Link
            href="/dashboard/interview"
            className="btn-secondary"
            style={{ padding: '14px 36px', fontSize: '1.05rem' }}
          >
            <Mic size={20} /> Mock Interview
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            display: 'flex',
            gap: 48,
            marginTop: 80,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Features Section ── */}
      <section
        style={{
          padding: '100px 24px',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <motion.h2
            custom={0}
            variants={fadeUpVariant}
            style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16 }}
          >
            Everything You Need to{' '}
            <span style={{ color: '#6366f1' }}>Level Up</span>
          </motion.h2>
          <motion.p
            custom={1}
            variants={fadeUpVariant}
            style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 500, margin: '0 auto' }}
          >
            A complete ecosystem for developer growth, from coding fundamentals to interview mastery.
          </motion.p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 24,
          }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="glass-card"
              style={{ padding: 32, cursor: 'default' }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${f.gradient.includes('indigo') ? '#6366f1' : f.gradient.includes('emerald') ? '#10b981' : f.gradient.includes('cyan') ? '#06b6d4' : f.gradient.includes('amber') ? '#f59e0b' : f.gradient.includes('rose') ? '#f43f5e' : '#8b5cf6'}20)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <f.icon
                  size={24}
                  color={
                    f.gradient.includes('indigo')
                      ? '#818cf8'
                      : f.gradient.includes('emerald')
                      ? '#34d399'
                      : f.gradient.includes('cyan')
                      ? '#22d3ee'
                      : f.gradient.includes('amber')
                      ? '#fbbf24'
                      : f.gradient.includes('rose')
                      ? '#fb7185'
                      : '#a78bfa'
                  }
                />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Track Eligibility ── */}
      <section
        style={{
          padding: '80px 24px',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <motion.h2
            custom={0}
            variants={fadeUpVariant}
            style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}
          >
            <Layers
              size={28}
              style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle', color: '#6366f1' }}
            />
            8 Track Coverage
          </motion.h2>
          <motion.p custom={1} variants={fadeUpVariant} style={{ color: 'var(--text-secondary)' }}>
            Eligible for $39,558 in prizes
          </motion.p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {TRACKS.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="glass-card"
              style={{
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: t.color,
                  boxShadow: `0 0 12px ${t.color}60`,
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                <div style={{ color: t.color, fontWeight: 700, fontSize: '0.85rem' }}>{t.prize}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section
        style={{
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card"
          style={{
            maxWidth: 700,
            margin: '0 auto',
            padding: '64px 40px',
            background:
              'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))',
          }}
        >
          <Shield size={40} style={{ color: '#6366f1', marginBottom: 20 }} />
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            Ready to Level Up?
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              marginBottom: 32,
              maxWidth: 400,
              margin: '0 auto 32px',
              lineHeight: 1.7,
            }}
          >
            Start with a TDD challenge, ace the voice interview, and earn your blockchain-verified credential.
          </p>
          <Link href="/dashboard" className="btn-primary" style={{ padding: '14px 40px', fontSize: '1.05rem' }}>
            Enter Dashboard <ChevronRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          padding: '40px 24px',
          textAlign: 'center',
          borderTop: '1px solid var(--border-subtle)',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
        }}
      >
        <p>© 2026 DevAgent 2.0 — Enterprise-Grade Agentic AI Platform</p>
        <p style={{ marginTop: 8 }}>Built for Hack-N-Win 3.0 • Powered by Groq, Supabase, n8n & Polygon</p>
      </footer>
    </div>
  );
}
