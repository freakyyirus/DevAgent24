'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Download, Shield, CheckCircle2, Clock, Linkedin } from 'lucide-react';
import Link from 'next/link';

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
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 4 }}>
          <Award size={28} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 10, color: '#f59e0b' }} />
          My Certificates
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Blockchain-verified credentials. Share on LinkedIn or verify with QR code.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Total', value: CERTS.length, color: '#6366f1' },
          { label: 'Verified', value: CERTS.filter(c => c.verified).length, color: '#10b981' },
          { label: 'Avg Score', value: `${Math.round(CERTS.reduce((a, c) => a + c.score, 0) / CERTS.length)}%`, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
        {CERTS.map((cert, i) => (
          <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '32px 24px 24px', background: cert.verified ? 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))' : 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(244,63,94,0.05))', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: cert.verified ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cert.verified ? <Shield size={24} color="#10b981" /> : <Clock size={24} color="#f59e0b" />}
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: cert.verified ? '#10b981' : '#f59e0b' }}>{cert.score}%</div>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>{cert.track_name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Issued: {new Date(cert.issued_at).toLocaleDateString()}</p>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                {cert.skills.map(s => (
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
                {cert.verified && <Link href={`/verify/${cert.blockchain_hash}`} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem', flex: 1, textAlign: 'center' }}><ExternalLink size={12} /> Verify</Link>}
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
