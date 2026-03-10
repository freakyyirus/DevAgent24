'use client';

import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  Code,
  Terminal,
  Cpu,
  Shield,
  Zap,
  Award,
  ChevronRight,
  Star,
  CheckCircle2,
  Lock,
  MessageSquare,
  Globe,
  Github,
  PlayCircle,
  TrendingUp,
  BrainCircuit,
  Database,
  Menu,
  X
} from 'lucide-react';
import { signInWithGithub } from '@/app/actions/auth';

/* ─── animation variants ─── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── layout constants (single source of truth) ─── */
const CONTAINER_MAX = 1200;
const SECTION_GAP = 120;  // px between major sections

/**
 * All content is wrapped in SectionContainer which provides:
 *   - max-width 1200px centered
 *   - horizontal padding that guarantees 20px+ margin on mobile
 */
function SectionContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`w-full mx-auto px-6 sm:px-8 lg:px-10 ${className}`}
      style={{ maxWidth: CONTAINER_MAX }}
    >
      {children}
    </div>
  );
}

/* ─── reusable section heading ─── */
function SectionHeading({ title, highlight, subtitle, highlightColor = 'text-amber-500' }: {
  title: string;
  highlight: string;
  subtitle: string;
  highlightColor?: string;
}) {
  return (
    <div className="text-center mb-16">
      <motion.h2
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-[clamp(2rem,5vw,3rem)] font-heading font-black mb-4 tracking-tight leading-[1.1]"
      >
        {title} <span className={highlightColor}>{highlight}</span>
      </motion.h2>
      <motion.p
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] overflow-x-hidden text-white">
      {/* ══════════════════════ DECORATIVE BG ══════════════════════ */}
      <div className="fixed top-0 inset-x-0 h-[800px] overflow-hidden -z-10 pointer-events-none will-change-transform">
        <div className="absolute -top-[20%] left-[10%] w-[60%] h-[120%] rounded-full bg-amber-500/[0.04] blur-[150px]" />
        <div className="absolute top-[10%] right-[0%] w-[50%] h-[100%] rounded-full bg-orange-600/[0.04] blur-[120px]" />
      </div>

      {/* ══════════════════════ NAVBAR ══════════════════════ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-[100] border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-2xl will-change-transform"
        style={{ padding: '14px 0' }}
      >
        <SectionContainer className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Star size={22} fill="currentColor" className="text-amber-500 drop-shadow-[0_0_10px_rgba(212,168,67,0.35)] group-hover:scale-110 transition-transform" />
            <span className="font-heading font-black text-lg tracking-tight">
              DevAgent<span className="text-amber-500">24</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: '#how-it-works', label: 'How it Works' },
              { href: '#features', label: 'Features' },
              { href: '#pricing', label: 'Pricing' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="text-white/45 hover:text-white transition-colors text-[13px] font-semibold tracking-wide uppercase">
                {link.label}
              </Link>
            ))}
            <div className="w-px h-5 bg-white/10" />
            <form action={signInWithGithub}>
              <button
                type="submit"
                className="group relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition-all duration-300 active:scale-95 shadow-[0_0_20px_-5px_rgba(212,168,67,0.4)] hover:shadow-[0_0_30px_-5px_rgba(212,168,67,0.5)]"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <Github size={16} className="relative z-10" />
                <span className="relative z-10">Sign In</span>
              </button>
            </form>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </SectionContainer>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl px-6"
            style={{ padding: '16px 0' }}
          >
            <div className="flex flex-col gap-3">
              {[
                { href: '#how-it-works', label: 'How it Works' },
                { href: '#features', label: 'Features' },
                { href: '#pricing', label: 'Pricing' },
              ].map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white py-2.5 text-sm font-semibold transition-colors">
                  {link.label}
                </Link>
              ))}
              <form action={signInWithGithub}>
                <button type="submit" className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition-all mt-1">
                  <Github size={16} /> Sign In with GitHub
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </motion.nav>

      <main className="flex-1">
        {/* ══════════════════════ HERO ══════════════════════ */}
        <section
          ref={heroRef}
          className="relative flex flex-col items-center text-center justify-center px-6 sm:px-8"
          style={{ minHeight: '90vh', paddingTop: 'clamp(60px, 10vh, 120px)', paddingBottom: '60px' }}
        >
          {/* Animated Stars Background */}
          <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none -z-10">
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-amber-400 rounded-full will-change-transform"
                style={{
                  top: `${(i * 37) % 100}%`,
                  left: `${(i * 13) % 100}%`,
                  width: ((i * 17) % 2) + 1,
                  height: ((i * 17) % 2) + 1,
                }}
                animate={{ opacity: [0.1, 0.6, 0.1] }}
                transition={{ duration: ((i * 19) % 3) + 3, repeat: Infinity, ease: "easeInOut", delay: (i * 23) % 3 }}
              />
            ))}
          </motion.div>

          {/* Intro Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ opacity: opacityHero as unknown as number }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full mb-10 border border-amber-500/20 bg-amber-500/[0.06] backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">DevAgent 2.0 is Live</span>
          </motion.div>

          {/* ── Main Headline ── */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: opacityHero as unknown as number }}
            className="font-black tracking-tighter max-w-[900px] mb-8 text-balance leading-[1.05]"
          >
            <span className="block text-[clamp(2.5rem,7.5vw,5rem)] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/75">
              Master Code.
            </span>
            <span className="block text-[clamp(2.5rem,7.5vw,5rem)] bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 py-1">
              Ace Interviews.
            </span>
            <span className="block text-[clamp(2.5rem,7.5vw,5rem)] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/75">
              Earn Proof.
            </span>
          </motion.h1>

          {/* ── Subtitle (max 650px, improved contrast) ── */}
          <motion.p
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: opacityHero as unknown as number }}
            className="text-[clamp(0.95rem,1.6vw,1.2rem)] text-white/60 max-w-[650px] mb-12 leading-[1.7] px-4"
          >
            The premium Agentic AI platform for elite software engineers. Practice TDD, conduct lifelike voice mock interviews, and mint verifiable real-world blockchain certificates.
          </motion.p>

          {/* ── CTA Buttons (consistent height/spacing) ── */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 z-10"
          >
            <form action={signInWithGithub} className="w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto h-14 flex items-center justify-center gap-2.5 text-[15px] font-black tracking-tight px-8 rounded-full bg-amber-500 text-black hover:bg-amber-400 shadow-[0_0_40px_-10px_rgba(212,168,67,0.5)] hover:shadow-[0_0_60px_-10px_rgba(212,168,67,0.6)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
                <Github size={18} className="relative z-10" />
                <span className="relative z-10">Start Free Trial</span>
              </button>
            </form>
            <button className="w-full sm:w-auto h-14 flex items-center justify-center gap-2.5 text-[15px] font-bold px-8 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] text-white/80 hover:text-white">
              <PlayCircle size={18} />
              Watch Demo
            </button>
          </motion.div>

          {/* ── Floating Code Editor (positioned below CTA, no overlap) ── */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 md:mt-20 w-full max-w-[880px] relative hidden md:block z-0"
          >
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117] shadow-2xl overflow-hidden relative">
              {/* Window Header */}
              <div className="h-10 border-b border-white/[0.06] bg-white/[0.03] flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <div className="mx-auto text-[11px] text-white/25 font-mono tracking-widest">agent.ts</div>
              </div>
              {/* Editor Content */}
              <div className="p-6 md:p-8 text-left font-mono text-xs md:text-sm leading-[1.8] overflow-hidden relative">
                <div className="opacity-90">
                  <span className="text-[#ff7b72]">import</span> <span className="text-[#e6edf3]">{'{'}</span> <span className="text-[#e2c08d]">GroqVoiceAgent</span> <span className="text-[#e6edf3]">{'}'}</span> <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">{"'@devagent/ai'"}</span>;<br/><br/>
                  <span className="text-[#ff7b72]">export</span> <span className="text-[#ff7b72]">async</span> <span className="text-[#ff7b72]">function</span> <span className="text-[#d2a8ff]">startMockInterview</span><span className="text-[#e6edf3]">(</span><span className="text-[#ffa657]">candidateId</span><span className="text-[#ff7b72]">:</span> <span className="text-[#79c0ff]">string</span><span className="text-[#e6edf3]">) {'{'}</span><br/>
                  <span className="pl-6 text-[#8b949e]">{"// Initialize ultra-low latency Voice AI pipeline"}</span><br/>
                  <span className="pl-6 text-[#ff7b72]">const</span> <span className="text-[#e6edf3]">interviewer</span> <span className="text-[#ff7b72]">=</span> <span className="text-[#ff7b72]">new</span> <span className="text-[#e2c08d]">GroqVoiceAgent</span><span className="text-[#e6edf3]">({'{'}</span><br/>
                  <span className="pl-12 text-[#e6edf3]">model: </span><span className="text-[#a5d6ff]">{"'voice-agent-v2'"}</span><span className="text-[#e6edf3]">,</span><br/>
                  <span className="pl-12 text-[#e6edf3]">persona: </span><span className="text-[#a5d6ff]">{"'Lead Staff Engineer'"}</span><span className="text-[#e6edf3]">,</span><br/>
                  <span className="pl-12 text-[#e6edf3]">strictness: </span><span className="text-[#79c0ff]">0.9</span><br/>
                  <span className="pl-6 text-[#e6edf3]">{'}'});</span><br/><br/>
                  <span className="pl-6 text-[#ff7b72]">await</span> <span className="text-[#e6edf3]">interviewer.</span><span className="text-[#d2a8ff]">connectWebRTC</span><span className="text-[#e6edf3]">();</span><br/>
                  <span className="pl-6 text-[#ff7b72]">return</span> <span className="text-[#e6edf3]">interviewer.</span><span className="text-[#d2a8ff]">beginAssessment</span><span className="text-[#e6edf3]">();</span><br/>
                  <span className="text-[#e6edf3]">{'}'}</span>
                </div>

                {/* Floating badge: top-right anchored */}
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 md:top-6 md:right-6 bg-black/60 backdrop-blur-xl border border-white/15 px-3.5 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-500"><Zap size={15} /></div>
                  <div>
                    <div className="text-white font-bold text-[11px] leading-tight">Groq Inference</div>
                    <div className="text-amber-400 font-mono text-[9px]">Latency: 14ms</div>
                  </div>
                </motion.div>

                {/* Floating badge: bottom-right anchored */}
                <motion.div
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-black/60 backdrop-blur-xl border border-white/15 px-3.5 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center text-green-400"><CheckCircle2 size={15} /></div>
                  <div>
                    <div className="text-white font-bold text-[11px] leading-tight">Tests Passed</div>
                    <div className="text-white/40 font-mono text-[9px]">5/5 Specs • Judge0</div>
                  </div>
                </motion.div>
              </div>
            </div>
            {/* Glow under editor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-amber-500/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
          </motion.div>
        </section>

        {/* ══════════════════════ HOW IT WORKS ══════════════════════ */}
        <section id="how-it-works" style={{ paddingTop: SECTION_GAP, paddingBottom: SECTION_GAP }}>
          <SectionContainer>
            <SectionHeading
              title="The Path to"
              highlight="10x."
              subtitle="Three steps to elevate your career from a standard developer to an elite software engineer."
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {/* Step 1: Code & Execute */}
              <motion.div variants={itemVariants} className="group relative bg-[#0a0a0a] border border-white/[0.07] rounded-2xl p-7 md:p-8 hover:bg-[#0e0e0e] transition-all duration-500 overflow-hidden hover:border-amber-500/20 flex flex-col">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/[0.06] rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/[0.12] transition-colors pointer-events-none" />
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-5">
                  <Terminal size={22} />
                </div>
                <h3 className="text-lg font-bold mb-2.5 font-heading tracking-tight">1. Code & Execute</h3>
                <p className="text-white/45 leading-relaxed mb-5 text-[13px] flex-1">Tackle FAANG-level algorithms in our multi-language IDE. Judge0 integration provides instant execution for Python, Rust, Go, C++, and more.</p>
                <div className="bg-black/50 border border-white/[0.05] rounded-lg p-3 font-mono text-xs text-white/50 space-y-1">
                  <div><span className="text-green-400">✓</span> Test 1: Edge case</div>
                  <div><span className="text-green-400">✓</span> Test 2: O(n) runtime</div>
                </div>
              </motion.div>

              {/* Step 2: Ace the Interview */}
              <motion.div variants={itemVariants} className="group relative bg-[#0a0a0a] border border-white/[0.07] rounded-2xl p-7 md:p-8 hover:bg-[#0e0e0e] transition-all duration-500 overflow-hidden hover:border-blue-500/20 flex flex-col">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/[0.06] rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/[0.12] transition-colors pointer-events-none" />
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-5">
                  <BrainCircuit size={22} />
                </div>
                <h3 className="text-lg font-bold mb-2.5 font-heading tracking-tight">2. Ace the Interview</h3>
                <p className="text-white/45 leading-relaxed mb-5 text-[13px] flex-1">Defend your code live via our ultra-low latency AI voice agent. Experience the pressure of a real technical round.</p>
                <div className="h-12 flex items-center justify-center gap-[3px] opacity-25 group-hover:opacity-80 transition-opacity duration-500">
                  {[...Array(12)].map((_, i) => (
                    <motion.div key={i} className="w-[3px] bg-blue-500 rounded-full will-change-transform" animate={{ height: [6, ((i * 47) % 24) + 8, 6] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }} />
                  ))}
                </div>
              </motion.div>

              {/* Step 3: Earn Proof */}
              <motion.div variants={itemVariants} className="group relative bg-[#0a0a0a] border border-white/[0.07] rounded-2xl p-7 md:p-8 hover:bg-[#0e0e0e] transition-all duration-500 overflow-hidden hover:border-purple-500/20 flex flex-col sm:col-span-2 lg:col-span-1">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/[0.06] rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/[0.12] transition-colors pointer-events-none" />
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 mb-5">
                  <Shield size={22} />
                </div>
                <h3 className="text-lg font-bold mb-2.5 font-heading tracking-tight">3. Earn Proof</h3>
                <p className="text-white/45 leading-relaxed mb-5 text-[13px] flex-1">Pass both coding and interview phases to mint a verifiable Soulbound NFT Certificate on the Solana blockchain automatically.</p>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-3 flex items-center gap-3 group-hover:scale-[1.01] transition-transform">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shadow-lg shrink-0"><Award size={16} className="text-white"/></div>
                  <div>
                    <div className="font-bold text-xs text-white">Verified Skill NFT</div>
                    <div className="text-[10px] text-white/35 font-mono">Tx: gz4fr...</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </SectionContainer>
        </section>

        {/* ══════════════════════ FEATURE: AI INTERVIEW ══════════════════════ */}
        <section id="features" className="relative overflow-hidden" style={{ paddingTop: SECTION_GAP, paddingBottom: SECTION_GAP, background: 'linear-gradient(180deg, rgba(255,255,255,0.01) 0%, transparent 100%)' }}>
          <div className="absolute top-1/2 left-0 w-1/3 h-[400px] bg-blue-600/[0.06] blur-[120px] -translate-y-1/2 rounded-full pointer-events-none" />
          <SectionContainer>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {/* Chat Mockup */}
              <motion.div variants={itemVariants} className="relative group order-2 lg:order-1">
                <div className="border border-white/[0.07] bg-[#080808] rounded-2xl p-5 md:p-7 shadow-2xl relative z-10 group-hover:border-blue-500/20 transition-all duration-500">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-5 pb-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <BrainCircuit className="text-blue-500" size={16}/>
                      </div>
                      <span className="font-bold tracking-tight text-sm">AI Interviewer</span>
                    </div>
                    <div className="text-[9px] font-mono bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/20 uppercase tracking-widest">Active</div>
                  </div>
                  {/* Messages */}
                  <div className="space-y-3.5">
                    {/* AI message */}
                    <div className="bg-white/[0.04] rounded-2xl rounded-tl-md p-4 text-white/55 border border-white/[0.04] leading-relaxed text-[13px] max-w-[90%]">
                      &quot;I noticed you used a nested loop here resulting in O(n²) time complexity. Can you optimize this using a different data structure?&quot;
                    </div>
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="bg-blue-600 rounded-2xl rounded-br-md p-4 text-white shadow-lg shadow-blue-900/20 max-w-[85%] text-[13px] leading-relaxed font-medium">
                        &quot;Yes, we can use a Hash Map to store complements while iterating...&quot;
                      </div>
                    </div>
                  </div>
                </div>
                {/* Hover glow */}
                <div className="absolute -inset-px bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />
              </motion.div>

              {/* Text */}
              <motion.div variants={itemVariants} className="text-center lg:text-left order-1 lg:order-2">
                <h2 className="text-[clamp(1.75rem,4vw,2.6rem)] font-heading font-black mb-5 leading-[1.15]">
                  Conversational AI<br/><span className="text-blue-500">that bites back.</span>
                </h2>
                <p className="text-[15px] md:text-base text-white/50 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  It&apos;s not just a chat. It&apos;s a real-time voice assessment powered by high-speed AI inference. It challenges your design choices exactly like a Staff Engineer would.
                </p>
                <ul className="space-y-3.5 inline-block text-left">
                  {[
                    'Ultra-low latency voice interaction',
                    'Context-aware feedback on your code',
                    'Adaptive difficulty based on responses',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-white/65">
                      <CheckCircle2 className="text-blue-500 shrink-0" size={17}/> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </SectionContainer>
        </section>

        {/* ══════════════════════ FEATURE: BLOCKCHAIN CERTS ══════════════════════ */}
        <section className="relative overflow-hidden" style={{ paddingTop: SECTION_GAP, paddingBottom: SECTION_GAP }}>
          <div className="absolute top-1/2 right-0 w-1/3 h-[400px] bg-purple-600/[0.06] blur-[120px] -translate-y-1/2 rounded-full pointer-events-none" />
          <SectionContainer>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {/* Text */}
              <motion.div variants={itemVariants} className="text-center lg:text-left">
                <h2 className="text-[clamp(1.75rem,4vw,2.6rem)] font-heading font-black mb-5 leading-[1.15]">
                  Stop telling them.<br/><span className="text-purple-500">Start proving it.</span>
                </h2>
                <p className="text-[15px] md:text-base text-white/50 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Resumes can be faked. On-chain execution cannot. Upon passing our challenges, a smart contract automatically mints a Soulbound NFT to your address.
                </p>
                <ul className="space-y-3.5 inline-block text-left">
                  {[
                    'Anchor/Rust compiled Smart Contracts',
                    'Automatic Wallet creation via PDAs',
                    'Immutable public verification link',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-white/65">
                      <CheckCircle2 className="text-purple-500 shrink-0" size={17}/> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Certificate Mockup */}
              <motion.div variants={itemVariants} className="relative group">
                <div className="border border-purple-500/20 bg-gradient-to-br from-[#16101f] to-[#0b0712] rounded-2xl p-6 md:p-8 shadow-[0_0_50px_-15px_rgba(168,85,247,0.25)] relative z-10 transform lg:rotate-1 hover:rotate-0 transition-all duration-500">
                  <div className="absolute top-0 right-0 p-4 opacity-30"><Shield size={70} className="text-purple-500 blur-xl"/></div>
                  <div className="text-purple-400 font-bold tracking-widest uppercase text-[9px] mb-2 opacity-70">Verified Skill Credential</div>
                  <h3 className="text-xl md:text-2xl font-heading font-black mb-6 text-white tracking-tight">Advanced Data Structures</h3>
                  <div className="grid grid-cols-2 gap-5 mb-6">
                    <div><div className="text-white/30 text-[9px] uppercase mb-1 font-bold tracking-wider">Issue Date</div><div className="font-mono text-xs">Oct 24, 2024</div></div>
                    <div><div className="text-white/30 text-[9px] uppercase mb-1 font-bold tracking-wider">Network</div><div className="font-mono text-xs text-purple-300">Solana Mainnet</div></div>
                  </div>
                  <div className="border-t border-purple-500/10 pt-5 flex justify-between items-center">
                    <span className="font-mono text-[10px] text-white/35 bg-black/30 px-2.5 py-1 rounded-md border border-white/[0.04]">Token ID: #8492</span>
                    <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center shadow-lg"><Award size={17} className="text-white" /></div>
                  </div>
                </div>
                {/* Hover glow */}
                <div className="absolute -inset-px bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />
              </motion.div>
            </motion.div>
          </SectionContainer>
        </section>

        {/* ══════════════════════ PRICING ══════════════════════ */}
        <section id="pricing" className="relative border-y border-white/[0.05]" style={{ paddingTop: SECTION_GAP, paddingBottom: SECTION_GAP, background: '#050505' }}>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <SectionContainer className="relative z-10">
            <SectionHeading
              title="Simple, transparent"
              highlight="Pricing"
              subtitle="Invest in your career. Upskill faster with dedicated high-tier AI hardware resources."
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch"
            >
              {/* Free Plan */}
              <motion.div variants={itemVariants} className="bg-[#0a0a0a] border border-white/[0.07] rounded-2xl p-6 md:p-7 hover:border-white/[0.12] transition-all duration-300 flex flex-col">
                <div className="text-base font-bold mb-2 text-white/60">Community</div>
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-4xl font-black font-heading">$0</span>
                  <span className="text-white/30 text-sm">/forever</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['5 challenges per month', '1 AI Interview per month', 'Community Dashboards', 'Basic Metrics'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-white/45 text-[13px]">
                      <CheckCircle2 size={14} className="text-white/15 shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
                <form action={signInWithGithub} className="w-full mt-auto">
                  <button type="submit" className="w-full py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] font-bold text-sm transition-all duration-300 active:scale-[0.98]">Get Started</button>
                </form>
              </motion.div>

              {/* Pro Plan */}
              <motion.div variants={itemVariants} className="bg-gradient-to-b from-[#181200] to-[#0d0800] border border-amber-500/30 rounded-2xl p-6 md:p-7 shadow-[0_0_40px_-15px_rgba(212,168,67,0.2)] relative flex flex-col lg:-translate-y-2">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl z-10">Most Popular</div>
                <div className="text-base font-bold mb-2 text-amber-500 mt-2">DevAgent Pro</div>
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-4xl font-black font-heading text-white">$29</span>
                  <span className="text-white/30 text-sm">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['Unlimited TDD Challenges', 'Unlimited AI Interviews', 'Solana NFT Minting', 'Advanced Elo Tracking', 'Priority Inference Pool'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-white text-[13px] font-medium">
                      <CheckCircle2 size={14} className="text-amber-500 shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
                <form action={signInWithGithub} className="w-full mt-auto">
                  <button type="submit" className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm transition-all duration-300 shadow-[0_0_20px_rgba(212,168,67,0.25)] active:scale-[0.98]">Upgrade to Pro</button>
                </form>
              </motion.div>

              {/* Enterprise Plan */}
              <motion.div variants={itemVariants} className="bg-[#0a0a0a] border border-white/[0.07] rounded-2xl p-6 md:p-7 hover:border-white/[0.12] transition-all duration-300 flex flex-col">
                <div className="text-base font-bold mb-2 text-white/60">Enterprise</div>
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-4xl font-black font-heading">Custom</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['SSO + SAML Integration', 'Custom Testing Tracks', 'Dedicated Account Manager', 'White-labeled Certificates', 'On-premise deployments'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-white/45 text-[13px]">
                      <CheckCircle2 size={14} className="text-white/15 shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] font-bold text-sm transition-all duration-300 active:scale-[0.98]">Contact Sales</button>
              </motion.div>
            </motion.div>
          </SectionContainer>
        </section>

        {/* ══════════════════════ FINAL CTA ══════════════════════ */}
        <section className="relative overflow-hidden" style={{ paddingTop: SECTION_GAP + 20, paddingBottom: SECTION_GAP + 20 }}>
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/[0.06] to-transparent pointer-events-none" />
          <SectionContainer className="relative z-10 text-center">
            <motion.h2
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[clamp(2rem,6vw,3.5rem)] font-heading font-black mb-6 leading-[1.1] tracking-tight text-balance"
            >
              Stop prepping.<br/> Start <span className="text-amber-500">Executing.</span>
            </motion.h2>
            <motion.p
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[15px] md:text-base text-white/45 mb-10 max-w-md mx-auto leading-relaxed text-center"
            >
              Join the ranks of elite developers bypassing the resume screen with verifiable, cryptographic proof of their skills.
            </motion.p>
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <form action={signInWithGithub} className="flex justify-center">
                <button type="submit" className="h-16 text-base px-10 rounded-full bg-amber-500 text-black font-black shadow-[0_0_50px_-15px_rgba(212,168,67,0.5)] hover:bg-amber-400 hover:shadow-[0_0_70px_-10px_rgba(212,168,67,0.6)] hover:scale-[1.03] transition-all duration-500 flex items-center justify-center gap-2.5 mx-auto active:scale-95 group">
                  <Github size={20} className="group-hover:rotate-12 transition-transform" /> Sign Up with GitHub
                </button>
              </form>
            </motion.div>
          </SectionContainer>
        </section>
      </main>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <footer className="border-t border-white/[0.05]" style={{ paddingTop: 32, paddingBottom: 32, background: '#080808' }}>
        <SectionContainer className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <Link href="/" className="flex items-center gap-2 text-amber-500 font-heading font-black text-base hover:opacity-80 transition-opacity">
            <Star size={16} fill="currentColor" />
            DevAgent<span className="text-white">24</span>
          </Link>
          <div className="text-white/25 text-xs order-last md:order-none">
            © 2026 DevAgent24 Inc. Forged for perfection.
          </div>
          <div className="flex gap-6 text-white/30">
            {['Twitter', 'GitHub', 'Discord'].map(name => (
              <Link key={name} href="#" className="hover:text-white/70 transition-colors text-xs font-medium">{name}</Link>
            ))}
          </div>
        </SectionContainer>
      </footer>
    </div>
  );
}
