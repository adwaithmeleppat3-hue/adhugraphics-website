import ClientNav from '../components/ClientNav'
import BrandLogo from '../components/BrandLogo'

const INVOICE = {
  number: 'ADH-2026-007',
  date: '09 August 2026',
  dueDate: '20 August 2026',
  client: 'Ramesh Nair',
  committee: 'Thrissur Pooram Central Committee',
  phone: '+91 98765 43210',
  status: 'PARTIALLY PAID' as 'PAID' | 'PENDING' | 'PARTIALLY PAID',
  items: [
    { description: 'Thrissur Pooram Main Poster (A2)', qty: 3, unit: 2500, total: 7500 },
    { description: 'Social Media Creatives (Instagram)', qty: 8, unit: 500, total: 4000 },
    { description: 'Event Announcement Banner (10x4ft)', qty: 2, unit: 1800, total: 3600 },
  ],
  subtotal: 15100,
  advance: 5000,
  balance: 10100,
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  PAID: { bg: 'rgba(0,180,80,0.1)', color: '#00A050' },
  PENDING: { bg: 'rgba(220,50,50,0.1)', color: '#CC2222' },
  'PARTIALLY PAID': { bg: 'rgba(139,0,0,0.1)', color: '#8B0000' },
}

export default function InvoicePage() {
  const statusStyle = STATUS_COLORS[INVOICE.status]

  const handlePrint = () => window.print()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)' }}>
      <ClientNav />

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Page heading */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.25em', color: 'var(--c-brand)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
              Client Portal
            </p>
            <h1 className="font-display" style={{ fontSize: 40, fontWeight: 400, margin: 0, color: 'var(--c-text)', letterSpacing: '-0.03em' }}>
              MY INVOICE
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <ActionBtn onClick={handlePrint}>PRINT</ActionBtn>
            <ActionBtn onClick={() => {}}>SHARE</ActionBtn>
            <ActionBtn primary onClick={() => {}}>MAKE PAYMENT</ActionBtn>
          </div>
        </div>

        {/* Invoice card */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E5E5',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
          className="invoice-card"
        >
          {/* Header */}
          <div style={{ background: '#000000', padding: '36px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <BrandLogo width={190} adaptive={false} />
              <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Creative Design Studio
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: '#8B0000', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 6px' }}>
                INVOICE
              </p>
              <p style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>{INVOICE.number}</p>
            </div>
          </div>

          {/* Red accent line */}
          <div style={{ height: 3, background: '#8B0000' }} />

          {/* Meta */}
          <div style={{ padding: '32px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, borderBottom: '1px solid #E5E5E5' }}>
            <MetaBlock label="Invoice Date" value={INVOICE.date} />
            <MetaBlock label="Due Date" value={INVOICE.dueDate} highlight />
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666666', fontWeight: 700, marginBottom: 6 }}>
                Payment Status
              </p>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: 100,
                background: statusStyle.bg,
                color: statusStyle.color,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}>
                {INVOICE.status}
              </span>
            </div>
          </div>

          {/* Client + billing */}
          <div style={{ padding: '28px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, borderBottom: '1px solid #E5E5E5' }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B0000', fontWeight: 700, marginBottom: 12 }}>
                Billed To
              </p>
              <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#000000', fontSize: 15 }}>{INVOICE.client}</p>
              <p style={{ margin: '0 0 4px', color: '#666666', fontSize: 13 }}>{INVOICE.committee}</p>
              <p style={{ margin: 0, color: '#666666', fontSize: 13 }}>{INVOICE.phone}</p>
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B0000', fontWeight: 700, marginBottom: 12 }}>
                From
              </p>
              <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#000000', fontSize: 15 }}>adhugraphics</p>
              <p style={{ margin: '0 0 4px', color: '#666666', fontSize: 13 }}>Creative Design Studio</p>
              <p style={{ margin: 0, color: '#666666', fontSize: 13 }}>Kerala, India</p>
            </div>
          </div>

          {/* Line items */}
          <div style={{ padding: '28px 40px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #8B0000' }}>
                  {['Description', 'Qty', 'Unit Price', 'Total'].map(h => (
                    <th key={h} style={{ padding: '0 0 10px', textAlign: h === 'Description' ? 'left' : 'right', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666666', fontWeight: 700 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INVOICE.items.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #E5E5E5' }}>
                    <td style={{ padding: '14px 0', fontSize: 14, color: '#000000' }}>{item.description}</td>
                    <td style={{ padding: '14px 0', textAlign: 'right', fontSize: 14, color: '#666666' }}>{item.qty}</td>
                    <td style={{ padding: '14px 0', textAlign: 'right', fontSize: 14, color: '#666666' }}>₹{item.unit.toLocaleString()}</td>
                    <td style={{ padding: '14px 0', textAlign: 'right', fontSize: 14, fontWeight: 600, color: '#000000' }}>₹{item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: 280 }}>
                <TotalRow label="Subtotal" value={`₹${INVOICE.subtotal.toLocaleString()}`} />
                <TotalRow label="Advance Paid" value={`−₹${INVOICE.advance.toLocaleString()}`} muted />
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '2px solid #8B0000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#000000' }}>Balance Due</span>
                  <span style={{ fontSize: 22, fontWeight: 700, color: '#8B0000' }}>₹{INVOICE.balance.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ background: '#F5F5F5', padding: '20px 40px', borderTop: '1px solid #E5E5E5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: 11, color: '#999999' }}>Thank you for choosing adhugraphics.</p>
            <p style={{ margin: 0, fontSize: 11, color: '#999999' }}>adhugraphics.design</p>
          </div>
        </div>

        {/* Download button */}
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handlePrint}
            style={{
              background: '#8B0000',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              padding: '14px 32px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#5C0000' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#8B0000' }}
          >
            DOWNLOAD INVOICE
          </button>
        </div>
      </div>
    </div>
  )
}

function MetaBlock({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666666', fontWeight: 700, marginBottom: 6 }}>{label}</p>
      <p style={{ margin: 0, fontWeight: 600, color: highlight ? '#8B0000' : '#000000', fontSize: 14 }}>{value}</p>
    </div>
  )
}

function TotalRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #E5E5E5' }}>
      <span style={{ fontSize: 13, color: '#666666' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: muted ? '#999999' : '#000000' }}>{value}</span>
    </div>
  )
}

function ActionBtn({ children, onClick, primary }: { children: React.ReactNode; onClick: () => void; primary?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: primary ? '#8B0000' : 'var(--c-surface)',
        color: primary ? '#FFFFFF' : 'var(--c-text)',
        border: `1px solid ${primary ? '#8B0000' : 'var(--c-border)'}`,
        borderRadius: 7,
        padding: '10px 18px',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.06em',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {children}
    </button>
  )
}
