'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
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
  Github
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
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Decorative background elements */}
      <div className="absolute top-0 inset-x-0 h-[500px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[100%] rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[80%] rounded-full bg-orange-500/5 blur-[120px]" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--space-200) var(--space-400)',
          borderBottom: '1px solid var(--color-border)',
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-100)' }}>
          <div style={{ color: 'var(--color-accent)' }}>
            <Star size={20} fill="currentColor" />
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem' }}>
            DevAgent<span style={{ color: 'var(--color-accent)' }}>24</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-200)', alignItems: 'center' }}>
          <Link href="#features" className="hidden sm:block" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--size-small)', fontWeight: 500, textDecoration: 'none' }}>
            Features
          </Link>
          <Link href="#pricing" className="hidden sm:block" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--size-small)', fontWeight: 500, textDecoration: 'none' }}>
            Pricing
          </Link>
          <div style={{ width: 1, height: 16, background: 'var(--color-border)', margin: '0 var(--space-100)' }} className="hidden sm:block" />
          
          <form action={signInWithGithub}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-100)' }}
            >
              <Github size={16} />
              Continue with GitHub
            </button>
          </form>
        </div>
      </motion.nav>

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section
          style={{
            padding: 'var(--space-800) var(--space-400)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '85vh',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Blinking Stars Background */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-amber-400 rounded-full"
                style={{
                  top: `${(i * 23) % 100}%`,
                  left: `${(i * 37) % 100}%`,
                  width: (i % 3) + 1.5,
                  height: (i % 3) + 1.5,
                }}
                animate={{
                  opacity: [0.1, 0.9, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: (i % 4) + 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 5) * 0.4,
                }}
              />
            ))}
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-100)',
              padding: 'var(--space-050) var(--space-150)',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(212, 168, 67, 0.1)',
              border: '1px solid rgba(212, 168, 67, 0.2)',
              color: 'var(--color-accent)',
              fontSize: 'var(--size-small)',
              fontWeight: 600,
              marginBottom: 'var(--space-300)',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-accent)', boxShadow: '0 0 8px var(--color-accent)' }} />
            DevAgent 2.0 is now live
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: '900px',
              marginBottom: 'var(--space-300)',
              textWrap: 'balance',
            }}
          >
            Master Coding. <br />
            <span style={{ color: 'var(--color-text-muted)' }}>Ace Interviews.</span> <br />
            Earn <span style={{ color: 'var(--color-accent)' }}>Credentials.</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
              color: 'var(--color-text-secondary)',
              maxWidth: '600px',
              marginBottom: 'var(--space-400)',
              lineHeight: 1.6,
            }}
          >
            The premium Agentic AI platform for elite software engineers. 
            Practice TDD, conduct voice mock interviews, and mint verifiable blockchain certificates.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', gap: 'var(--space-200)', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}
            className="px-4 sm:px-0"
          >
            <form action={signInWithGithub} className="w-full sm:w-auto">
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto justify-center"
                style={{ padding: 'var(--space-200) var(--space-400)', fontSize: 'var(--size-base)', display: 'flex', alignItems: 'center', gap: 'var(--space-100)' }}
              >
                <Github size={20} />
                Start Free Trial
                <ChevronRight size={18} />
              </button>
            </form>
            <Link href="#features" style={{ textDecoration: 'none' }} className="w-full sm:w-auto">
              <button
                className="btn btn-secondary w-full sm:w-auto justify-center"
                style={{ padding: 'var(--space-200) var(--space-400)', fontSize: 'var(--size-base)', display: 'flex' }}
              >
                Explore Features
              </button>
            </Link>
          </motion.div>

          {/* Abstract IDE Window preview */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              marginTop: 'var(--space-600)',
              width: '100%',
              maxWidth: '900px',
              height: '300px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(180deg, var(--color-bg-elevated) 0%, var(--color-bg) 100%)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
            className="hidden md:block" // Hide on small screens to save space
          >
            <div style={{ display: 'flex', padding: 'var(--space-150)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-card)', gap: 'var(--space-100)' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <div style={{ padding: 'var(--space-300)', fontFamily: 'var(--font-mono)', fontSize: 'var(--size-small)', color: 'var(--color-text-muted)', textAlign: 'left', opacity: 0.7 }}>
              <div style={{ color: '#c678dd' }}>import <span style={{ color: 'var(--color-text)' }}>GroqAgent</span> from <span style={{ color: '#98c379' }}>'@devagent/core'</span>;</div>
              <br />
              <div style={{ color: '#61afef' }}>async function <span style={{ color: '#e5c07b' }}>startInterview</span>() {'{'}</div>
              <div style={{ paddingLeft: 'var(--space-300)' }}>
                <span style={{ color: '#c678dd' }}>const</span> AI = <span style={{ color: '#c678dd' }}>new</span> <span style={{ color: '#e5c07b' }}>GroqAgent</span>({'{'} mode: <span style={{ color: '#98c379' }}>'technical'</span> {'}'});<br />
                <span style={{ color: '#c678dd' }}>await</span> AI.<span style={{ color: '#61afef' }}>evaluate</span>(candidateCode);<br />
              </div>
              <div style={{ color: '#61afef' }}>{'}'}</div>
            </div>
            {/* Glowing orb behind editor */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'var(--color-accent)', filter: 'blur(100px)', opacity: 0.1, zIndex: -1 }} />
          </motion.div>
        </section>

        {/* Trusted By Strip */}
        <section style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: 'var(--space-300) var(--space-200)', background: 'var(--color-bg-elevated)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-400)', opacity: 0.5, filter: 'grayscale(100%)' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1rem, 2vw, 1.2rem)', display: 'flex', alignItems: 'center', gap: 8 }}><Award size={20} /> Supabase</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1rem, 2vw, 1.2rem)', display: 'flex', alignItems: 'center', gap: 8 }}><Zap size={20} /> Groq</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1rem, 2vw, 1.2rem)', display: 'flex', alignItems: 'center', gap: 8 }}><Globe size={20} /> Solana</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1rem, 2vw, 1.2rem)', display: 'flex', alignItems: 'center', gap: 8 }}><Cpu size={20} /> Vercel</span>
          </div>
        </section>

        {/* Value Proposition / Stats */}
        <section id="features" style={{ padding: 'var(--space-800) var(--space-400)', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-600)' }}>
            <h2 style={{ fontSize: 'var(--size-h2)', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: 'var(--space-200)' }}>
              Built for <span style={{ color: 'var(--color-accent)' }}>Excellence</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: 600, margin: '0 auto', fontSize: 'var(--size-base)' }}>
              Stop practicing in the void. Get real-time feedback, real blockchain verification, and real AI interviews.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'var(--space-300)' }}
          >
            {[
              { title: 'TDD Engine', desc: 'Real Pyodide & Judge0 mult-language execution. Enforces strict Red-Green-Refactor workflows.', icon: Terminal },
              { title: 'Groq AI Interviews', desc: 'Voice-enabled AI mock interviews with Llama-3 70B. Context-aware follow-ups and scoring.', icon: MessageSquare },
              { title: 'Solana Certificates', desc: 'Immutable, verifiable proof of work. Real Anchor smart contracts minting NFTs.', icon: Shield },
              { title: 'Automated Workflows', desc: 'n8n webhook integrations trigger external actions upon completing tracks.', icon: Cpu },
            ].map((f, i) => (
              <motion.div key={i} variants={itemVariants} className="card p-6" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'rgba(212, 168, 67, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-300)', border: '1px solid rgba(212, 168, 67, 0.2)' }}>
                  <f.icon size={24} color="var(--color-accent)" />
                </div>
                <h3 style={{ fontSize: 'var(--size-h4)', fontWeight: 700, marginBottom: 'var(--space-100)' }}>{f.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--size-small)', lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" style={{ padding: 'var(--space-800) var(--space-400)', background: 'var(--color-bg-elevated)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-600)' }}>
              <h2 style={{ fontSize: 'var(--size-h2)', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: 'var(--space-200)' }}>
                Simple, transparent <span style={{ color: 'var(--color-accent)' }}>Pricing</span>
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: 600, margin: '0 auto' }}>Invest in your career. Upkill faster with dedicated AI resources.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'var(--space-300)', alignItems: 'stretch' }}>
              {/* Free Plan */}
              <div className="card" style={{ padding: 'var(--space-500)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: 'var(--size-large)', fontWeight: 700, marginBottom: 'var(--space-100)' }}>Community</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-050)', marginBottom: 'var(--space-300)' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>$0</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>/forever</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-400) 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
                  {['5 challenges per month', '1 Mock Interview per month', 'Community Certificates', 'Basic Analytics'].map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-100)', color: 'var(--color-text-secondary)', fontSize: 'var(--size-small)' }}>
                      <CheckCircle2 size={16} color="var(--color-border)" /> {feat}
                    </li>
                  ))}
                </ul>
                <form action={signInWithGithub} style={{ width: '100%' }}>
                  <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>Get Started</button>
                </form>
              </div>

              {/* Pro Plan */}
              <div className="card" style={{ padding: 'var(--space-500)', border: '1px solid var(--color-accent)', position: 'relative', boxShadow: '0 12px 32px rgba(212, 168, 67, 0.1)', zIndex: 10, background: 'var(--color-bg-card)' }}>
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--color-accent)', color: '#000', fontSize: '0.75rem', fontWeight: 800, padding: '4px 12px', borderRadius: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Most Popular</div>
                <div style={{ fontSize: 'var(--size-large)', fontWeight: 700, marginBottom: 'var(--space-100)', color: 'var(--color-accent)' }}>DevAgent Pro</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-050)', marginBottom: 'var(--space-300)' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>$29</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>/month</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-400) 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
                  {['Unlimited TDD Challenges', 'Unlimited Voice AI Interviews', 'Solana NFT Certificates', 'Advanced Predictor Analytics', 'Priority Groq Queue'].map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-100)', color: 'var(--color-text)', fontSize: 'var(--size-small)', fontWeight: 500 }}>
                      <CheckCircle2 size={16} color="var(--color-accent)" /> {feat}
                    </li>
                  ))}
                </ul>
                <form action={signInWithGithub} style={{ width: '100%' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Upgrade to Pro</button>
                </form>
              </div>

               {/* Enterprise Plan */}
               <div className="card" style={{ padding: 'var(--space-500)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: 'var(--size-large)', fontWeight: 700, marginBottom: 'var(--space-100)' }}>Enterprise</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-050)', marginBottom: 'var(--space-300)' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>Custom</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-400) 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
                  {['SSO + SAML Integration', 'Custom Track Creation', 'Dedicated Account Manager', 'White-labeled Certificates'].map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-100)', color: 'var(--color-text-secondary)', fontSize: 'var(--size-small)' }}>
                      <CheckCircle2 size={16} color="var(--color-border)" /> {feat}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-secondary" style={{ width: '100%' }}>Contact Sales</button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ padding: 'var(--space-800) var(--space-400)', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-600)' }}>
             <h2 style={{ fontSize: 'var(--size-h2)', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: 'var(--space-200)' }}>
              Wall of <span style={{ color: 'var(--color-accent)' }}>Love</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'var(--space-300)' }}>
            {[
              { text: "The TDD environment completely changed how I think about algorithms. I passed my FAANG loop easily.", author: "Sarah J.", role: "Senior Engineer" },
              { text: "Voice interviews with Llama-3 feel incredibly real. The follow-up questions exposed gaps I didn't know I had.", author: "Michael T.", role: "Full Stack Dev" },
              { text: "Having an actual Solana NFT certificate verified on-chain was exactly what I needed to stand out to recruiters.", author: "Elena R.", role: "Web3 Developer" }
            ].map((t, i) => (
              <div key={i} className="card p-6" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-050)', marginBottom: 'var(--space-200)' }}>
                  {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="var(--color-accent)" color="var(--color-accent)" />)}
                </div>
                <p style={{ color: 'var(--color-text)', fontSize: 'var(--size-base)', lineHeight: 1.6, marginBottom: 'var(--space-300)', fontStyle: 'italic' }}>"{t.text}"</p>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--size-small)' }}>{t.author}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: 'var(--space-400) var(--space-400) var(--space-800)', maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'var(--size-h2)', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: 'var(--space-400)', textAlign: 'center' }}>
            Frequently Asked <span style={{ color: 'var(--color-accent)' }}>Questions</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
            {[
              { q: "Do I actually need a crypto wallet for the certificates?", a: "No! We abstract the wallet creation using Program Derived Addresses (PDAs) on Solana. Your certificate is mathematically tied to your GitHub account ID." },
              { q: "Is the AI interview really voice?", a: "Yes. We use the Web Speech API alongside Groq's high-speed inference to create a seamless, low-latency conversational experience." },
              { q: "Can I use languages other than Python and JS?", a: "Yes, our Judge0 integration supports C++, Rust, Go, Ruby, and Java for code execution." }
            ].map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-200)' }}>
                <h4 style={{ fontWeight: 600, fontSize: 'var(--size-base)', marginBottom: 'var(--space-100)', display: 'flex', justifyContent: 'space-between' }}>
                  {faq.q}
                </h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--size-small)', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'var(--space-800) var(--space-400)', background: 'var(--color-bg-card)', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: 'var(--space-200)' }}>
            Ready to become a <span style={{ color: 'var(--color-accent)' }}>10x Engineer?</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-400)', maxWidth: 600, margin: '0 auto var(--space-400) auto' }}>Join thousands of developers leveling up their skills and securing offers from top-tier companies.</p>
          <form action={signInWithGithub} className="w-full sm:w-auto px-4 sm:px-0">
            <button type="submit" className="btn btn-primary w-full sm:w-auto" style={{ padding: 'var(--space-200) var(--space-600)', fontSize: '1.2rem', display: 'flex', gap: 'var(--space-100)', alignItems: 'center', margin: '0 auto', justifyContent: 'center' }}>
              <Github size={20} /> Deploy Your Career
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--color-border)', padding: 'var(--space-400)', background: 'var(--color-bg-elevated)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-100)', marginBottom: 'var(--space-200)' }}>
          <Star size={16} color="var(--color-accent)" fill="currentColor" />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800 }}>DevAgent24</span>
        </div>
        <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--size-xs)' }}>
          © {new Date().getFullYear()} DevAgent24 Inc. Built for the elite hackathon.
        </div>
      </footer>
    </div>
  );
}
