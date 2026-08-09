import { useState } from 'react'
import { useApp, type AvailStatus } from '../App'
import BrandLogo from '../components/BrandLogo'

type AdminTab = 'dashboard' | 'bookings' | 'calendar' | 'enquiries' | 'invoices' | 'portfolio' | 'settings'

const NAV_ITEMS: { id: AdminTab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '▦' },
  { id: 'bookings', label: 'Bookings', icon: '📋' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'enquiries', label: 'Enquiries', icon: '✉' },
  { id: 'invoices', label: 'Invoices', icon: '🧾' },
  { id: 'portfolio', label: 'Portfolio', icon: '🖼' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

const BOOKINGS = [
  { id: 'BK001', client: 'Ramesh Nair', committee: 'Thrissur Pooram Committee', project: 'Pooram Main Poster', booked: '01 Aug', delivery: '20 Aug', status: 'In Progress', payment: 'Partial' },
  { id: 'BK002', client: 'Suresh Kumar', committee: 'Arattupuzha Seva Sangham', project: 'Festival Branding', booked: '28 Jul', delivery: '15 Aug', status: 'Confirmed', payment: 'Paid' },
  { id: 'BK003', client: 'Priya Menon', committee: 'Onam Celebrations Club', project: 'Onam Social Media', booked: '25 Jul', delivery: '05 Sep', status: 'Pending', payment: 'Pending' },
  { id: 'BK004', client: 'Arun Jose', committee: 'Nenmara Vallanghy Vela', project: 'Event Poster Series', booked: '22 Jul', delivery: '10 Aug', status: 'Completed', payment: 'Paid' },
  { id: 'BK005', client: 'Divya Krishnan', committee: 'Kottiyoor Utsavam', project: 'Banner Set (5 sizes)', booked: '18 Jul', delivery: '30 Aug', status: 'Waiting for Client', payment: 'Partial' },
]

const ENQUIRIES = [
  { id: 'ENQ-001', client: 'Manoj P.', committee: 'Thrissur Central', phone: '+91 94470 12345', event: 'Pooram 2027', type: 'Pooram Poster', reqDate: '20 Aug', delDate: '25 Aug', status: 'New', submitted: '09 Aug' },
  { id: 'ENQ-002', client: 'Lakshmi R.', committee: 'Vishu Utsavam', phone: '+91 98760 54321', event: 'Vishu 2027', type: 'Social Media', reqDate: '10 Apr', delDate: '12 Apr', status: 'Contacted', submitted: '08 Aug' },
  { id: 'ENQ-003', client: 'Biju Thomas', committee: 'Kochi Fest Org.', phone: '+91 97440 77889', event: 'Kerala Fest', type: 'Festival Branding', reqDate: '15 Sep', delDate: '30 Sep', status: 'Confirmed', submitted: '07 Aug' },
  { id: 'ENQ-004', client: 'Anila Dev', committee: 'Pambadi Rajan Trust', phone: '+91 94000 23456', event: 'Memorial Event', type: 'Announcement', reqDate: '12 Aug', delDate: '14 Aug', status: 'Completed', submitted: '01 Aug' },
]

const INVOICES = [
  { id: 'ADH-2026-007', client: 'Ramesh Nair', project: 'Pooram Main Poster', amount: '₹15,100', status: 'Partially Paid', due: '20 Aug' },
  { id: 'ADH-2026-006', client: 'Suresh Kumar', project: 'Festival Branding', amount: '₹22,500', status: 'Paid', due: '15 Aug' },
  { id: 'ADH-2026-005', client: 'Arun Jose', project: 'Event Poster Series', amount: '₹8,400', status: 'Paid', due: '10 Aug' },
  { id: 'ADH-2026-004', client: 'Priya Menon', project: 'Onam Social Media', amount: '₹12,000', status: 'Pending', due: '05 Sep' },
]

const PORTFOLIO_ITEMS = [
  { id: 1, title: 'Thrissur Pooram 2026', category: 'Pooram Posters', date: 'Apr 2026', visible: true, image: 'https://images.unsplash.com/photo-1652961573558-fd8de8cf4e77?w=200&h=200&fit=crop' },
  { id: 2, title: 'Nenmara Vallanghy Vela', category: 'Festival Designs', date: 'Mar 2026', visible: true, image: 'https://images.unsplash.com/photo-1713639980963-8c37e9906c1d?w=200&h=200&fit=crop' },
  { id: 3, title: 'Arattupuzha Pooram', category: 'Pooram Posters', date: 'Mar 2026', visible: false, image: 'https://images.unsplash.com/photo-1645441510555-ad67c4b5be0e?w=200&h=200&fit=crop' },
  { id: 4, title: 'Utsavam 2026', category: 'Event Posters', date: 'Feb 2026', visible: true, image: 'https://images.unsplash.com/photo-1779540894835-4c81cca56bb7?w=200&h=200&fit=crop' },
]

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  'Pending': { bg: 'rgba(180,140,0,0.1)', color: '#B8860B' },
  'Confirmed': { bg: 'rgba(0,100,200,0.1)', color: '#0064C8' },
  'In Progress': { bg: 'rgba(139,0,0,0.12)', color: '#8B0000' },
  'Waiting for Client': { bg: 'rgba(100,50,150,0.1)', color: '#645096' },
  'Completed': { bg: 'rgba(0,150,80,0.1)', color: '#009650' },
  'Cancelled': { bg: 'rgba(0,0,0,0.08)', color: '#666' },
  'New': { bg: 'rgba(139,0,0,0.12)', color: '#8B0000' },
  'Contacted': { bg: 'rgba(0,100,200,0.1)', color: '#0064C8' },
  'Paid': { bg: 'rgba(0,150,80,0.1)', color: '#009650' },
  'Partial': { bg: 'rgba(139,0,0,0.12)', color: '#8B0000' },
  'Partially Paid': { bg: 'rgba(139,0,0,0.12)', color: '#8B0000' },
}

