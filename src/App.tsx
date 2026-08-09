import { useState, useEffect, createContext, useContext, type ReactNode } from 'react'
import { createClient, type Session } from '@supabase/supabase-js'
import WelcomePage from './pages/WelcomePage'
import PortfolioPage from './pages/PortfolioPage'
import AvailabilityPage from './pages/AvailabilityPage'
import EnquiryPage from './pages/EnquiryPage'
import InvoicePage from './pages/InvoicePage'
import AdminPage from './pages/AdminPage'

export type Page = 'welcome' | 'portfolio' | 'availability' | 'enquiry' | 'invoice' | 'admin'
export type AvailStatus = 'available' | 'limited' | 'booked' | 'unavailable'

interface AppCtx {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  page: Page
  nav: (p: Page) => void
  whatsapp: string
  setWhatsapp: (n: string) => void
  avail: Record<string, AvailStatus>
  setAvail: React.Dispatch<React.SetStateAction<Record<string, AvailStatus>>>
}

export const Ctx = createContext<AppCtx>({} as AppCtx)
export const useApp = () => useContext(Ctx)

const DEFAULT_AVAIL: Record<string, AvailStatus> = {
  '2026-08-12': 'limited',
  '2026-08-13': 'booked',
  '2026-08-18': 'booked',
  '2026-08-20': 'available',
  '2026-08-22': 'limited',
  '2026-08-25': 'booked',
  '2026-08-28': 'unavailable',
  '2026-09-01': 'available',
  '2026-09-05': 'limited',
  '2026-09-10': 'booked',
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = supabaseUrl && supabasePublishableKey
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null

function AdminLogin({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!supabase) {
      setError('Supabase is not configured. Check your .env.local file.')
      return
    }

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setLoading(false)

    if (loginError) {
      setError('Invalid email or password.')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--c-bg)', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 430, background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 16, padding: 36, boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', color: '#8B0000', marginBottom: 12 }}>ADHU GRAPHICS</div>
          <h1 className="font-display" style={{ margin: '0 0 8px', fontSize: 32, fontWeight: 400, color: 'var(--c-text)' }}>Admin Login</h1>
          <p style={{ margin: 0, color: 'var(--c-muted)', fontSize: 13 }}>Sign in to access the admin dashboard.</p>
        </div>

        <form onSubmit={handleLogin}>
          <label style={{ display: 'block', marginBottom: 7, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
            placeholder="admin@example.com"
            style={{ width: '100%', boxSizing: 'border-box', marginBottom: 18, padding: '13px 14px', borderRadius: 8, border: '1px solid var(--c-border)', background: 'var(--c-bg2)', color: 'var(--c-text)', outline: 'none', fontSize: 14 }}
          />

          <label style={{ display: 'block', marginBottom: 7, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Enter your password"
            style={{ width: '100%', boxSizing: 'border-box', marginBottom: 18, padding: '13px 14px', borderRadius: 8, border: '1px solid var(--c-border)', background: 'var(--c-bg2)', color: 'var(--c-text)', outline: 'none', fontSize: 14 }}
          />

          {error && (
            <div style={{ marginBottom: 18, padding: '11px 12px', borderRadius: 8, background: 'rgba(180,0,0,0.08)', color: '#B00000', border: '1px solid rgba(180,0,0,0.18)', fontSize: 12, lineHeight: 1.5 }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '13px 16px', border: 'none', borderRadius: 8, background: '#8B0000', color: '#fff', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <button onClick={onBack} style={{ width: '100%', marginTop: 14, padding: '10px', border: 'none', background: 'transparent', color: 'var(--c-muted)', fontSize: 12, cursor: 'pointer' }}>
          ← Back to website
        </button>
      </div>
    </div>
  )
}

function ProtectedAdmin({ onBack }: { onBack: () => void }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session)
        setLoading(false)
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) setSession(nextSession)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    if (supabase) await supabase.auth.signOut()
    onBack()
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--c-bg)', color: 'var(--c-muted)', fontSize: 13 }}>
        Checking admin access...
      </div>
    )
  }

  if (!session) return <AdminLogin onBack={onBack} />

  return (
    <>
      <AdminPage />
      <button
        onClick={logout}
        title="Sign out"
        style={{ position: 'fixed', right: 22, top: 18, zIndex: 1000, border: '1px solid var(--c-border)', borderRadius: 8, padding: '9px 13px', background: 'var(--c-surface)', color: 'var(--c-text)', fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', cursor: 'pointer', boxShadow: '0 5px 18px rgba(0,0,0,0.08)' }}
      >
        LOG OUT
      </button>
    </>
  )
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try { return (localStorage.getItem('adhu-theme') as 'light' | 'dark') || 'dark' }
    catch { return 'dark' }
  })
  const [page, setPage] = useState<Page>('welcome')
  const [whatsapp, setWhatsapp] = useState('')
  const [avail, setAvail] = useState<Record<string, AvailStatus>>(DEFAULT_AVAIL)

  const toggleTheme = () => {
    setTheme(t => {
      const next = t === 'light' ? 'dark' : 'light'
      try { localStorage.setItem('adhu-theme', next) } catch {}
      return next
    })
  }

  useEffect(() => {
    document.documentElement.className = theme
    document.body.style.backgroundColor = theme === 'dark' ? '#0A0A0A' : '#FFFFFF'
    document.body.style.color = theme === 'dark' ? '#FFFFFF' : '#000000'
  }, [theme])

  const ctx: AppCtx = { theme, toggleTheme, page, nav: setPage, whatsapp, setWhatsapp, avail, setAvail }

  return (
    <Ctx.Provider value={ctx}>
      {page === 'welcome' && <WelcomePage />}
      {page === 'portfolio' && <PortfolioPage />}
      {page === 'availability' && <AvailabilityPage />}
      {page === 'enquiry' && <EnquiryPage />}
      {page === 'invoice' && <InvoicePage />}
      {page === 'admin' && <ProtectedAdmin onBack={() => setPage('portfolio')} />}
    </Ctx.Provider>
  )
}
