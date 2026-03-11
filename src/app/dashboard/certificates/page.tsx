'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Download, Shield, CheckCircle2, Clock, Linkedin, Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const CERTS = [
  {
    id: 'cert-001', track_name: 'Data Structures & Algorithms', score: 92,
    blockchain_hash: '0x7a3f8c2d1e9b4a5f6c7d8e9f0a1b2c3d4e5f6789',
    issued_at: '2026-03-08T10:30:00Z', skills: ['Arrays', 'Hash Maps', 'Binary Search', 'DP'], verified: true,
  },
  {
    id: 'cert-002', track_name: 'TDD Mastery — Python', score: 88,
    blockchain_hash: '0x1b2c3d4e5f6789abcdef0123456789abcdef0123',
    issued_at: '2026-03-06T14:20:00Z', skills: ['TDD', 'RED-GREEN-REFACTOR', 'Python'], verified: true,
  },
  {
    id: 'cert-003', track_name: 'Technical Interview — Advanced', score: 85,
    blockchain_hash: '',
    issued_at: '2026-03-04T09:15:00Z', skills: ['System Design', 'Problem Solving', 'Communication'], verified: false,
  },
];

export default function CertificatesPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchCerts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('issued_at', { ascending: false });
    
    if (!error && data) {
      setCerts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    setMounted(true);
    fetchCerts();
  }, []);

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ['#f59e0b', '#fbbf24', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleMintDemo = async () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Minting Certificate on Solana Devnet...',
        success: () => {
          triggerConfetti();
          return 'Certificate minted successfully!';
        },
        error: 'Minting failed. Please try again.',
      }
    );
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 'var(--size-h2)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 'var(--space-050)' }}>
            <Award size={32} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 12, color: 'var(--color-accent)' }} />
            My Certificates
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--size-small)' }}>Blockchain-verified credentials. Share on LinkedIn or verify with QR code.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={fetchCerts} className="btn-secondary" style={{ padding: '10px' }}>
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={handleMintDemo} className="btn-primary" style={{ padding: '10px 20px' }}>
            <Plus size={18} /> Mint New
          </button>
        </div>
      </motion.div>

      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: 'var(--space-200)', 
          marginBottom: 'var(--space-400)' 
        }}
      >
        {[
          { label: 'Total', value: certs.length || CERTS.length, color: 'var(--color-accent)' },
          { label: 'Verified', value: (certs.length ? certs.filter(c => c.verified) : CERTS.filter(c => c.verified)).length, color: 'var(--color-success)' },
          { label: 'Avg Score', value: `${certs.length ? Math.round(certs.reduce((a, c) => a + c.score, 0) / certs.length) : 88}%`, color: 'var(--color-text)' },
        ].map((s, i) => (
          <motion.div 
            key={s.label} 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="card-flat" 
            style={{ padding: 'var(--space-300)', textAlign: 'center' }}
          >
            <div style={{ fontSize: 'var(--size-h2)', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 'var(--size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-050)', fontWeight: 600, letterSpacing: '0.05em' }}>{s.label.toUpperCase()}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-300)' }}>
        {(certs.length > 0 ? certs : CERTS).map((cert: any, i: number) => (
          <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '32px 24px 24px', background: cert.verified ? 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))' : 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(244,63,94,0.05))', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: cert.verified ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cert.verified ? <Shield size={24} color="#10b981" /> : <Clock size={24} color="#f59e0b" />}
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: cert.verified ? '#10b981' : '#f59e0b' }}>{cert.score}%</div>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>{cert.track_name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Issued: {mounted ? new Date(cert.issued_at).toLocaleDateString() : ''}</p>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                {(cert.skills || []).map((s: string) => (
                  <span key={s} style={{ padding: '3px 10px', borderRadius: 6, background: 'rgba(99,102,241,0.1)', fontSize: '0.72rem', color: '#818cf8' }}>{s}</span>
                ))}
              </div>
              {cert.verified && cert.blockchain_hash && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <CheckCircle2 size={14} color="#10b981" />
                  <span style={{ fontSize: '0.75rem', color: '#34d399', fontFamily: "'JetBrains Mono', monospace" }}>{cert.blockchain_hash.slice(0, 10)}...{cert.blockchain_hash.slice(-8)}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                {cert.verified && <Link href={cert.blockchain_hash ? `https://explorer.solana.com/tx/${cert.blockchain_hash}?cluster=devnet` : '#'} target="_blank" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem', flex: 1, textAlign: 'center' }}><ExternalLink size={12} /> Verify</Link>}
                <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem', flex: 1 }}><Download size={12} /> PDF</button>
                <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem', flex: 1 }}><Linkedin size={12} /> Share</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
