'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Trophy,
  Mic,
  Award,
  TrendingUp,
  Code,
  ArrowRight,
  Clock,
  CheckCircle,
  Star,
} from 'lucide-react';

const stats = [
  { label: 'Challenges Completed', value: '3', icon: Trophy, change: '+2 this week' },
  { label: 'Interviews Done', value: '1', icon: Mic, change: 'First one done!' },
  { label: 'Certificates Earned', value: '0', icon: Award, change: 'Complete a track' },
  { label: 'Overall Score', value: '72%', icon: TrendingUp, change: 'Above average' },
];

const skills = [
  { name: 'Arrays & Hash Maps', pct: 80 },
  { name: 'Linked Lists', pct: 45 },
  { name: 'Dynamic Programming', pct: 30 },
  { name: 'System Design', pct: 55 },
  { name: 'Backtracking', pct: 20 },
];

const recentActivity = [
  { action: 'Completed "Two Sum" challenge', time: '2 hours ago', type: 'challenge' },
  { action: 'Started Technical Interview', time: '5 hours ago', type: 'interview' },
  { action: 'Completed "Valid Parentheses"', time: '1 day ago', type: 'challenge' },
  { action: 'Joined DevAgent24 platform', time: '2 days ago', type: 'system' },
];

const quickActions = [
  { label: 'Start Challenge', href: '/dashboard/challenges', icon: Code, desc: 'Practice TDD coding' },
  { label: 'Mock Interview', href: '/dashboard/interview', icon: Mic, desc: 'AI voice interview' },
  { label: 'View Certificates', href: '/dashboard/certificates', icon: Award, desc: 'Your credentials' },
];

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 'var(--space-400)' }}
      >
        <h1 style={{ fontSize: 'var(--size-h2)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 'var(--space-050)' }}>
          Welcome back 👋
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--size-small)' }}>
          Here&apos;s your progress overview. Keep pushing forward.
        </p>
      </motion.div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-200)',
          marginBottom: 'var(--space-400)',
        }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card-flat"
            style={{ padding: 'var(--space-300)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-150)' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--size-xs)', fontWeight: 500 }}>{s.label}</span>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(212, 168, 67, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <s.icon size={16} color="var(--color-accent)" />
              </div>
            </div>
            <div style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 800, lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--size-xs)', marginTop: 'var(--space-050)' }}>
              {s.change}
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-200)' }}>
        {/* Skill Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-flat"
          style={{ padding: 'var(--space-300)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-100)', marginBottom: 'var(--space-300)' }}>
            <Star size={16} color="var(--color-accent)" />
            <h3 style={{ fontSize: 'var(--size-h4)', fontWeight: 700 }}>Skill Matrix</h3>
          </div>
          {skills.map((skill) => (
            <div key={skill.name} style={{ marginBottom: 'var(--space-200)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-050)', fontSize: 'var(--size-small)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>{skill.name}</span>
                <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>{skill.pct}%</span>
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.pct}%` }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{
                    height: '100%',
                    borderRadius: 3,
                    background: 'var(--color-accent)',
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-flat"
          style={{ padding: 'var(--space-300)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-100)', marginBottom: 'var(--space-300)' }}>
            <Clock size={16} color="var(--color-accent)" />
            <h3 style={{ fontSize: 'var(--size-h4)', fontWeight: 700 }}>Recent Activity</h3>
          </div>
          {recentActivity.map((a, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-150)',
                padding: 'var(--space-150) 0',
                borderBottom: i < recentActivity.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <CheckCircle size={14} color="var(--color-success)" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--size-small)', fontWeight: 500 }}>{a.action}</div>
                <div style={{ fontSize: 'var(--size-xs)', color: 'var(--color-text-muted)' }}>{a.time}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'var(--space-200)',
          marginTop: 'var(--space-400)',
        }}
      >
        {quickActions.map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.08 }}
          >
            <Link href={action.href} style={{ textDecoration: 'none' }}>
              <div
                className="card"
                style={{
                  padding: 'var(--space-300)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-200)' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(212, 168, 67, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <action.icon size={18} color="var(--color-accent)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--size-small)' }}>{action.label}</div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--size-xs)' }}>{action.desc}</div>
                  </div>
                </div>
                <ArrowRight size={16} color="var(--color-text-muted)" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
