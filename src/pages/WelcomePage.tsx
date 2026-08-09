import { useEffect, useState } from 'react'
import { useApp } from '../App'
import BrandLogo from '../components/BrandLogo'

export default function WelcomePage() {
  const { nav } = useApp()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background image at ~8% opacity */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(/assets/site-background.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 1,
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.32)',
        }}
      />

      {/* Subtle border lines */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 48,
          right: 48,
          bottom: 48,
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 4,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '0 24px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Overline */}
        <p
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: 11,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 500,
            marginBottom: 28,
          }}
        >
          CREATIVE DESIGN STUDIO — KERALA
        </p>

        {/* Brand name */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BrandLogo width="min(720px, 82vw)" adaptive={false} />
        </div>

        {/* Category line */}
        <p
          style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: 'clamp(10px, 1.5vw, 13px)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            fontWeight: 500,
            marginTop: 20,
            marginBottom: 0,
          }}
        >
          POORAM&nbsp;&nbsp;•&nbsp;&nbsp;FESTIVAL&nbsp;&nbsp;•&nbsp;&nbsp;CREATIVE DESIGN
        </p>

        {/* Tagline */}
        <p
          className="font-display"
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            fontStyle: 'italic',
            marginTop: 32,
            marginBottom: 48,
            fontWeight: 400,
          }}
        >
          "Visuals that make your celebration unforgettable."
        </p>

        {/* CTA */}
        <button
          onClick={() => nav('portfolio')}
          style={{
            background: '#8B0000',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 4,
            padding: '16px 40px',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'background 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            const btn = e.currentTarget as HTMLButtonElement
            btn.style.background = '#5C0000'
            btn.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            const btn = e.currentTarget as HTMLButtonElement
            btn.style.background = '#8B0000'
            btn.style.transform = 'translateY(0)'
          }}
        >
          EXPLORE NOW →
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          opacity: loaded ? 0.4 : 0,
          transition: 'opacity 1.2s ease 0.6s',
        }}
      >
        <span style={{ color: '#FFFFFF', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Scroll to explore
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
          }}
        />
      </div>
    </div>
  )
}
