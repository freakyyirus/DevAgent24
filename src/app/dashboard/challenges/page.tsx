'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CHALLENGES } from '@/lib/challenges-data';
import { Code, Clock, ArrowRight, Search, Filter } from 'lucide-react';
import type { Difficulty } from '@/types';

export default function ChallengesPage() {
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState<Difficulty | 'all'>('all');
  const [catFilter, setCatFilter] = useState('all');

  const categories = ['all', ...new Set(CHALLENGES.map((c) => c.category))];

  const filtered = CHALLENGES.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchDiff = diffFilter === 'all' || c.difficulty === diffFilter;
    const matchCat = catFilter === 'all' || c.category === catFilter;
    return matchSearch && matchDiff && matchCat;
  });

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>
          <Code size={28} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 10, color: '#6366f1' }} />
          TDD Challenges
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Practice with RED → GREEN → REFACTOR methodology. Pick a challenge and language to start.
        </p>
      </motion.div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderRadius: 10,
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)',
            flex: '1 1 250px',
          }}
        >
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search challenges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              width: '100%',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Filter size={16} color="var(--text-muted)" />
          {(['all', 'easy', 'medium', 'hard'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDiffFilter(d)}
              className={diffFilter === d ? 'badge badge-easy' : 'badge'}
              style={{
                cursor: 'pointer',
                background: diffFilter === d ? undefined : 'var(--bg-glass)',
                color: diffFilter === d ? undefined : 'var(--text-secondary)',
                border: diffFilter === d ? undefined : '1px solid var(--border-subtle)',
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCatFilter(cat)}
            style={{
              padding: '6px 16px',
              borderRadius: 8,
              background: catFilter === cat ? 'rgba(99,102,241,0.15)' : 'transparent',
              color: catFilter === cat ? '#818cf8' : 'var(--text-secondary)',
              border: catFilter === cat ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            {cat === 'all' ? 'All Categories' : cat}
          </button>
        ))}
      </div>

      {/* Challenge Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 16,
        }}
      >
        {filtered.map((challenge, i) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={`/dashboard/challenges/${challenge.id}`}
              className="glass-card"
              style={{
                display: 'block',
                padding: '24px',
                textDecoration: 'none',
                color: 'inherit',
                height: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span
                  className={`badge badge-${challenge.difficulty}`}
                >
                  {challenge.difficulty}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  <Clock size={14} />
                  {challenge.estimated_minutes}m
                </div>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>{challenge.title}</h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  marginBottom: 16,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {challenge.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {challenge.skills_tested.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: '2px 8px',
                        borderRadius: 6,
                        background: 'rgba(255,255,255,0.04)',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <ArrowRight size={16} color="var(--text-muted)" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <Code size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
          <p>No challenges match your filters. Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
}
