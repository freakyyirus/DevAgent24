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
        className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight"
      >
        {title} <span className={highlightColor}>{highlight}</span>
      </motion.h2>
      <motion.p
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-zinc-400 text-center mb-16 max-w-xl mx-auto text-base leading-relaxed"
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
    <div className="min-h-screen flex flex-col bg-zinc-950 overflow-x-hidden text-zinc-100">
      {/* ══════════════════════ DECORATIVE BG ══════════════════════ */}
      <div className="fixed top-0 inset-x-0 h-[800px] overflow-hidden -z-10 pointer-events-none will-change-transform">
        <div className="absolute -top-[20%] left-[10%] w-[60%] h-[120%] rounded-full bg-amber-500/[0.04] blur-[150px]" />
        <div className="absolute top-[10%] right-[0%] w-[50%] h-[100%] rounded-full bg-orange-600/[0.04] blur-[120px]" />
      </div>

      {/* ══════════════════════ NAVBAR ══════════════════════ */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo: Larger, clickable area */}
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white group">
              <Star size={24} fill="currentColor" className="text-amber-500 drop-shadow-[0_0_10px_rgba(212,168,67,0.35)] group-hover:scale-110 transition-transform" />
              DevAgent<span className="text-amber-500">24</span>
            </Link>
            
            {/* Nav links: Equal spacing, clear hover states */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#how-it-works" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">How It Works</Link>
              <Link href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Features</Link>
              <Link href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Pricing</Link>
            </div>
            
            {/* CTA: Secondary style, not competing with hero */}
            <form action={signInWithGithub}>
              <button type="submit" className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition-colors">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-16">
        {/* ══════════════════════ HERO ══════════════════════ */}
        <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left: Text content */}
              <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ opacity: opacityHero as unknown as number }}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 mb-6"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">DevAgent 2.0 is Live</span>
                </motion.div>
                
                {/* Headline: Proper hierarchy */}
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ opacity: opacityHero as unknown as number }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                >
                  Master Code.<br />
                  <span className="text-amber-500">Ace Interviews.</span><br />
                  Earn Proof.
                </motion.h1>
                
                {/* Subhead: Constrained width for readability */}
                <motion.p
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ opacity: opacityHero as unknown as number }}
                  className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-lg mx-auto lg:mx-0"
                >
                  The premium Agentic AI platform for elite software engineers. Practice TDD, conduct lifelike voice mock interviews, and mint verifiable real-world blockchain certificates.
                </motion.p>
                
                {/* CTAs: Clear hierarchy */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <form action={signInWithGithub} className="w-full sm:w-auto">
                    <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-400 transition-colors gap-2 group relative overflow-hidden">
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></span>
                      <Github size={18} className="relative z-10" />
                      <span className="relative z-10">Start Free Trial</span>
                    </button>
                  </form>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:border-zinc-500 transition-colors gap-2">
                    <PlayCircle size={18} />
                    Watch Demo
                  </button>
                </motion.div>
              </div>

              {/* Right: Code Window */}
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative hidden lg:block w-full max-w-xl shadow-2xl shadow-amber-500/10 ml-auto"
              >
                <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117] overflow-hidden relative break-all sm:break-normal overflow-x-auto min-h-[350px]">
                  {/* Window Header */}
                  <div className="h-10 border-b border-white/[0.06] bg-white/[0.03] flex items-center px-4 gap-2 sticky top-0 z-10">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    <div className="mx-auto text-[11px] text-white/25 font-mono tracking-widest">agent.ts</div>
                  </div>
                  {/* Editor Content */}
                  <div className="p-6 text-left font-mono text-sm leading-[1.8]">
                    <div className="opacity-90">
                      <span className="text-[#ff7b72]">import</span> <span className="text-[#e6edf3]">{'{'}</span> <span className="text-[#e2c08d]">GroqVoiceAgent</span> <span className="text-[#e6edf3]">{'}'}</span> <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">"'@devagent/ai'"</span>;<br/><br/>
                      <span className="text-[#ff7b72]">export</span> <span className="text-[#ff7b72]">async</span> <span className="text-[#ff7b72]">function</span> <span className="text-[#d2a8ff]">startMockInterview</span><span className="text-[#e6edf3]">(</span><span className="text-[#ffa657]">candidateId</span><span className="text-[#ff7b72]">:</span> <span className="text-[#79c0ff]">string</span><span className="text-[#e6edf3]">) {'{'}</span><br/>
                      <span className="pl-4 text-[#8b949e]">{"// Init ultra-low latency Voice AI"}</span><br/>
                      <span className="pl-4 text-[#ff7b72]">const</span> <span className="text-[#e6edf3]">interviewer</span> <span className="text-[#ff7b72]">=</span> <span className="text-[#ff7b72]">new</span> <span className="text-[#e2c08d]">GroqVoiceAgent</span><span className="text-[#e6edf3]">({'{'}</span><br/>
                      <span className="pl-8 text-[#e6edf3]">model: </span><span className="text-[#a5d6ff]">"'voice-agent-v2'"</span><span className="text-[#e6edf3]">,</span><br/>
                      <span className="pl-8 text-[#e6edf3]">persona: </span><span className="text-[#a5d6ff]">"'Lead Staff Eng'"</span><span className="text-[#e6edf3]">,</span><br/>
                      <span className="pl-8 text-[#e6edf3]">strictness: </span><span className="text-[#79c0ff]">0.9</span><br/>
                      <span className="pl-4 text-[#e6edf3]">{'}'});</span><br/><br/>
                      <span className="pl-4 text-[#ff7b72]">await</span> <span className="text-[#e6edf3]">interviewer.</span><span className="text-[#d2a8ff]">connectWebRTC</span><span className="text-[#e6edf3]">();</span><br/>
                      <span className="pl-4 text-[#ff7b72]">return</span> <span className="text-[#e6edf3]">interviewer.</span><span className="text-[#d2a8ff]">beginAssessment</span><span className="text-[#e6edf3]">();</span><br/>
                      <span className="text-[#e6edf3]">{'}'}</span>
                    </div>
                  </div>

                  {/* Floating badge: anchored to the edge */}
                  <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-4 top-16 md:-right-6 md:top-20 bg-black/80 backdrop-blur-xl border border-white/15 px-3 py-2 rounded-xl shadow-xl flex items-center gap-2 z-20"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-500"><Zap size={12} /></div>
                    <div>
                      <div className="text-white font-bold text-[10px] leading-tight">Groq Inference</div>
                      <div className="text-amber-400 font-mono text-[8px]">Latency: 14ms</div>
                    </div>
                  </motion.div>

                  {/* Floating badge: anchored to the edge */}
                  <motion.div
                    animate={{ y: [3, -3, 3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-2 bottom-12 border border-white/15 md:-right-4 md:bottom-16 bg-black/80 backdrop-blur-xl px-3 py-2 rounded-xl shadow-xl flex items-center gap-2 z-20"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500/15 flex items-center justify-center text-green-400"><CheckCircle2 size={12} /></div>
                    <div>
                      <div className="text-white font-bold text-[10px] leading-tight">Tests Passed</div>
                      <div className="text-white/40 font-mono text-[8px]">5/5 Specs</div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════ HOW IT WORKS ══════════════════════ */}
        <section id="how-it-works" className="w-full py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Step 1: Code & Execute */}
              <motion.div variants={itemVariants} className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors flex flex-col h-full">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/[0.06] rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/[0.12] transition-colors pointer-events-none" />
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-5">
                  <Terminal size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">1. Code & Execute</h3>
                <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-5">Tackle FAANG-level algorithms in our multi-language IDE. Judge0 integration provides instant execution for Python, Rust, Go, C++, and more.</p>
                <div className="bg-black/50 border border-white/[0.05] rounded-lg p-3 font-mono text-xs text-white/50 space-y-1 break-words">
                  <div><span className="text-green-400">✓</span> Test 1: Edge case</div>
                  <div><span className="text-green-400">✓</span> Test 2: O(n) runtime</div>
                </div>
              </motion.div>

              {/* Step 2: Ace the Interview */}
              <motion.div variants={itemVariants} className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors flex flex-col h-full">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/[0.06] rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/[0.12] transition-colors pointer-events-none" />
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-5">
                  <BrainCircuit size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">2. Ace the Interview</h3>
                <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-5">Defend your code live via our ultra-low latency AI voice agent. Experience the pressure of a real technical round.</p>
                <div className="h-12 flex items-center justify-center gap-[3px] opacity-25 group-hover:opacity-80 transition-opacity duration-500">
                  {[...Array(12)].map((_, i) => (
                    <motion.div key={i} className="w-[3px] bg-blue-500 rounded-full will-change-transform" animate={{ height: [6, ((i * 47) % 24) + 8, 6] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }} />
                  ))}
                </div>
              </motion.div>

              {/* Step 3: Earn Proof */}
              <motion.div variants={itemVariants} className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors flex flex-col h-full sm:col-span-2 lg:col-span-1">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/[0.06] rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/[0.12] transition-colors pointer-events-none" />
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-5">
                  <Shield size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">3. Earn Proof</h3>
                <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-5">Pass both coding and interview phases to mint a verifiable Soulbound NFT Certificate on the Solana blockchain automatically.</p>
                <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-3 group-hover:scale-[1.01] transition-transform">
                  <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center shadow-lg shrink-0"><Award size={16} className="text-white"/></div>
                  <div>
                    <div className="font-bold text-xs text-white">Verified Skill NFT</div>
                    <div className="text-[10px] text-white/35 font-mono">Tx: gz4fr...</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════ FEATURE: AI INTERVIEW ══════════════════════ */}
        <section id="features" className="w-full relative overflow-hidden py-20 lg:py-24">
          <div className="absolute top-1/2 left-0 w-1/3 h-[400px] bg-blue-600/[0.06] blur-[120px] -translate-y-1/2 rounded-full pointer-events-none" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Chat Mockup */}
              <motion.div variants={itemVariants} className="relative group order-2 lg:order-1">
                <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 shadow-xl relative z-10">
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
                    <div className="bg-zinc-800 text-zinc-300 text-sm p-4 rounded-2xl rounded-tl-sm max-w-[85%]">
                      &quot;I noticed you used a nested loop here resulting in O(n²) time complexity. Can you optimize this using a different data structure?&quot;
                    </div>
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white text-sm p-4 rounded-2xl rounded-br-sm max-w-[85%] ml-auto break-words">
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
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Conversational AI<br/><span className="text-blue-400">that bites back.</span>
                </h2>
                <p className="text-zinc-400 text-lg mb-8 max-w-md mx-auto lg:mx-0">
                  It&apos;s not just a chat. It&apos;s a real-time voice assessment powered by high-speed AI inference. It challenges your design choices exactly like a Staff Engineer would.
                </p>
                <ul className="space-y-3.5 inline-block text-left">
                  {[
                    'Ultra-low latency voice interaction',
                    'Context-aware feedback on your code',
                    'Adaptive difficulty based on responses',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400">
                      <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={17}/> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════ FEATURE: BLOCKCHAIN CERTS ══════════════════════ */}
        <section className="w-full relative overflow-hidden py-20 lg:py-24">
          <div className="absolute top-1/2 right-0 w-1/3 h-[400px] bg-amber-600/[0.06] blur-[120px] -translate-y-1/2 rounded-full pointer-events-none" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center"
            >
              {/* Text */}
              <motion.div variants={itemVariants} className="lg:col-span-3 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Stop telling them.<br/><span className="text-amber-500">Start proving it.</span>
                </h2>
                <p className="text-zinc-400 text-lg mb-8 max-w-md mx-auto lg:mx-0">
                  Resumes can be faked. On-chain execution cannot. Upon passing our challenges, a smart contract automatically mints a Soulbound NFT to your address.
                </p>
                <ul className="space-y-3.5 inline-block text-left">
                  {[
                    'Anchor/Rust compiled Smart Contracts',
                    'Automatic Wallet creation via PDAs',
                    'Immutable public verification link',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400">
                      <CheckCircle2 className="text-amber-500 shrink-0 mt-0.5" size={17}/> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Certificate Mockup */}
              <motion.div variants={itemVariants} className="lg:col-span-2 relative group w-full max-w-sm mx-auto">
                <div className="bg-gradient-to-br from-amber-900/20 to-zinc-900 border border-amber-500/20 rounded-xl p-6 z-10 relative">
                  <div className="absolute top-0 right-0 p-4 opacity-30"><Shield size={70} className="text-amber-500 blur-xl"/></div>
                  <div className="text-amber-400 font-bold tracking-widest uppercase text-[9px] mb-2 opacity-70">Verified Skill Credential</div>
                  <h3 className="text-xl md:text-2xl font-heading font-black mb-6 text-white tracking-tight">Advanced Data Structures</h3>
                  <div className="grid grid-cols-2 gap-5 mb-6">
                    <div><div className="text-white/30 text-[9px] uppercase mb-1 font-bold tracking-wider">Issue Date</div><div className="font-mono text-xs">Oct 24, 2024</div></div>
                    <div><div className="text-white/30 text-[9px] uppercase mb-1 font-bold tracking-wider">Network</div><div className="font-mono text-xs text-amber-300">Solana Mainnet</div></div>
                  </div>
                  <div className="border-t border-amber-500/10 pt-5 flex justify-between items-center">
                    <span className="font-mono text-[10px] text-white/35 bg-black/30 px-2.5 py-1 rounded-md border border-white/[0.04]">Token ID: #8492</span>
                    <div className="w-9 h-9 rounded-full bg-amber-600 flex items-center justify-center shadow-lg"><Award size={17} className="text-white" /></div>
                  </div>
                </div>
                {/* Hover glow */}
                <div className="absolute -inset-px bg-gradient-to-r from-amber-500/10 to-pink-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════ PRICING ══════════════════════ */}
        {/* ══════════════════════ PRICING ══════════════════════ */}
        <section id="pricing" className="w-full py-20 lg:py-24 relative border-y border-zinc-800 bg-zinc-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
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
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
            >
              {/* Free Plan */}
              <motion.div variants={itemVariants} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-8 hover:border-zinc-700 transition-colors flex flex-col h-full">
                <div className="text-base font-bold mb-2 text-white/60">Community</div>
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-4xl font-bold text-white/70">$0</span>
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
                  <button type="submit" className="w-full h-12 flex items-center justify-center rounded-lg border border-zinc-700 hover:border-zinc-500 bg-transparent text-zinc-100 font-semibold transition-all duration-200">Get Started</button>
                </form>
              </motion.div>

              {/* Pro Plan */}
              <motion.div variants={itemVariants} className="bg-zinc-900 border border-amber-500/50 rounded-2xl p-6 lg:p-8 relative flex flex-col h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-zinc-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">Most Popular</div>
                <div className="text-base font-bold mb-2 text-amber-500 mt-2">DevAgent Pro</div>
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-4xl font-bold text-white">$29</span>
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
                  <button type="submit" className="w-full h-12 flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold transition-all duration-200">Upgrade to Pro</button>
                </form>
              </motion.div>

              {/* Enterprise Plan */}
              <motion.div variants={itemVariants} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-8 hover:border-zinc-700 transition-colors flex flex-col h-full">
                <div className="text-base font-bold mb-2 text-white/60">Enterprise</div>
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['SSO + SAML Integration', 'Custom Testing Tracks', 'Dedicated Account Manager', 'White-labeled Certificates', 'On-premise deployments'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-white/45 text-[13px]">
                      <CheckCircle2 size={14} className="text-white/15 shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
                <button className="w-full h-12 flex items-center justify-center rounded-lg border border-zinc-700 hover:border-zinc-500 bg-zinc-800 text-zinc-100 font-semibold transition-all duration-200 mt-auto">Contact Sales</button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════ FINAL CTA ══════════════════════ */}
        <section className="w-full py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-zinc-950 to-zinc-900">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/[0.06] to-transparent pointer-events-none" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
            <motion.h2
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6"
            >
              Stop prepping.<br/> <span className="text-amber-500">Start Executing.</span>
            </motion.h2>
            <motion.p
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-6 text-zinc-400 text-lg text-center max-w-2xl mx-auto mb-10 leading-relaxed"
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
                <button type="submit" className="h-16 px-10 text-xl rounded-lg bg-amber-500 text-zinc-950 font-bold hover:bg-amber-400 transition-all duration-200 flex items-center justify-center gap-3 mx-auto shadow-xl shadow-amber-500/20 hover:scale-105">
                  <Github size={20} className="group-hover:rotate-12 transition-transform" /> Sign Up with GitHub
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <footer className="w-full pt-8 pb-8 border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <Link href="/" className="flex items-center gap-2 text-amber-500 font-heading font-black text-base hover:opacity-80 transition-opacity">
            <Star size={16} fill="currentColor" />
            DevAgent<span className="text-white">24</span>
          </Link>
          <div className="text-zinc-500 text-sm order-last md:order-none">
            © 2026 DevAgent24 Inc. Forged for perfection.
          </div>
          <div className="flex gap-6 text-white/30">
            {['Twitter', 'GitHub', 'Discord'].map(name => (
              <Link key={name} href="#" className="hover:text-white/70 transition-colors text-xs font-medium">{name}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
