import { useState } from 'react'
import ClientNav from '../components/ClientNav'

const CATEGORIES = ['All', 'Pooram Posters', 'Event Posters', 'Social Media', 'Festival Designs', 'Announcements', 'Promotional Designs']

const PORTFOLIO = [
  {
    id: 1,
    title: 'Unarv Chemmanoor Work',
    category: 'Pooram Posters',
    date: 'Apr 2026',
    description: 'the poster is done for unarvu chemmanoor and the elephant is puthupally keshavan also called as bheeman',
    image: '/assets/1.jpeg',
    tall: true,
  },
  {
    id: 2,
    title: 'Omkaram Moothedam Work',
    category: 'Festival Designs',
    date: 'Mar 2026',
    description: 'the poster is done for omkaram moothedam',
    image: '/assets/2.jpeg',
    tall: false,
  },
  {
    id: 3,
    title: 'Kizhakkumuri Kurukkanppara Work',
    category: 'Pooram Posters',
    date: 'Mar 2026',
    description: "the poster is a bramayugam themed poster and the band team is aattam kalasamithi",
    image: '/assets/3.jpeg',
    tall: true,
  },
  {
    id: 4,
    title: 'Nadumuri Padinjarubagam Work',
    category: 'Event Posters',
    date: 'Feb 2026',
    description: 'the poster is done for nadumuri padinjarubagam and elephant is mullath ganapahty',
    image: '/assets/4.jpeg',
    tall: false,
  },
  {
    id: 5,
    title: 'Dharshana Konnanbazar Work',
    category: 'Social Media',
    date: 'Apr 2026',
    description: 'Work done for Dharshana Konnanbazar the poster shows RDS thambolam',
    image: '/assets/5.jpeg',
    tall: false,
  },
  {
    id: 6,
    title: 'Pambadi Rajan Memorial',
    category: 'Announcements',
    date: 'Jan 2026',
    description: 'Official commemorative announcement poster for the Pambadi Rajan memorial event.',
    image: 'https://images.unsplash.com/photo-1779540894601-f852a255efbe?w=600&h=850&fit=crop&auto=format',
    tall: true,
  },
  {
    id: 7,
    title: 'Kottiyoor Utsavam',
    category: 'Festival Designs',
    date: 'Jun 2026',
    description: 'Complete festival branding suite including banners, posters and social creatives.',
    image: 'https://images.unsplash.com/photo-1641666017842-f94246ef2961?w=600&h=650&fit=crop&auto=format',
    tall: false,
  },
  {
    id: 8,
    title: 'Onam 2026 Creatives',
    category: 'Social Media',
    date: 'Sep 2026',
    description: 'Premium Onam social media creative package for 5 committees — boat race, floral rangoli, and celebration themes.',
    image: 'https://images.unsplash.com/photo-1705453168890-6c244eb82942?w=600&h=800&fit=crop&auto=format',
    tall: true,
  },
  {
    id: 9,
    title: 'Pooram Committee Banner',
    category: 'Promotional Designs',
    date: 'Apr 2026',
    description: 'Large format banner design for the Pooram organizing committee outdoor display.',
    image: 'https://images.unsplash.com/photo-1689610118132-96bde7f87e6e?w=600&h=700&fit=crop&auto=format',
    tall: false,
  },
]

type PortfolioItem = typeof PORTFOLIO[number]

function Modal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backdropFilter: 'blur(6px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--c-surface)',
          borderRadius: 12,
          maxWidth: 880,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          border: '1px solid var(--c-border)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ background: '#111', minHeight: 400 }}>
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--c-brand)', fontWeight: 600, marginBottom: 12 }}>
              {item.category}
            </p>
            <h2 className="font-display" style={{ fontSize: 30, fontWeight: 400, margin: '0 0 16px', color: 'var(--c-text)', lineHeight: 1.15 }}>
              {item.title}
            </h2>
            <p style={{ color: 'var(--c-muted)', fontSize: 14, lineHeight: 1.7, margin: '0 0 24px' }}>
              {item.description}
            </p>
            <p style={{ fontSize: 12, color: 'var(--c-muted)', letterSpacing: '0.08em' }}>
              {item.date}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              marginTop: 32,
              padding: '12px 24px',
              background: 'none',
              border: '1px solid var(--c-border)',
              borderRadius: 6,
              cursor: 'pointer',
              color: 'var(--c-muted)',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState<PortfolioItem | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const filtered = activeCategory === 'All'
    ? PORTFOLIO
    : PORTFOLIO.filter(p => p.category === activeCategory)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)' }}>
      <ClientNav />

      {/* Hero */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px 48px' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.25em', color: 'var(--c-brand)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 16 }}>
          Portfolio
        </p>
        <h1
          className="font-display"
          style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 400, margin: '0 0 16px', color: 'var(--c-text)', letterSpacing: '-0.03em', lineHeight: 0.95 }}
        >
          MY WORKS
        </h1>
        <p style={{ color: 'var(--c-muted)', fontSize: 16, maxWidth: 480, lineHeight: 1.6, margin: 0 }}>
          Creative visuals crafted for Pooram celebrations and unforgettable events.
        </p>
      </div>

      {/* Category filter */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 40px' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: 100,
                border: `1px solid ${activeCategory === cat ? 'var(--c-brand)' : 'var(--c-border)'}`,
                background: activeCategory === cat ? 'var(--c-brand)' : 'transparent',
                color: activeCategory === cat ? '#FFFFFF' : 'var(--c-muted)',
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
            alignItems: 'start',
          }}
        >
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: 'var(--c-surface)',
                border: '1px solid var(--c-border)',
                borderRadius: 10,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                transform: hoveredId === item.id ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredId === item.id ? '0 16px 40px rgba(0,0,0,0.15)' : 'none',
                gridRow: item.tall ? 'span 2' : 'span 1',
              }}
            >
              <div
                style={{
                  overflow: 'hidden',
                  background: '#111',
                  height: item.tall ? 420 : 240,
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                    transform: hoveredId === item.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
              </div>
              <div style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--c-brand)', textTransform: 'uppercase', fontWeight: 600 }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--c-muted)' }}>{item.date}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 12px', color: 'var(--c-text)' }}>
                  {item.title}
                </h3>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    fontSize: 12,
                    color: 'var(--c-brand)',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  View Project →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
