'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Code,
  Mic,
  Award,
  Plane,
  TrendingUp,
  Clock,
  Target,
  Trophy,
  ArrowRight,
  Activity,
} from 'lucide-react';

const STAT_CARDS = [
  {
    icon: Code,
    label: 'Challenges Completed',
    value: '7 / 12',
    change: '+3 this week',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.1)',
  },
  {
    icon: Mic,
    label: 'Interviews Done',
    value: '4',
    change: '2 this week',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.1)',
  },
  {
    icon: Award,
    label: 'Certificates Earned',
    value: '2',
    change: '1 pending',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
  },
  {
    icon: TrendingUp,
    label: 'Overall Score',
    value: '82%',
    change: '+12% improvement',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
  },
];

const SKILL_DATA = [
  { skill: 'Algorithms', score: 78 },
  { skill: 'Data Structures', score: 85 },
  { skill: 'System Design', score: 62 },
  { skill: 'Behavioral', score: 70 },
  { skill: 'Language Prof.', score: 90 },
  { skill: 'Testing / TDD', score: 75 },
];

const RECENT_ACTIVITY = [
  { type: 'challenge', title: 'Two Sum', status: 'completed', time: '2 hours ago', color: '#10b981' },
  { type: 'interview', title: 'Technical Interview #4', status: 'completed', time: '5 hours ago', color: '#06b6d4' },
  { type: 'challenge', title: 'LRU Cache', status: 'in-progress', time: '1 day ago', color: '#f59e0b' },
  { type: 'certificate', title: 'Data Structures Cert', status: 'issued', time: '2 days ago', color: '#a855f7' },
  { type: 'challenge', title: 'Binary Search', status: 'completed', time: '3 days ago', color: '#10b981' },
];

const QUICK_ACTIONS = [
  { href: '/dashboard/challenges', icon: Code, label: 'Start Challenge', desc: 'Pick a TDD challenge', gradient: '#6366f1' },
  { href: '/dashboard/interview', icon: Mic, label: 'Mock Interview', desc: 'Voice interview with AI', gradient: '#06b6d4' },
  { href: '/dashboard/travel', icon: Plane, label: 'Plan Travel', desc: 'AI itinerary planner', gradient: '#10b981' },
  { href: '/dashboard/certificates', icon: Award, label: 'My Certificates', desc: 'View credentials', gradient: '#f59e0b' },
];

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}
        >
          Welcome back, Developer 👋
        </motion.h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Here&apos;s your progress overview and next steps.
        </p>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}
      >
        {STAT_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card"
            style={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: card.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <card.icon size={20} color={card.color} />
              </div>
              <Activity size={16} color="var(--text-muted)" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>{card.value}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 4 }}>{card.label}</div>
            <div style={{ fontSize: '0.75rem', color: card.color, fontWeight: 500 }}>{card.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Main content area */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          marginBottom: 32,
        }}
      >
        {/* Skill Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card"
          style={{ padding: '28px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <Target size={20} color="#6366f1" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Skill Matrix</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SKILL_DATA.map((s) => (
              <div key={s.skill}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                    fontSize: '0.85rem',
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>{s.skill}</span>
                  <span style={{ fontWeight: 600 }}>{s.score}%</span>
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
                    animate={{ width: `${s.score}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                      height: '100%',
                      borderRadius: 3,
                      background:
                        s.score >= 80
                          ? 'linear-gradient(90deg, #10b981, #06b6d4)'
                          : s.score >= 60
                          ? 'linear-gradient(90deg, #6366f1, #8b5cf6)'
                          : 'linear-gradient(90deg, #f59e0b, #f43f5e)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card"
          style={{ padding: '28px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <Clock size={20} color="#06b6d4" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent Activity</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {RECENT_ACTIVITY.map((a, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: a.color,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{a.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.time}</div>
                </div>
                <span
                  className={`badge ${
                    a.status === 'completed'
                      ? 'badge-easy'
                      : a.status === 'in-progress'
                      ? 'badge-medium'
                      : 'badge-hard'
                  }`}
                  style={{ fontSize: '0.65rem' }}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Trophy size={20} color="#f59e0b" />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Quick Actions</h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="glass-card"
              style={{
                padding: '24px',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${action.gradient}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <action.icon size={22} color={action.gradient} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{action.label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{action.desc}</div>
              </div>
              <ArrowRight size={16} color="var(--text-muted)" />
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
