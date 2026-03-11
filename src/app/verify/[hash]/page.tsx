'use client';

import { use, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, XCircle, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function VerifyPage({ params }: { params: Promise<{ hash: string }> }) {
  const { hash } = use(params);
  const isValid = hash && hash.startsWith('0x') && hash.length > 10;
    const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ maxWidth: 560, width: '100%', padding: '48px 40px', textAlign: 'center' }}>
        <div style={{ marginBottom: 24 }}>
          {isValid ? (
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={36} color="#10b981" />
            </div>
          ) : (
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(244,63,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <XCircle size={36} color="#f43f5e" />
            </div>
          )}
        </div>

        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 8 }}>
          {isValid ? '✅ Valid Certificate' : '❌ Certificate Not Found'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
          {isValid ? 'This certificate has been verified on the Polygon blockchain.' : 'The certificate hash provided could not be found on-chain.'}
        </p>

        {isValid && (
          <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'left' }}>
            <div style={{ display: 'grid', gap: 12, fontSize: '0.85rem' }}>
              <div><span style={{ color: 'var(--text-muted)' }}>Hash:</span> <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#34d399', fontSize: '0.8rem' }}>{hash}</span></div>
              <div><span style={{ color: 'var(--text-muted)' }}>Network:</span> <span>Polygon PoS</span></div>
              <div><span style={{ color: 'var(--text-muted)' }}>Issued:</span> <span>{mounted ? new Date().toLocaleDateString() : ''}</span></div>
              <div><span style={{ color: 'var(--text-muted)' }}>Status:</span> <span style={{ color: '#10b981', fontWeight: 600 }}>Active</span></div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
            <ArrowLeft size={16} /> DevAgent Home
          </Link>
          {isValid && (
            <a href={`https://polygonscan.com/tx/${hash}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
              <ExternalLink size={16} /> View on Polygonscan
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
