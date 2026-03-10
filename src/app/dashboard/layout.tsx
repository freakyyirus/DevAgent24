'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Code,
  Mic,
  Plane,
  Award,
  Menu,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/challenges', label: 'Challenges', icon: Code },
  { href: '/dashboard/interview', label: 'Interview', icon: Mic },
  { href: '/dashboard/travel', label: 'Travel Planner', icon: Plane },
  { href: '/dashboard/certificates', label: 'Certificates', icon: Award },
];

/* Star SVG */
function StarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 0L17.5 14.5L32 16L17.5 17.5L16 32L14.5 17.5L0 16L14.5 14.5L16 0Z" fill="currentColor" />
    </svg>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside
        className={`sidebar ${mobileOpen ? 'open' : ''}`}
        style={{ background: 'var(--color-bg-elevated)' }}
      >
        {/* Logo */}
        <div
          style={{
            padding: 'var(--space-300) var(--space-200)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-100)',
          }}
        >
          <div style={{ color: 'var(--color-accent)' }}>
            <StarIcon size={18} />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.05rem',
            }}
          >
            DevAgent<span style={{ color: 'var(--color-accent)' }}>24</span>
          </span>
        </div>

        {/* Nav */}
        <nav style={{ padding: 'var(--space-200) 0', flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Profile */}
        <div
          style={{
            padding: 'var(--space-200)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-150)',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-full)',
              background: 'rgba(212, 168, 67, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 'var(--size-xs)',
              color: 'var(--color-accent)',
            }}
          >
            DA
          </div>
          <div>
            <div style={{ fontSize: 'var(--size-small)', fontWeight: 600 }}>Developer</div>
            <div style={{ fontSize: 'var(--size-xs)', color: 'var(--color-text-muted)' }}>Free Plan</div>
          </div>
        </div>
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen((o) => !o)}
        style={{
          position: 'fixed',
          top: 'var(--space-200)',
          left: 'var(--space-200)',
          zIndex: 50,
          display: 'none',
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: 'var(--space-100)',
          color: 'var(--color-text)',
          cursor: 'pointer',
        }}
        className="mobile-menu-btn"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          marginLeft: 260,
          padding: 'var(--space-400)',
          maxWidth: 1200,
        }}
      >
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          main { margin-left: 0 !important; padding: var(--space-200) !important; padding-top: 60px !important; }
        }
      `}</style>
    </div>
  );
}