function Badge({ label }: { label: string }) {
  const c = STATUS_COLORS[label] || { bg: 'rgba(0,0,0,0.06)', color: '#666' }
  return (
    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', background: c.bg, color: c.color }}>
      {label}
    </span>
  )
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 12, padding: '24px' }}>
      <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', fontWeight: 700, margin: '0 0 10px' }}>{label}</p>
      <p style={{ fontSize: 36, fontWeight: 700, color: 'var(--c-text)', margin: '0 0 4px', lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: 0 }}>{sub}</p>}
    </div>
  )
}

// Calendar mini for admin
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function AdminCalendar() {
  const { avail, setAvail } = useApp()
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [pendingStatus, setPendingStatus] = useState<AvailStatus>('available')

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells: { day: number; current: boolean; key: string }[] = []
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i
    const k = `${month === 0 ? year - 1 : year}-${String(month === 0 ? 12 : month).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    cells.push({ day: d, current: false, key: k })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true, key: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` })
  }
  const rem = 42 - cells.length
  for (let d = 1; d <= rem; d++) {
    const k = `${month === 11 ? year + 1 : year}-${String(month === 11 ? 1 : month + 2).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    cells.push({ day: d, current: false, key: k })
  }

  const STATUS_BG: Record<AvailStatus, string> = {
    available: 'transparent',
    limited: '#FFF0F0',
    booked: 'var(--c-bg2)',
    unavailable: 'var(--c-bg2)',
  }
  const STATUS_DOT: Record<AvailStatus, string> = {
    available: '#8B0000',
    limited: '#C44',
    booked: '#555',
    unavailable: '#999',
  }

  const handleSave = () => {
    if (selectedKey) {
      setAvail(prev => ({ ...prev, [selectedKey]: pendingStatus }))
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28, alignItems: 'start' }}>
      <div style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 12, padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <button onClick={() => setViewDate(new Date(year, month - 1, 1))} style={{ background: 'var(--c-bg2)', border: '1px solid var(--c-border)', borderRadius: 7, width: 34, height: 34, cursor: 'pointer', color: 'var(--c-text)', fontSize: 16 }}>‹</button>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--c-text)' }}>{MONTHS[month]} {year}</h3>
          <button onClick={() => setViewDate(new Date(year, month + 1, 1))} style={{ background: 'var(--c-bg2)', border: '1px solid var(--c-border)', borderRadius: 7, width: 34, height: 34, cursor: 'pointer', color: 'var(--c-text)', fontSize: 16 }}>›</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 6 }}>
          {DAYS.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'var(--c-muted)', padding: '3px 0' }}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
          {cells.map((cell, i) => {
            const s = avail[cell.key]
            const isSelected = cell.key === selectedKey
            return (
              <button key={i} onClick={() => { if (cell.current) setSelectedKey(cell.key) }}
                style={{
                  height: 40, borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: cell.current ? 'pointer' : 'default',
                  opacity: cell.current ? 1 : 0.2, border: isSelected ? '2px solid #8B0000' : '1px solid var(--c-border)',
                  background: isSelected ? '#8B0000' : (s ? STATUS_BG[s] : 'transparent'), color: isSelected ? '#fff' : 'var(--c-text)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                }}
              >
                {cell.day}
                {s && cell.current && <div style={{ width: 4, height: 4, borderRadius: '50%', background: isSelected ? '#fff' : STATUS_DOT[s] }} />}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 24 }}>
        <h3 style={{ margin: '0 0 20px', fontSize: 14, fontWeight: 700, color: 'var(--c-text)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Set Availability
        </h3>
        {selectedKey ? (
          <>
            <p style={{ fontSize: 13, color: 'var(--c-brand)', fontWeight: 600, marginBottom: 16 }}>{selectedKey}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {(['available', 'limited', 'booked', 'unavailable'] as AvailStatus[]).map(s => (
                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 14px', borderRadius: 8, border: `1px solid ${pendingStatus === s ? 'var(--c-brand)' : 'var(--c-border)'}`, background: pendingStatus === s ? 'var(--c-brand-light)' : 'transparent' }}>
                  <input type="radio" name="status" value={s} checked={pendingStatus === s} onChange={() => setPendingStatus(s)} style={{ accentColor: '#8B0000' }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--c-text)', textTransform: 'capitalize' }}>{s === 'booked' ? 'Fully Booked' : s.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
            <button onClick={handleSave} style={{ width: '100%', background: '#8B0000', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
              SAVE CHANGES
            </button>
          </>
        ) : (
          <p style={{ color: 'var(--c-muted)', fontSize: 13 }}>Select a date on the calendar to manage its availability.</p>
        )}
      </div>
    </div>
  )
}

export default function AdminPage() {
  const { theme, toggleTheme, nav, whatsapp, setWhatsapp } = useApp()
  const [tab, setTab] = useState<AdminTab>('dashboard')
  const [wNumber, setWNumber] = useState(whatsapp)
  const [defaultTheme, setDefaultTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [portfolioItems, setPortfolioItems] = useState(PORTFOLIO_ITEMS)

  const tableCellStyle: React.CSSProperties = { padding: '14px 16px', fontSize: 13, color: 'var(--c-text)', borderBottom: '1px solid var(--c-border)' }
  const tableHeadStyle: React.CSSProperties = { padding: '12px 16px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--c-muted)', textAlign: 'left', borderBottom: '2px solid var(--c-border)' }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--c-bg)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: 'var(--c-surface)',
          borderRight: '1px solid var(--c-border)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--c-border)' }}>
          <button onClick={() => nav('portfolio')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <BrandLogo width={130} />
          </button>
          <p style={{ fontSize: 10, color: 'var(--c-muted)', margin: '4px 0 0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin</p>
        </div>

        {/* Nav items */}
        <nav style={{ padding: '12px 10px', flex: 1 }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 8,
                border: 'none',
                background: tab === item.id ? 'var(--c-brand-light)' : 'transparent',
                color: tab === item.id ? '#8B0000' : 'var(--c-muted)',
                fontSize: 13,
                fontWeight: tab === item.id ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                marginBottom: 2,
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom controls */}
        <div style={{ padding: '16px 10px', borderTop: '1px solid var(--c-border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={toggleTheme}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, border: 'none', background: 'transparent', color: 'var(--c-muted)', fontSize: 13, fontWeight: 500, cursor: 'pointer', width: '100%', textAlign: 'left' }}
          >
            <span>{theme === 'dark' ? '☀' : '☾'}</span>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={() => nav('portfolio')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, border: 'none', background: 'transparent', color: 'var(--c-muted)', fontSize: 13, fontWeight: 500, cursor: 'pointer', width: '100%', textAlign: 'left' }}
          >
            <span>↗</span> View Site
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflow: 'auto', padding: '32px 40px' }}>

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div>
            <h1 className="font-display" style={{ fontSize: 32, fontWeight: 400, margin: '0 0 4px', color: 'var(--c-text)' }}>
              Welcome back, Adhu 👋
            </h1>
            <p style={{ color: 'var(--c-muted)', fontSize: 14, marginBottom: 32 }}>Here is what is happening with your projects today.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 40 }}>
              <StatCard label="Total Bookings" value={24} />
              <StatCard label="Pending" value={5} />
              <StatCard label="In Progress" value={7} />
              <StatCard label="Completed" value={12} />
              <StatCard label="Total Revenue" value="₹1.84L" sub="Aug 2026" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 24 }}>
                <h3 style={{ margin: '0 0 20px', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--c-muted)' }}>Upcoming Deadlines</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {BOOKINGS.filter(b => b.status !== 'Completed').map(b => (
                    <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--c-border)' }}>
                      <div>
                        <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>{b.project}</p>
                        <p style={{ margin: 0, fontSize: 11, color: 'var(--c-muted)' }}>{b.committee}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 700, color: '#8B0000' }}>{b.delivery}</p>
                        <Badge label={b.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 24 }}>
                <h3 style={{ margin: '0 0 20px', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--c-muted)' }}>Recent Enquiries</h3>
                {ENQUIRIES.slice(0, 4).map(e => (
                  <div key={e.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--c-border)' }}>
                    <div>
                      <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>{e.client}</p>
                      <p style={{ margin: 0, fontSize: 11, color: 'var(--c-muted)' }}>{e.type} · {e.submitted}</p>
                    </div>
                    <Badge label={e.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BOOKINGS */}
        {tab === 'bookings' && (
          <div>
            <SectionHead title="Bookings" sub="Manage all client bookings and project statuses." />
            <div style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 12, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--c-bg2)' }}>
                    {['Client', 'Committee', 'Project', 'Booked', 'Delivery', 'Status', 'Payment', 'Action'].map(h => (
                      <th key={h} style={tableHeadStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {BOOKINGS.map(b => (
                    <tr key={b.id} style={{ transition: 'background 0.15s' }}>
                      <td style={tableCellStyle}>
                        <div style={{ fontWeight: 600 }}>{b.client}</div>
                        <div style={{ fontSize: 11, color: 'var(--c-muted)' }}>{b.id}</div>
                      </td>
                      <td style={{ ...tableCellStyle, color: 'var(--c-muted)', maxWidth: 160 }}>{b.committee}</td>
                      <td style={{ ...tableCellStyle, fontWeight: 500 }}>{b.project}</td>
                      <td style={{ ...tableCellStyle, color: 'var(--c-muted)' }}>{b.booked}</td>
                      <td style={{ ...tableCellStyle, fontWeight: 600, color: '#8B0000' }}>{b.delivery}</td>
                      <td style={tableCellStyle}><Badge label={b.status} /></td>
                      <td style={tableCellStyle}><Badge label={b.payment} /></td>
                      <td style={tableCellStyle}>
                        <button style={{ fontSize: 12, color: '#8B0000', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>View →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CALENDAR */}
        {tab === 'calendar' && (
          <div>
            <SectionHead title="Availability Calendar" sub="Manage your availability — changes reflect on the client-facing calendar." />
            <AdminCalendar />
          </div>
        )}

        {/* ENQUIRIES */}
        {tab === 'enquiries' && (
          <div>
            <SectionHead title="Enquiries" sub="Review and manage incoming client enquiries." />
            <div style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 12, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--c-bg2)' }}>
                    {['ID', 'Client', 'Phone', 'Event', 'Type', 'Req. Date', 'Status', 'Actions'].map(h => (
                      <th key={h} style={tableHeadStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ENQUIRIES.map(e => (
                    <tr key={e.id}>
                      <td style={{ ...tableCellStyle, fontSize: 11, color: 'var(--c-muted)' }}>{e.id}</td>
                      <td style={tableCellStyle}>
                        <div style={{ fontWeight: 600 }}>{e.client}</div>
                        <div style={{ fontSize: 11, color: 'var(--c-muted)' }}>{e.committee}</div>
                      </td>
                      <td style={{ ...tableCellStyle, color: 'var(--c-muted)' }}>{e.phone}</td>
                      <td style={tableCellStyle}>{e.event}</td>
                      <td style={{ ...tableCellStyle, color: 'var(--c-muted)' }}>{e.type}</td>
                      <td style={{ ...tableCellStyle, fontWeight: 600, color: '#8B0000' }}>{e.reqDate}</td>
                      <td style={tableCellStyle}><Badge label={e.status} /></td>
                      <td style={tableCellStyle}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <ActionLink label="View" />
                          <ActionLink label="WA" green />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INVOICES */}
        {tab === 'invoices' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <SectionHead title="Invoices" sub="Create and manage client invoices." inline />
              <button style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer' }}>
                + CREATE INVOICE
              </button>
            </div>
            <div style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 12, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--c-bg2)' }}>
                    {['Invoice #', 'Client', 'Project', 'Amount', 'Status', 'Due Date', 'Actions'].map(h => (
                      <th key={h} style={tableHeadStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {INVOICES.map(inv => (
                    <tr key={inv.id}>
                      <td style={{ ...tableCellStyle, fontWeight: 600, color: '#8B0000', fontSize: 12 }}>{inv.id}</td>
                      <td style={tableCellStyle}>{inv.client}</td>
                      <td style={{ ...tableCellStyle, color: 'var(--c-muted)' }}>{inv.project}</td>
                      <td style={{ ...tableCellStyle, fontWeight: 700 }}>{inv.amount}</td>
                      <td style={tableCellStyle}><Badge label={inv.status} /></td>
                      <td style={{ ...tableCellStyle, color: 'var(--c-muted)' }}>{inv.due}</td>
                      <td style={tableCellStyle}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <ActionLink label="View" />
                          <ActionLink label="Edit" />
                          <ActionLink label="Send" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PORTFOLIO */}
        {tab === 'portfolio' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <SectionHead title="Portfolio" sub="Manage your published works." inline />
              <button style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer' }}>
                + ADD NEW WORK
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {portfolioItems.map(item => (
                <div key={item.id} style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', background: '#111', height: 160 }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: item.visible ? 1 : 0.4 }} />
                    <div style={{ position: 'absolute', top: 10, right: 10 }}>
                      <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 100, fontWeight: 700, background: item.visible ? 'rgba(0,150,80,0.9)' : 'rgba(0,0,0,0.7)', color: '#fff' }}>
                        {item.visible ? 'Published' : 'Hidden'}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 700, color: 'var(--c-text)' }}>{item.title}</p>
                    <p style={{ margin: '0 0 12px', fontSize: 11, color: 'var(--c-muted)' }}>{item.category} · {item.date}</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <ActionLink label="Edit" />
                      <ActionLink label={item.visible ? 'Hide' : 'Publish'} onClick={() => setPortfolioItems(prev => prev.map(p => p.id === item.id ? { ...p, visible: !p.visible } : p))} />
                      <ActionLink label="Delete" danger />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {tab === 'settings' && (
          <div style={{ maxWidth: 600 }}>
            <SectionHead title="Settings" sub="Configure your platform settings." />

            {/* WhatsApp */}
            <SettingsCard title="WhatsApp Settings">
              <p style={{ fontSize: 13, color: 'var(--c-muted)', marginBottom: 16, lineHeight: 1.6 }}>
                Configure your WhatsApp Business number. All client enquiries will be directed to this number.
              </p>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)', display: 'block', marginBottom: 8 }}>
                WhatsApp Business Number
              </label>
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  value={wNumber}
                  onChange={e => setWNumber(e.target.value)}
                  placeholder="+91 XXXXXXXXXX"
                  style={{ flex: 1, background: 'var(--c-bg2)', border: '1px solid var(--c-border)', borderRadius: 8, padding: '12px 16px', fontSize: 14, color: 'var(--c-text)', fontFamily: 'Inter, sans-serif', outline: 'none' }}
                />
                <button
                  onClick={() => setWhatsapp(wNumber)}
                  style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  SAVE
                </button>
              </div>
              {whatsapp && (
                <p style={{ fontSize: 12, color: 'var(--c-muted)', marginTop: 10 }}>
                  Active number: <strong style={{ color: 'var(--c-brand)' }}>{whatsapp}</strong>
                </p>
              )}
            </SettingsCard>

            {/* Theme */}
            <SettingsCard title="Theme Settings">
              <p style={{ fontSize: 13, color: 'var(--c-muted)', marginBottom: 16 }}>Set the default theme for your website.</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {(['light', 'dark', 'system'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => { setDefaultTheme(t); if (t !== 'system') { /* could toggle */ } }}
                    style={{
                      padding: '10px 20px',
                      borderRadius: 8,
                      border: `1px solid ${defaultTheme === t ? 'var(--c-brand)' : 'var(--c-border)'}`,
                      background: defaultTheme === t ? 'var(--c-brand-light)' : 'transparent',
                      color: defaultTheme === t ? '#8B0000' : 'var(--c-muted)',
                      fontSize: 13,
                      fontWeight: defaultTheme === t ? 700 : 500,
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {t === 'light' ? '☀ Light' : t === 'dark' ? '☾ Dark' : '⚙ System'}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 20 }}>
                <button
                  onClick={toggleTheme}
                  style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', cursor: 'pointer' }}
                >
                  TOGGLE CURRENT THEME
                </button>
              </div>
            </SettingsCard>
          </div>
        )}
      </main>
    </div>
  )
}

function SectionHead({ title, sub, inline }: { title: string; sub: string; inline?: boolean }) {
  return inline ? (
    <div>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 400, margin: '0 0 2px', color: 'var(--c-text)' }}>{title}</h1>
      <p style={{ color: 'var(--c-muted)', fontSize: 13, margin: 0 }}>{sub}</p>
    </div>
  ) : (
    <div style={{ marginBottom: 28 }}>
      <h1 className="font-display" style={{ fontSize: 30, fontWeight: 400, margin: '0 0 4px', color: 'var(--c-text)' }}>{title}</h1>
      <p style={{ color: 'var(--c-muted)', fontSize: 14, margin: 0 }}>{sub}</p>
    </div>
  )
}

function SettingsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 28, marginBottom: 20 }}>
      <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: 'var(--c-text)', borderBottom: '2px solid var(--c-brand)', paddingBottom: 12, display: 'inline-block' }}>{title}</h3>
      {children}
    </div>
  )
}

function ActionLink({ label, onClick, green, danger }: { label: string; onClick?: () => void; green?: boolean; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        fontSize: 12,
        fontWeight: 600,
        color: danger ? '#CC2222' : green ? '#25D366' : '#8B0000',
        cursor: 'pointer',
        padding: '4px 8px',
        borderRadius: 4,
        letterSpacing: '0.04em',
      }}
    >
      {label}
    </button>
  )
}
