import { useState } from 'react'
import ClientNav from '../components/ClientNav'
import { useApp, type AvailStatus } from '../App'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function toKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function formatDate(key: string) {
  const [y, m, d] = key.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

const STATUS_LABELS: Record<AvailStatus, string> = {
  available: 'Available',
  limited: 'Limited Slots',
  booked: 'Fully Booked',
  unavailable: 'Unavailable',
}

const STATUS_DOTS: Record<AvailStatus, string> = {
  available: '#8B0000',
  limited: '#c44',
  booked: '#555',
  unavailable: '#999',
}

function getCellStyle(status: AvailStatus | undefined, isSelected: boolean, isToday: boolean, isPast: boolean) {
  if (isSelected) return { background: '#8B0000', color: '#fff', border: '2px solid #8B0000' }
  if (isPast) return { background: 'transparent', color: '#444', border: '1px solid transparent', cursor: 'default' }
  if (!status || status === 'available') {
    return { background: 'transparent', color: 'var(--c-text)', border: isToday ? '1.5px solid var(--c-brand)' : '1px solid var(--c-border)' }
  }
  if (status === 'limited') return { background: 'var(--c-brand-light)', color: 'var(--c-text)', border: '1px solid rgba(139,0,0,0.2)' }
  if (status === 'booked') return { background: 'var(--c-bg2)', color: 'var(--c-muted)', border: '1px solid var(--c-border)', cursor: 'default' }
  if (status === 'unavailable') return { background: 'var(--c-bg2)', color: '#888', border: '1px dashed var(--c-border)', cursor: 'default' }
  return {}
}

export default function AvailabilityPage() {
  const { avail } = useApp()
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells: { day: number; current: boolean; key: string }[] = []
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i
    const k = toKey(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1, d)
    cells.push({ day: d, current: false, key: k })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true, key: toKey(year, month, d) })
  }
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    const k = toKey(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, d)
    cells.push({ day: d, current: false, key: k })
  }

  const selectedStatus: AvailStatus = selectedKey ? (avail[selectedKey] || 'available') : 'available'
  const todayKey = toKey(today.getFullYear(), today.getMonth(), today.getDate())

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)' }}>
      <ClientNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.25em', color: 'var(--c-brand)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 16 }}>
            Schedule
          </p>
          <h1
            className="font-display"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 400, margin: '0 0 12px', color: 'var(--c-text)', letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            CHECK MY AVAILABILITY
          </h1>
          <p style={{ color: 'var(--c-muted)', fontSize: 15 }}>
            Choose a date to see whether I can take your project.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }}>
          {/* Calendar */}
          <div
            style={{
              background: 'var(--c-surface)',
              border: '1px solid var(--c-border)',
              borderRadius: 16,
              padding: '28px 28px 24px',
            }}
          >
            {/* Month nav */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <button
                onClick={() => setViewDate(new Date(year, month - 1, 1))}
                style={{ background: 'var(--c-bg2)', border: '1px solid var(--c-border)', borderRadius: 8, width: 36, height: 36, cursor: 'pointer', color: 'var(--c-text)', fontSize: 16 }}
              >
                ‹
              </button>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: 'var(--c-text)' }}>
                {MONTHS[month]} {year}
              </h2>
              <button
                onClick={() => setViewDate(new Date(year, month + 1, 1))}
                style={{ background: 'var(--c-bg2)', border: '1px solid var(--c-border)', borderRadius: 8, width: 36, height: 36, cursor: 'pointer', color: 'var(--c-text)', fontSize: 16 }}
              >
                ›
              </button>
            </div>

            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
              {DAYS.map(d => (
                <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--c-muted)', letterSpacing: '0.05em', padding: '4px 0' }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Date grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {cells.map((cell, i) => {
                const status = avail[cell.key]
                const isSelected = cell.key === selectedKey
                const isToday = cell.key === todayKey
                const isPast = cell.current && new Date(year, month, cell.day) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
                const cellStyle = getCellStyle(status, isSelected, isToday, isPast)
                const canClick = cell.current && !isPast && status !== 'booked' && status !== 'unavailable'

                return (
                  <button
                    key={i}
                    onClick={() => canClick && setSelectedKey(cell.key)}
                    style={{
                      height: 44,
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: isToday ? 700 : 400,
                      cursor: canClick ? 'pointer' : 'default',
                      opacity: cell.current ? 1 : 0.25,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                      transition: 'all 0.15s',
                      ...cellStyle,
                    }}
                    onMouseEnter={e => {
                      if (canClick && !isSelected) {
                        (e.currentTarget as HTMLButtonElement).style.background = 'var(--c-brand-light)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (canClick && !isSelected) {
                        (e.currentTarget as HTMLButtonElement).style.background = cellStyle.background as string || 'transparent'
                      }
                    }}
                  >
                    {cell.day}
                    {status && cell.current && (
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: isSelected ? '#fff' : STATUS_DOTS[status] }} />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--c-border)', display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {(Object.entries(STATUS_LABELS) as [AvailStatus, string][]).map(([s, label]) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_DOTS[s] }} />
                  <span style={{ fontSize: 11, color: 'var(--c-muted)', fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div
            style={{
              background: 'var(--c-surface)',
              border: '1px solid var(--c-border)',
              borderRadius: 16,
              padding: 28,
              position: 'sticky',
              top: 88,
            }}
          >
            {selectedKey ? (
              <>
                <p style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--c-brand)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>
                  Selected Date
                </p>
                <h3 className="font-display" style={{ fontSize: 22, fontWeight: 400, color: 'var(--c-text)', margin: '0 0 24px', lineHeight: 1.2 }}>
                  {formatDate(selectedKey)}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Row label="Status" value={STATUS_LABELS[selectedStatus]} highlight={selectedStatus === 'available' || selectedStatus === 'limited'} />
                  {selectedStatus !== 'booked' && selectedStatus !== 'unavailable' && (
                    <>
                      <Row label="Available Slots" value={selectedStatus === 'limited' ? '1–2' : '3+'} />
                      <Row label="Expected Start" value={formatDate(selectedKey)} />
                      <Row label="Typical Delivery" value="2–3 business days" />
                    </>
                  )}
                </div>

                {(selectedStatus === 'available' || selectedStatus === 'limited') && (
                  <button
                    style={{
                      marginTop: 28,
                      width: '100%',
                      background: '#8B0000',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '14px 0',
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#5C0000' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#8B0000' }}
                  >
                    BOOK THIS DATE
                  </button>
                )}

                {(selectedStatus === 'booked' || selectedStatus === 'unavailable') && (
                  <div style={{ marginTop: 28, padding: '14px 16px', background: 'var(--c-bg2)', borderRadius: 8, textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--c-muted)' }}>
                      {selectedStatus === 'booked' ? 'This date is fully booked. Please choose another.' : 'This date is unavailable.'}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>📅</div>
                <p style={{ color: 'var(--c-muted)', fontSize: 14, lineHeight: 1.6 }}>
                  Select a date on the calendar to check availability.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--c-border)' }}>
      <span style={{ fontSize: 12, color: 'var(--c-muted)', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: highlight ? 'var(--c-brand)' : 'var(--c-text)' }}>{value}</span>
    </div>
  )
}
