import { FormEvent, useState } from 'react'
import BrandLogo from '../components/BrandLogo'
import { useAuth } from '../components/AuthProvider'
import { useApp } from '../App'

export default function AdminLoginPage() {
  const { signIn, loading } = useAuth()
  const { theme, toggleTheme } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    const result = await signIn(email.trim(), password)
    if (result.error) {
      setError('Invalid email or password. Please try again.')
    }

    setSubmitting(false)
  }

  if (loading) return null

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--c-bg)', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 16, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <BrandLogo width={150} />
            <p style={{ margin: '10px 0 0', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', fontWeight: 700 }}>
              Admin Login
            </p>
          </div>
          <button onClick={toggleTheme} aria-label="Toggle theme" style={{ border: '1px solid var(--c-border)', background: 'var(--c-bg2)', color: 'var(--c-text)', borderRadius: 8, width: 38, height: 38, cursor: 'pointer' }}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>

        <h1 className="font-display" style={{ margin: '0 0 6px', fontSize: 30, fontWeight: 400, color: 'var(--c-text)' }}>
          Welcome back
        </h1>
        <p style={{ margin: '0 0 24px', fontSize: 13, color: 'var(--c-muted)' }}>
          Sign in to access the admin dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 7, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>
            Email
          </label>
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@example.com"
            style={{ width: '100%', boxSizing: 'border-box', background: 'var(--c-bg2)', border: '1px solid var(--c-border)', borderRadius: 8, padding: '12px 14px', color: 'var(--c-text)', outline: 'none', marginBottom: 16 }}
          />

          <label style={{ display: 'block', marginBottom: 7, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>
            Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: '100%', boxSizing: 'border-box', background: 'var(--c-bg2)', border: '1px solid var(--c-border)', borderRadius: 8, padding: '12px 14px', color: 'var(--c-text)', outline: 'none', marginBottom: 16 }}
          />

          {error && (
            <div role="alert" style={{ background: 'rgba(139,0,0,0.08)', border: '1px solid rgba(139,0,0,0.2)', color: '#8B0000', borderRadius: 8, padding: '10px 12px', fontSize: 12, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{ width: '100%', border: 'none', borderRadius: 8, padding: '13px 16px', background: '#8B0000', color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', cursor: submitting ? 'wait' : 'pointer', opacity: submitting ? 0.7 : 1 }}
          >
            {submitting ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>
      </div>
    </main>
  )
}
