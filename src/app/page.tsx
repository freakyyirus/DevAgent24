'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  Code,
  Mic,
  Award,
  Zap,
  ChevronRight,
  ChevronDown,
  Terminal,
  Sparkles,
  ArrowRight,
  Star,
  Check,
  Globe,
  Shield,
  Users,
  BarChart3,
  Brain,
} from 'lucide-react';

/* ─── Data ─── */

const FEATURES = [
  {
    icon: Terminal,
    title: 'Real Code Execution',
    desc: 'Run Python in-browser via Pyodide. 30+ languages via Judge0 cloud sandboxes. Zero setup required.',
  },
  {
    icon: Brain,
    title: 'Multi-Agent AI System',
    desc: 'Autonomous Planner, Interviewer, Code Reviewer, and Mentor agents powered by Groq.',
  },
  {
    icon: Code,
    title: 'TDD Enforcement',
    desc: 'Strict RED → GREEN → REFACTOR cycle. Write tests first, then make them pass, then clean up.',
  },
  {
    icon: Mic,
    title: 'Voice Interviews',
    desc: 'AI-powered mock interviews with real-time voice. Adaptive questioning that simulates real pressure.',
  },
  {
    icon: Award,
    title: 'Blockchain Certificates',
    desc: 'Verifiable credentials on Polygon. IPFS-backed PDFs with QR code verification.',
  },
  {
    icon: Globe,
    title: '8 Languages',
    desc: 'Python, JavaScript, TypeScript, Go, Java, C++, Rust, Ruby — all with TDD test suites.',
  },
];

const STATS = [
  { value: '200%', label: 'Faster Interview Prep' },
  { value: '12+', label: 'Coding Challenges' },
  { value: '50K+', label: 'Lines of Code Tested' },
  { value: '8', label: 'Languages Supported' },
];

const PRICING = [
  {
    name: 'Basic',
    price: '$0',
    period: '/forever',
    desc: 'Perfect for getting started with coding challenges',
    features: ['5 TDD Challenges', '2 Languages (Python, JS)', 'Basic AI Feedback', 'Community Support'],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    desc: 'For serious developers preparing for interviews',
    features: ['All 12+ Challenges', 'All 8 Languages', 'AI Voice Interviews', 'Blockchain Certificates', 'Priority Support'],
    cta: 'Get Pro',
    popular: true,
  },
  {
    name: 'Premium',
    price: '$39',
    period: '/month',
    desc: 'Enterprise features for teams and organizations',
    features: ['Everything in Pro', 'Custom Challenges', 'Team Analytics', 'SSO Integration', 'Dedicated Support', 'API Access'],
    cta: 'Start Trial',
    popular: false,
  },
];

const TESTIMONIALS = [
  {
    quote: "DevAgent24 completely transformed how I prepare for technical interviews. The TDD approach made me a better programmer overall.",
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    avatar: 'SC',
  },
  {
    quote: "The AI voice interview feature is incredibly realistic. I felt much more confident walking into my actual interview after practicing here.",
    name: 'Marcus Johnson',
    role: 'Senior Dev at Stripe',
    avatar: 'MJ',
  },
  {
    quote: "Having blockchain-verified certificates gave my resume an edge that other candidates didn't have. Highly recommend.",
    name: 'Priya Sharma',
    role: 'Full Stack Developer',
    avatar: 'PS',
  },
];

