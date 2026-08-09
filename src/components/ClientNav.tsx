import { useState } from 'react'
import { useApp, type Page } from '../App'
import BrandLogo from './BrandLogo'

const links: { label: string; page: Page }[] = [
  { label: 'Works', page: 'portfolio' },
  { label: 'Availability', page: 'availability' },
  { label: 'Enquiry', page: 'enquiry' },
  { label: 'Invoice', page: 'invoice' },
]

export default function ClientNav() {
  const { theme, toggleTheme, page, nav } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      style={{
        background: 'var(--c-bg)',
        borderBottom: '1px solid var(--c-border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'background-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Logo */}
          <button
            onClick={() => nav('welcome')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <BrandLogo width={142} />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ gap: 4, alignItems: 'center' }}>
            {links.map(l => (
              <button
                key={l.page}
                onClick={() => nav(l.page)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px 14px',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: page === l.page ? 'var(--c-brand)' : 'var(--c-muted)',
                  borderBottom: page === l.page ? '2px solid var(--c-brand)' : '2px solid transparent',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { if (page !== l.page) (e.currentTarget as HTMLButtonElement).style.color = 'var(--c-text)' }}
                onMouseLeave={e => { if (page !== l.page) (e.currentTarget as HTMLButtonElement).style.color = 'var(--c-muted)' }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                background: 'var(--c-bg2)',
                border: '1px solid var(--c-border)',
                borderRadius: 8,
                width: 36,
                height: 36,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--c-text)',
                fontSize: 15,
                transition: 'background 0.2s',
              }}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>

            {/* Admin link */}
            <button
              onClick={() => nav('admin')}
              title="Admin Dashboard"
              style={{
                background: 'none',
                border: '1px solid var(--c-border)',
                borderRadius: 8,
                width: 36,
                height: 36,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--c-muted)',
                fontSize: 13,
              }}
            >
              ⚙
            </button>

            {/* Mobile hamburger */}
            <button
              className="flex md:hidden"
              onClick={() => setMobileOpen(o => !o)}
              style={{
                background: 'none',
                border: '1px solid var(--c-border)',
                borderRadius: 8,
                width: 36,
                height: 36,
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--c-text)',
                fontSize: 16,
              }}
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="flex md:hidden"
            style={{
              flexDirection: 'column',
              borderTop: '1px solid var(--c-border)',
              paddingBottom: 16,
            }}
          >
            {links.map(l => (
              <button
                key={l.page}
                onClick={() => { nav(l.page); setMobileOpen(false) }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '12px 0',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: page === l.page ? 'var(--c-brand)' : 'var(--c-text)',
                  textAlign: 'left',
                  borderBottom: '1px solid var(--c-border)',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
