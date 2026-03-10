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
  LogOut,
} from 'lucide-react';
import { signOut } from '@/app/actions/auth';

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

export default function DashboardLayoutClient({ children, userProfile }: { children: React.ReactNode, userProfile: any }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Sidebar */}
      <aside
        className={`sidebar ${mobileOpen ? 'open' : ''}`}
        style={{ background: 'var(--color-bg-elevated)', borderRight: '1px solid var(--color-border)' }}
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
        <nav style={{ padding: 'var(--space-200) 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
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
          
          <div style={{ marginTop: 'auto', padding: '0 var(--space-200)' }}>
            <form action={signOut}>
               <button 
                type="submit" 
                className="sidebar-link" 
                style={{ width: '100%', border: 'none', background: 'transparent', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
               >
                 <LogOut size={18} /> Sign Out
               </button>
            </form>
          </div>
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
          {userProfile.avatar_url ? (
            <img 
              src={userProfile.avatar_url} 
              alt="Avatar" 
              style={{ width: 32, height: 32, borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)' }} 
            />
          ) : (
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
          )}
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: 'var(--size-small)', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {userProfile.full_name}
            </div>
            <div style={{ fontSize: 'var(--size-xs)', color: 'var(--color-accent)' }}>Pro Level</div>
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
          width: '100%',
          marginLeft: 260,
          padding: 'var(--space-400)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
          {children}
        </div>
      </main>

      <style>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: var(--color-bg-elevated);
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          z-index: 100;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (max-width: 1024px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); }
          main { margin-left: 0 !important; padding: var(--space-300) !important; padding-top: 80px !important; }
          .mobile-menu-btn { display: flex !important; align-items: center; justify-content: center; }
        }

        .mobile-menu-btn {
          position: fixed;
          top: var(--space-200);
          left: var(--space-200);
          z-index: 110;
          display: none;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: var(--space-100);
          color: var(--color-text);
          cursor: pointer;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