const FAQ = [
  { q: 'What technologies are included?', a: 'DevAgent24 supports Python, JavaScript, TypeScript, Go, Java, C++, Rust, and Ruby. Code runs in real sandboxes via Judge0 or directly in-browser with Pyodide for Python.' },
  { q: 'Do I need additional software?', a: 'No. Everything runs in your browser. The Monaco code editor, voice interview system, and certificate verification all work without installing anything.' },
  { q: 'How does the TDD methodology work?', a: 'Each challenge follows strict RED → GREEN → REFACTOR cycles. You write failing tests first (RED), make them pass (GREEN), then optimize your code (REFACTOR). This builds real-world development discipline.' },
  { q: 'Are the certificates verifiable?', a: 'Yes. Certificates are minted on the Polygon blockchain and include a unique hash. Anyone can verify authenticity through our public verification page or directly on Polygonscan.' },
  { q: 'Can I cancel my subscription?', a: 'Absolutely. You can cancel anytime from your dashboard. Your certificates and progress are yours to keep permanently.' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ─── Star SVG Component ─── */
function StarDecoration({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M16 0L17.5 14.5L32 16L17.5 17.5L16 32L14.5 17.5L0 16L14.5 14.5L16 0Z" fill="currentColor" />
    </svg>
  );
}

/* ─── FAQ Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--space-300) 0',
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'none',
          border: 'none',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--size-body)',
          fontWeight: 500,
          cursor: 'pointer',
          textAlign: 'left',
          gap: 'var(--space-200)',
        }}
      >
        {q}
        <ChevronDown
          size={18}
          style={{
            flexShrink: 0,
            color: 'var(--color-text-muted)',
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.25s ease',
          }}
        />
      </button>
      {open && (
        <p
          style={{
            marginTop: 'var(--space-200)',
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--size-small)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

/* ─── Page ─── */
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
          padding: 'var(--space-200) var(--space-400)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-100)' }}>
          <StarDecoration size={22} className="star-decoration" />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem' }}>
            DevAgent<span style={{ color: 'var(--color-accent)' }}>24</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-400)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-300)' }}>
            {['Features', 'Pricing', 'FAQ'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--size-small)',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                {item}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-100)' }}>
            <Link href="/dashboard" className="btn-ghost" style={{ fontSize: 'var(--size-small)' }}>
              Sign in
            </Link>
            <Link href="/dashboard/challenges" className="btn-primary" style={{ padding: '8px 20px' }}>
              Sign up <ArrowRight size={14} />
            </Link>
          </div>
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
          padding: '140px 24px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative stars */}
        <div style={{ position: 'absolute', top: '15%', left: '12%', color: 'var(--color-accent)', opacity: 0.4 }}>
          <StarDecoration size={48} className="star-decoration" />
        </div>
        <div style={{ position: 'absolute', top: '20%', right: '15%', color: 'var(--color-text-muted)', opacity: 0.2 }}>
          <StarDecoration size={28} className="star-decoration" />
        </div>
        <div style={{ position: 'absolute', bottom: '25%', left: '8%', color: 'var(--color-text-muted)', opacity: 0.15 }}>
          <StarDecoration size={20} className="star-decoration" />
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-100)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)',
            marginBottom: 'var(--space-300)',
            fontSize: 'var(--size-xs)',
            color: 'var(--color-text-secondary)',
            fontWeight: 500,
          }}
        >
          <Sparkles size={12} style={{ color: 'var(--color-accent)' }} />
          AI-Powered Developer Platform
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            maxWidth: 700,
            letterSpacing: '-0.03em',
            marginBottom: 'var(--space-300)',
          }}
        >
          Master Coding.{' '}
          <span style={{ color: 'var(--color-accent)' }}>Ace Interviews.</span>{' '}
          Earn Credentials.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--color-text-secondary)',
            maxWidth: 520,
            marginBottom: 'var(--space-500)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          From TDD coding challenges to AI voice interviews and blockchain-verified certificates. The complete platform for developer mastery.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: 'flex', gap: 'var(--space-200)' }}
        >
          <Link href="/dashboard/challenges" className="btn-primary" style={{ padding: '14px 32px', fontSize: 'var(--size-body)' }}>
            Start Free Trial <ChevronRight size={16} />
          </Link>
          <Link href="/dashboard" className="btn-secondary" style={{ padding: '14px 32px', fontSize: 'var(--size-body)' }}>
            Watch Demo ▶
          </Link>
        </motion.div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-400)',
            marginTop: 'var(--space-800)',
            color: 'var(--color-text-muted)',
            fontSize: 'var(--size-xs)',
            fontWeight: 500,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['Google', 'Framer', 'Apple', 'Microsoft', 'LinkedIn'].map((name) => (
            <span key={name} style={{ opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {name}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── Features Section ── */}
      <section
        id="features"
        style={{
          padding: 'var(--space-1200) 24px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-800)' }}
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-100)',
              color: 'var(--color-accent)',
              fontSize: 'var(--size-xs)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-200)',
            }}
          >
            <StarDecoration size={14} />
            Features
          </motion.div>
          <motion.h2
            custom={1}
            variants={fadeUp}
            style={{ fontSize: 'var(--size-h2)', letterSpacing: '-0.02em', marginBottom: 'var(--space-200)' }}
          >
            Platform That Delivers{' '}
            <span style={{ color: 'var(--color-accent)' }}>Real Results</span>
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeUp}
            style={{ color: 'var(--color-text-secondary)', maxWidth: 450, margin: '0 auto' }}
          >
            Our proven methods help you climb career rankings faster than ever, with no guesswork required.
          </motion.p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-200)',
          }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="card"
              style={{ padding: 'var(--space-400)', cursor: 'default' }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-200)',
                }}
              >
                <f.icon size={20} color="var(--color-accent)" />
              </div>
              <h3 style={{ fontSize: 'var(--size-h4)', fontWeight: 600, marginBottom: 'var(--space-100)' }}>
                {f.title}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--size-small)', lineHeight: 'var(--leading-relaxed)' }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section
        style={{
          padding: 'var(--space-1000) 24px',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-800)' }}
          >
            <motion.div
              custom={0}
              variants={fadeUp}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-100)',
                color: 'var(--color-accent)',
                fontSize: 'var(--size-xs)',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 'var(--space-200)',
              }}
            >
              <BarChart3 size={14} />
              Our Achievements
            </motion.div>
            <motion.h2 custom={1} variants={fadeUp} style={{ fontSize: 'var(--size-h2)', letterSpacing: '-0.02em' }}>
              Proven Results You Can{' '}
              <span style={{ color: 'var(--color-accent)' }}>Trust</span>
            </motion.h2>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-400)',
            }}
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{ textAlign: 'center' }}
              >
                <div
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    color: 'var(--color-text)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 'var(--size-small)',
                    color: 'var(--color-text-muted)',
                    fontWeight: 500,
                    marginTop: 'var(--space-100)',
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Section ── */}
      <section
        id="pricing"
        style={{
          padding: 'var(--space-1200) 24px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-800)' }}
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-100)',
              color: 'var(--color-accent)',
              fontSize: 'var(--size-xs)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-200)',
            }}
          >
            <Zap size={14} />
            Pricing
          </motion.div>
          <motion.h2 custom={1} variants={fadeUp} style={{ fontSize: 'var(--size-h2)', letterSpacing: '-0.02em', marginBottom: 'var(--space-200)' }}>
            Flexible <span style={{ color: 'var(--color-accent)' }}>Pricing</span> for Every Developer
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} style={{ color: 'var(--color-text-secondary)', maxWidth: 420, margin: '0 auto' }}>
            Whether you&apos;re just starting or leading a team, we have a plan that fits.
          </motion.p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-200)',
            alignItems: 'start',
          }}
        >
          {PRICING.map((plan, i) => (
            <motion.div
              key={plan.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="card-flat"
              style={{
                padding: 'var(--space-400)',
                ...(plan.popular
                  ? {
                      border: '1px solid var(--color-accent)',
                      background: 'rgba(212, 168, 67, 0.04)',
                    }
                  : {}),
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-100)', marginBottom: 'var(--space-300)' }}>
                <span
                  style={{
                    fontSize: 'var(--size-small)',
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: plan.popular ? 'var(--color-accent)' : 'rgba(255,255,255,0.06)',
                    color: plan.popular ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
                  }}
                >
                  {plan.name}
                </span>
                {plan.popular && <Star size={14} fill="var(--color-accent)" color="var(--color-accent)" />}
              </div>
              <div style={{ marginBottom: 'var(--space-200)' }}>
                <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>{plan.price}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--size-small)' }}>{plan.period}</span>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--size-small)', marginBottom: 'var(--space-300)', lineHeight: 'var(--leading-relaxed)' }}>
                {plan.desc}
              </p>
              <ul style={{ listStyle: 'none', marginBottom: 'var(--space-300)' }}>
                {plan.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-100)',
                      padding: '6px 0',
                      color: 'var(--color-text-secondary)',
                      fontSize: 'var(--size-small)',
                    }}
                  >
                    <Check size={14} color="var(--color-success)" /> {f}
                  </li>
                ))}
              </ul>
              <button
                className={plan.popular ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', padding: '12px' }}
              >
                {plan.cta} <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        style={{
          padding: 'var(--space-1000) 24px',
          borderTop: '1px solid var(--color-border)',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-800)' }}
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-100)',
              color: 'var(--color-accent)',
              fontSize: 'var(--size-xs)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-200)',
            }}
          >
            <Users size={14} />
            Testimonials
          </motion.div>
          <motion.h2 custom={1} variants={fadeUp} style={{ fontSize: 'var(--size-h2)', letterSpacing: '-0.02em' }}>
            What People <span style={{ color: 'var(--color-accent)' }}>Say</span> About Us
          </motion.h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-200)',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="card-flat"
              style={{ padding: 'var(--space-400)' }}
            >
              <div style={{ display: 'flex', gap: 2, marginBottom: 'var(--space-200)' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill="var(--color-accent)" color="var(--color-accent)" />
                ))}
              </div>
              <p
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--size-small)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: 'var(--space-300)',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-150)' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(212, 168, 67, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--size-xs)',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--size-small)' }}>{t.name}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--size-xs)' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section
        id="faq"
        style={{
          padding: 'var(--space-1200) 24px',
          maxWidth: 700,
          margin: '0 auto',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-600)' }}
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-100)',
              color: 'var(--color-accent)',
              fontSize: 'var(--size-xs)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-200)',
            }}
          >
            <Shield size={14} />
            FAQ
          </motion.div>
          <motion.h2 custom={1} variants={fadeUp} style={{ fontSize: 'var(--size-h2)', letterSpacing: '-0.02em' }}>
            Your Questions{' '}
            <span style={{ color: 'var(--color-accent)' }}>Answered</span>
          </motion.h2>
        </motion.div>

        <div>
          {FAQ.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section
        style={{
          padding: 'var(--space-1000) 24px',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-flat"
          style={{
            maxWidth: 700,
            margin: '0 auto',
            padding: 'var(--space-800) var(--space-500)',
            background: 'var(--color-bg-card)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 20, right: 30, color: 'var(--color-accent)', opacity: 0.3 }}>
            <StarDecoration size={40} className="star-decoration" />
          </div>
          <h2
            style={{
              fontSize: 'var(--size-h2)',
              fontWeight: 800,
              marginBottom: 'var(--space-200)',
              letterSpacing: '-0.02em',
            }}
          >
            Ready to Level Up?
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-400)',
              maxWidth: 400,
              margin: '0 auto var(--space-400)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Start with a TDD challenge, ace the voice interview, earn your blockchain credential.
          </p>
          <Link href="/dashboard" className="btn-primary" style={{ padding: '14px 40px', fontSize: 'var(--size-body)' }}>
            Get Started Free <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          padding: 'var(--space-500) 24px',
          textAlign: 'center',
          borderTop: '1px solid var(--color-border)',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--size-xs)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-100)', marginBottom: 'var(--space-100)' }}>
          <StarDecoration size={14} className="star-decoration" />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
            DevAgent<span style={{ color: 'var(--color-accent)' }}>24</span>
          </span>
        </div>
        <p>© 2026 DevAgent24 — Enterprise Agentic AI Platform</p>
        <p style={{ marginTop: 'var(--space-050)' }}>Built for Hack-N-Win 3.0 • Powered by Groq, Supabase & Polygon</p>
      </footer>
    </div>
  );
}
