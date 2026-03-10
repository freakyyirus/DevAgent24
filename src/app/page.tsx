'use client';

import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
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
  Database
} from 'lucide-react';
import { signInWithGithub } from '@/app/actions/auth';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      {/* Decorative background elements */}
      <div className="absolute top-0 inset-x-0 h-[800px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] left-[10%] w-[60%] h-[120%] rounded-full bg-amber-500/5 blur-[150px]" />
        <div className="absolute top-[10%] right-[0%] w-[50%] h-[100%] rounded-full bg-orange-600/5 blur-[120px]" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--space-200) var(--space-400)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(10, 10, 10, 0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-100)' }}>
          <div style={{ color: 'var(--color-accent)', filter: 'drop-shadow(0 0 8px rgba(212, 168, 67, 0.5))' }}>
            <Star size={24} fill="currentColor" />
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.02em' }}>
            DevAgent<span style={{ color: 'var(--color-accent)' }}>24</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-300)', alignItems: 'center' }}>
          <Link href="#how-it-works" className="hidden md:block transition-colors hover:text-white" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--size-small)', fontWeight: 600, textDecoration: 'none' }}>
            How it Works
          </Link>
          <Link href="#features" className="hidden md:block transition-colors hover:text-white" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--size-small)', fontWeight: 600, textDecoration: 'none' }}>
            Features
          </Link>
          <Link href="#pricing" className="hidden md:block transition-colors hover:text-white" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--size-small)', fontWeight: 600, textDecoration: 'none' }}>
            Pricing
          </Link>
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 var(--space-100)' }} className="hidden sm:block" />
          
          <form action={signInWithGithub}>
            <button
              type="submit"
              className="btn btn-primary group relative overflow-hidden"
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-100)', padding: '10px 20px', borderRadius: 'var(--radius-full)' }}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-400/0 via-amber-400/30 to-amber-400/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <Github size={18} className="relative z-10" />
              <span className="relative z-10 font-bold">Sign In</span>
            </button>
          </form>
        </div>
      </motion.nav>

      <main style={{ flex: 1, overflowX: 'hidden' }}>
        {/* Dynamic Hero Section */}
        <section
          ref={heroRef}
          style={{
            padding: 'var(--space-800) var(--space-400) 120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '90vh',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Animated Stars Background */}
          <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none -z-10">
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-amber-400 rounded-full"
                style={{
                  top: `${(i * 37) % 100}%`,
                  left: `${(i * 13) % 100}%`,
                  width: ((i * 17) % 2) + 1,
                  height: ((i * 17) % 2) + 1,
                }}
                animate={{
                  opacity: [0.1, 0.8, 0.1],
                  scale: [1, 1.5, 1],
                  boxShadow: ['0 0 0px rgba(251,191,36,0)', '0 0 8px rgba(251,191,36,0.8)', '0 0 0px rgba(251,191,36,0)'],
                }}
                transition={{
                  duration: ((i * 19) % 3) + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i * 23) % 2,
                }}
              />
            ))}
          </motion.div>

          {/* Intro Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ opacity: opacityText }}
            className="flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-amber-500/20 bg-amber-500/5 backdrop-blur-md"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-amber-500 text-sm font-bold tracking-wide uppercase">DevAgent 2.0 is Live</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: opacityText }}
            className="text-[clamp(3.5rem,8vw,6.5rem)] font-black leading-[1.05] tracking-tighter max-w-[1000px] mb-8 text-balance"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">Master Code.</span><br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">Ace Interviews.</span><br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">Earn Proof.</span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: opacityText }}
            className="text-[clamp(1.2rem,2vw,1.4rem)] text-white/50 max-w-[700px] mb-12 leading-relaxed"
          >
            The premium Agentic AI platform for elite software engineers. Practice TDD, conduct lifelike voice mock interviews, and mint verifiable real-world blockchain certificates.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 z-10"
          >
            <form action={signInWithGithub} className="w-full sm:w-auto">
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto justify-center group relative overflow-hidden text-lg px-8 py-4 rounded-full shadow-[0_0_40px_-10px_rgba(251,191,36,0.5)] hover:shadow-[0_0_60px_-10px_rgba(251,191,36,0.6)] transition-all duration-300 hover:-translate-y-1"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
                <Github size={22} className="mr-2" />
                Start Free Trial
                <ChevronRight size={22} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            <Link href="#how-it-works" className="w-full sm:w-auto">
              <button
                className="btn btn-secondary w-full sm:w-auto justify-center text-lg px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
              >
                <PlayCircle size={22} className="mr-2 text-white/70" />
                See How It Works
              </button>
            </Link>
          </motion.div>

          {/* Floating UI Elements / Mock Abstract Editor */}
          <motion.div
            initial={{ y: 100, opacity: 0, rotateX: 20 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
            className="mt-24 w-full max-w-[1000px] relative hidden lg:block z-0"
          >
            {/* Editor Window */}
            <div className="rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl overflow-hidden relative backdrop-blur-3xl">
              {/* Window Header */}
              <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <div className="mx-auto text-xs text-white/30 font-mono tracking-widest pl-4">agent.ts</div>
              </div>
              {/* Editor Content */}
              <div className="p-8 text-left font-mono text-sm leading-relaxed overflow-hidden relative">
                {/* Simulated Syntax Highlighting */}
                <div className="opacity-90">
                  <span className="text-[#ff7b72]">import</span> <span className="text-[#e6edf3]">&lbrace;</span> <span className="text-[#e2c08d]">GroqVoiceAgent</span> <span className="text-[#e6edf3]">&rbrace;</span> <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">&apos;@devagent/ai&apos;</span>;<br/><br/>
                  <span className="text-[#ff7b72]">export</span> <span className="text-[#ff7b72]">async</span> <span className="text-[#ff7b72]">function</span> <span className="text-[#d2a8ff]">startMockInterview</span><span className="text-[#e6edf3]">(</span><span className="text-[#ffa657]">candidateId</span><span className="text-[#ff7b72]">:</span> <span className="text-[#79c0ff]">string</span><span className="text-[#e6edf3]">) &lbrace;</span><br/>
                  <span className="pl-6 text-[#8b949e]">{"// Initialize ultra-low latency Llama-3 70B Voice pipeline"}</span><br/>
                  <span className="pl-6 text-[#ff7b72]">const</span> <span className="text-[#e6edf3]">interviewer</span> <span className="text-[#ff7b72]">=</span> <span className="text-[#ff7b72]">new</span> <span className="text-[#e2c08d]">GroqVoiceAgent</span><span className="text-[#e6edf3]">(&lbrace;</span><br/>
                  <span className="pl-12 text-[#e6edf3]">model: </span><span className="text-[#a5d6ff]">&apos;llama3-70b-8192&apos;</span><span className="text-[#e6edf3]">,</span><br/>
                  <span className="pl-12 text-[#e6edf3]">persona: </span><span className="text-[#a5d6ff]">&apos;Lead Staff Engineer&apos;</span><span className="text-[#e6edf3]">,</span><br/>
                  <span className="pl-12 text-[#e6edf3]">strictness: </span><span className="text-[#79c0ff]">0.9</span><br/>
                  <span className="pl-6 text-[#e6edf3]">&rbrace;);</span><br/><br/>
                  <span className="pl-6 text-[#ff7b72]">await</span> <span className="text-[#e6edf3]">interviewer.</span><span className="text-[#d2a8ff]">connectWebRTC</span><span className="text-[#e6edf3]">();</span><br/>
                  <span className="pl-6 text-[#ff7b72]">return</span> <span className="text-[#e6edf3]">interviewer.</span><span className="text-[#d2a8ff]">beginAssessment</span><span className="text-[#e6edf3]">();</span><br/>
                  <span className="text-[#e6edf3]">&rbrace;</span>
                </div>
                {/* Decorative floating widgets */}
                <motion.div 
                   animate={{ y: [-5, 5, -5] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-2xl flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className="text-white font-bold font-sans text-sm">Groq Inference Active</div>
                    <div className="text-amber-400 font-mono text-xs">Latency: 14ms</div>
                  </div>
                </motion.div>
                <motion.div 
                   animate={{ y: [5, -5, 5] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute bottom-10 right-24 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-2xl flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div className="text-white font-bold font-sans text-sm">Tests Passed</div>
                    <div className="text-white/50 font-mono text-xs">5/5 Specs • Judge0</div>
                  </div>
                </motion.div>
              </div>
            </div>
            {/* Massive background glow for the editor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/20 blur-[120px] rounded-full -z-10" />
          </motion.div>
        </section>

        {/* Trusted By Strip */}
        <section className="border-y border-white/5 py-8 bg-white/[0.02] overflow-hidden relative backdrop-blur-sm">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="font-heading font-black text-xl flex items-center gap-2 tracking-tight"><Award size={24} className="text-emerald-400" /> Supabase</span>
            <span className="font-heading font-black text-xl flex items-center gap-2 tracking-tight"><Zap size={24} className="text-amber-400" /> Groq AI</span>
            <span className="font-heading font-black text-xl flex items-center gap-2 tracking-tight"><Globe size={24} className="text-purple-400" /> Solana Foundation</span>
            <span className="font-heading font-black text-xl flex items-center gap-2 tracking-tight"><Cpu size={24} className="text-blue-400" /> Vercel</span>
            <span className="font-heading font-black text-xl flex items-center gap-2 tracking-tight"><Database size={24} className="text-red-400" /> Judge0</span>
          </div>
        </section>

        {/* How It Works (Bento Grid) */}
        <section id="how-it-works" className="py-32 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-heading font-black mb-6 tracking-tight">
              The Path to <span className="text-amber-500">10x.</span>
            </h2>
            <p className="text-white/50 text-xl max-w-2xl mx-auto">Three steps to elevate your career from a standard developer to an elite engineer hired by top tech companies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <motion.div variants={itemVariants} className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:bg-[#161616] transition-colors overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/20 transition-colors" />
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-8">
                <Terminal size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-heading tracking-tight">1. Code & Execute</h3>
              <p className="text-white/50 leading-relaxed mb-6">Tackle FAANG-level algorithms in our multi-language IDE. Judge0 integration provides instance execution for Python, Rust, Go, C++, and more.</p>
              <div className="bg-black/50 border border-white/5 rounded-xl p-4 font-mono text-sm text-white/70">
                <span className="text-green-400">✓</span> Test 1: Edge case<br/>
                <span className="text-green-400">✓</span> Test 2: O(n) runtime<br/>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={itemVariants} className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:bg-[#161616] transition-colors overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors" />
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-8">
                <BrainCircuit size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-heading tracking-tight">2. Ace the Interview</h3>
              <p className="text-white/50 leading-relaxed mb-6">Defend your code live via our ultra-low latency voice AI using Llama-3 70B. Experience the pressure of a real technical round.</p>
              <div className="h-20 flex items-center justify-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                {[...Array(15)].map((_, i) => (
                  <motion.div key={i} className="w-1 bg-blue-500 rounded-full" animate={{ height: [10, ((i * 47) % 40) + 10, 10] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }} />
                ))}
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={itemVariants} className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 hover:bg-[#161616] transition-colors overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/20 transition-colors" />
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 mb-8">
                <Shield size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-heading tracking-tight">3. Earn Proof</h3>
              <p className="text-white/50 leading-relaxed mb-6">Pass both coding and interview phases to mint a verifiable Soulbound NFT Certificate on the Solana blockchain automatically.</p>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center"><Award size={20} className="text-white"/></div>
                <div>
                  <div className="font-bold text-sm">Verified Skill NFT</div>
                  <div className="text-xs text-white/50 font-mono">Tx: 8xK9...2mP</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Deep Dive (AI) */}
        <section id="features" className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-1/3 h-[500px] bg-blue-600/10 blur-[150px] -translate-y-1/2 rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 relative">
              <div className="border border-white/10 bg-[#0a0a0a] rounded-3xl p-8 shadow-2xl relative z-10 hover:border-blue-500/30 transition-colors">
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/5">
                   <div className="flex items-center gap-3"><BrainCircuit className="text-blue-500"/><span className="font-bold">Llama-3 Interviewer</span></div>
                   <div className="text-xs font-mono bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">Active</div>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-white/5 rounded-xl p-4 text-white/70">&quot;I noticed you used a nested loop here resulting in O(n^2) time complexity. Can you optimize this to O(n) using a different data structure?&quot;</div>
                  <div className="flex items-center justify-end">
                    <div className="bg-blue-600 rounded-xl p-4 text-white">&quot;Yes, we can use a Hash Map to store complements while iterating...&quot;</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">Conversational AI <br/><span className="text-blue-500">that bites back.</span></h2>
              <p className="text-xl text-white/50 mb-8 leading-relaxed">It&apos;s not just a chat. It&apos;s a real-time voice assessment powered by Groq&apos;s high-speed inference. The AI parses your code in milliseconds and challenges your design choices exactly like a Staff Engineer would.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-lg"><CheckCircle2 className="text-blue-500" size={20}/> Ultra-low latency voice interaction</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle2 className="text-blue-500" size={20}/> Context-aware feedback on your code</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle2 className="text-blue-500" size={20}/> Adaptive difficulty based on responses</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Feature Deep Dive (Blockchain) */}
        <section className="py-24 relative overflow-hidden">
           <div className="absolute top-1/2 right-0 w-1/3 h-[500px] bg-purple-600/10 blur-[150px] -translate-y-1/2 rounded-full pointer-events-none" />
           <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="flex-1 relative">
               {/* Mock Certificate */}
               <div className="border border-purple-500/30 bg-gradient-to-br from-[#1a1025] to-[#0d0714] rounded-3xl p-10 shadow-[0_0_50px_-10px_rgba(168,85,247,0.3)] relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute top-0 right-0 p-4 opacity-50"><Shield size={100} className="text-purple-500 blur-xl"/></div>
                  <div className="text-purple-400 font-bold tracking-widest uppercase text-xs mb-2">Verified Skill Credential</div>
                  <h3 className="text-3xl font-heading font-black mb-8 text-white">Advanced Data Structures</h3>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div><div className="text-white/40 text-xs uppercase mb-1">Issue Date</div><div className="font-mono">Oct 24, 2024</div></div>
                    <div><div className="text-white/40 text-xs uppercase mb-1">Network</div><div className="font-mono text-purple-300">Solana Devnet</div></div>
                  </div>
                  <div className="border-t border-purple-500/20 pt-6 flex justify-between items-center">
                     <span className="font-mono text-xs text-white/50 bg-black/50 px-3 py-1 rounded-md">Token ID: #8492</span>
                     <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center"><Award size={16} /></div>
                  </div>
               </div>
            </div>
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">Stop telling them. <br/><span className="text-purple-500">Start proving it.</span></h2>
              <p className="text-xl text-white/50 mb-8 leading-relaxed">Resumes can be faked. On-chain execution cannot. Upon passing our rigorous challenges, a smart contract automatically mints a Soulbound NFT to your address, cryptographically proving your competence.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-lg"><CheckCircle2 className="text-purple-500" size={20}/> Anchor/Rust compiled Smart Contracts</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle2 className="text-purple-500" size={20}/> Automatic Wallet creation via PDAs</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle2 className="text-purple-500" size={20}/> Immutable public verification link</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32 px-4 bg-[#050505] relative border-y border-white/5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-heading font-black mb-6 tracking-tight">
                Simple, transparent <span className="text-amber-500">Pricing</span>
              </h2>
              <p className="text-xl text-white/50 max-w-2xl mx-auto">Invest in your career. Upskill faster with dedicated high-tier AI hardware resources.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
              {/* Free Plan */}
              <div className="bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-colors">
                <div className="text-2xl font-bold mb-2">Community</div>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black font-heading">$0</span>
                  <span className="text-white/40">/forever</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['5 challenges per month', '1 AI Interview per month', 'Community Dashboards', 'Basic Metrics'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                      <CheckCircle2 size={18} className="text-white/20" /> {feat}
                    </li>
                  ))}
                </ul>
                <form action={signInWithGithub} className="w-full">
                  <button type="submit" className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-bold transition-colors">Get Started</button>
                </form>
              </div>

              {/* Pro Plan */}
              <div className="bg-gradient-to-b from-[#1a1500] to-[#0f0a00] border border-amber-500/50 rounded-3xl p-8 shadow-[0_0_60px_-15px_rgba(251,191,36,0.3)] relative transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Most Popular</div>
                <div className="text-2xl font-bold mb-2 text-amber-500">DevAgent Pro</div>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black font-heading text-white">$29</span>
                  <span className="text-white/40">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['Unlimited Multi-language TDD', 'Unlimited Voice AI Interviews', 'Solana NFT Minting (Gas Paid)', 'Advanced Elo Rating Tracking', 'Priority Groq Inference Pool'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-white font-medium">
                      <CheckCircle2 size={18} className="text-amber-500" /> {feat}
                    </li>
                  ))}
                </ul>
                <form action={signInWithGithub} className="w-full">
                  <button type="submit" className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black transition-colors shadow-[0_0_20px_rgba(251,191,36,0.4)]">Upgrade to Pro</button>
                </form>
              </div>

               {/* Enterprise Plan */}
               <div className="bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-colors">
                <div className="text-2xl font-bold mb-2">Enterprise</div>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black font-heading">Custom</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['SSO + SAML Integration', 'Custom Testing Tracks', 'Dedicated Account Manager', 'White-labeled Certificates', 'On-premise deployments'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                      <CheckCircle2 size={18} className="text-white/20" /> {feat}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-bold transition-colors">Contact Sales</button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-4 relative overflow-hidden flex justify-center text-center border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-[clamp(3rem,6vw,5rem)] font-heading font-black mb-8 leading-tight tracking-tight text-balance">
              Stop prepping.<br/> Start <span className="text-amber-500">Executing.</span>
            </h2>
            <p className="text-xl text-white/50 mb-10 max-w-xl mx-auto">Join the ranks of elite developers bypassing the resume screen with verifiable, cryptographic proof of their skills.</p>
            <form action={signInWithGithub}>
              <button type="submit" className="btn btn-primary text-xl px-12 py-6 rounded-full shadow-[0_0_50px_-10px_rgba(251,191,36,0.6)] hover:scale-105 hover:shadow-[0_0_70px_-10px_rgba(251,191,36,0.8)] transition-all flex items-center gap-3 mx-auto font-bold">
                <Github size={24} /> Deploy Your Career Now
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-amber-500 font-heading font-black text-xl">
            <Star size={20} fill="currentColor" />
            DevAgent<span className="text-white">24</span>
          </div>
          <div className="text-white/40 text-sm">
            © {new Date().getFullYear()} DevAgent24 Inc. Forged for perfection.
          </div>
          <div className="flex gap-6 text-white/40">
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-white transition-colors">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
