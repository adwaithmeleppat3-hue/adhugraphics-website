import { useState } from 'react'
import ClientNav from '../components/ClientNav'
import { useApp } from '../App'

const DESIGN_TYPES = [
  'pooram poster',
  'pooram flex',
  'Social Media Design',
  'comming soon poster',
  'logo',
  'media partner poster',
  'Other',
]

interface FormData {
  name: string
  committee: string
  phone: string
  eventName: string
  designType: string
  requiredDate: string
  deliveryDate: string
  quantity: number
  requirements: string
}

const EMPTY: FormData = {
  name: '',
  committee: '',
  phone: '',
  eventName: '',
  designType: '',
  requiredDate: '',
  deliveryDate: '',
  quantity: 1,
  requirements: '',
}

function isValid(f: FormData) {
  return f.name && f.committee && f.phone && f.eventName && f.designType && f.requiredDate && f.deliveryDate && f.requirements
}

function buildMessage(f: FormData) {
  return `Hello adhugraphics 👋

I would like to enquire about a design project.

*CLIENT DETAILS*
Name: ${f.name}
Committee: ${f.committee}
Phone: ${f.phone}

*PROJECT DETAILS*
Event / Pooram: ${f.eventName}
Design Type: ${f.designType}
Number of Designs: ${f.quantity}
Required Date: ${f.requiredDate}
Delivery Date: ${f.deliveryDate}

*DESIGN REQUIREMENTS*
${f.requirements}

Please check the availability and let me know the next steps.

Thank you.
— ${f.name}`
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', display: 'block', marginBottom: 8 }}>
      {children}
    </label>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--c-bg2)',
  border: '1px solid var(--c-border)',
  borderRadius: 8,
  padding: '12px 16px',
  fontSize: 14,
  color: 'var(--c-text)',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
}

export default function EnquiryPage() {
  const { whatsapp } = useApp()
  const [form, setForm] = useState<FormData>(EMPTY)
  const [step, setStep] = useState<'form' | 'confirm'>('form')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const getFocusStyle = (field: string): React.CSSProperties =>
    focusedField === field ? { ...inputStyle, borderColor: 'var(--c-brand)', boxShadow: '0 0 0 3px rgba(139,0,0,0.1)' } : inputStyle

  const handleSubmit = () => {
    if (isValid(form)) setStep('confirm')
  }

  const handleWhatsApp = () => {
    const msg = buildMessage(form)
    const encoded = encodeURIComponent(msg)

    // AdhuGraphics WhatsApp number (India country code +91).
    // Keep this as digits only for the wa.me URL.
    const whatsappNumber = '919072265977'

    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (step === 'confirm') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--c-bg)' }}>
        <ClientNav />
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px' }}>
          <div
            style={{
              background: 'var(--c-surface)',
              border: '1px solid var(--c-border)',
              borderRadius: 16,
              padding: '48px',
              textAlign: 'center',
            }}
          >
            <div style={{ width: 56, height: 56, background: 'rgba(139,0,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 22 }}>
              ✓
            </div>
            <h1 className="font-display" style={{ fontSize: 34, fontWeight: 400, margin: '0 0 12px', color: 'var(--c-text)' }}>
              ENQUIRY READY
            </h1>
            <p style={{ color: 'var(--c-muted)', fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
              Your enquiry has been prepared. Continue to WhatsApp to send your project details to adhugraphics.
            </p>

            {/* Summary card */}
            <div
              style={{
                background: 'var(--c-bg2)',
                border: '1px solid var(--c-border)',
                borderRadius: 10,
                padding: '20px 24px',
                textAlign: 'left',
                marginBottom: 32,
              }}
            >
              {[
                ['Client', form.name],
                ['Committee', form.committee],
                ['Project', form.eventName],
                ['Design Type', form.designType],
                ['Required Date', form.requiredDate],
                ['Delivery Date', form.deliveryDate],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--c-border)' }}>
                  <span style={{ fontSize: 12, color: 'var(--c-muted)', fontWeight: 600 }}>{label}</span>
                  <span style={{ fontSize: 13, color: 'var(--c-text)', fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                onClick={handleWhatsApp}
                style={{
                  background: '#25D366',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '16px 24px',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1ebe5d' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#25D366' }}
              >
                <span style={{ fontSize: 18 }}>💬</span>
                CONTINUE TO WHATSAPP →
              </button>
              <button
                onClick={() => setStep('form')}
                style={{
                  background: 'none',
                  border: '1px solid var(--c-border)',
                  borderRadius: 8,
                  padding: '13px 24px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--c-muted)',
                  cursor: 'pointer',
                  letterSpacing: '0.06em',
                }}
              >
                EDIT ENQUIRY
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)' }}>
      <ClientNav />

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px 80px' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.25em', color: 'var(--c-brand)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 16 }}>
            Get Started
          </p>
          <h1
            className="font-display"
            style={{ fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 400, margin: '0 0 12px', color: 'var(--c-text)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            START YOUR PROJECT
          </h1>
          <p style={{ color: 'var(--c-muted)', fontSize: 15, lineHeight: 1.6 }}>
            Tell me about your Pooram or event and let us create something memorable.
          </p>
        </div>

        <div
          style={{
            background: 'var(--c-surface)',
            border: '1px solid var(--c-border)',
            borderRadius: 16,
            padding: '40px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Full Name */}
            <div>
              <FieldLabel>Full Name *</FieldLabel>
              <input
                style={getFocusStyle('name')}
                placeholder="Enter your name"
                value={form.name}
                onChange={set('name')}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Committee Name */}
            <div>
              <FieldLabel>Committee Name *</FieldLabel>
              <input
                style={getFocusStyle('committee')}
                placeholder="Enter committee name"
                value={form.committee}
                onChange={set('committee')}
                onFocus={() => setFocusedField('committee')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Phone */}
            <div>
              <FieldLabel>Phone Number *</FieldLabel>
              <input
                style={getFocusStyle('phone')}
                placeholder="Enter phone number"
                value={form.phone}
                onChange={set('phone')}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                type="tel"
              />
            </div>

            {/* Event Name */}
            <div>
              <FieldLabel>Event / Pooram Name *</FieldLabel>
              <input
                style={getFocusStyle('eventName')}
                placeholder="Enter event or Pooram name"
                value={form.eventName}
                onChange={set('eventName')}
                onFocus={() => setFocusedField('eventName')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Design Type */}
            <div>
              <FieldLabel>Design Type *</FieldLabel>
              <select
                style={{ ...getFocusStyle('designType'), appearance: 'none', cursor: 'pointer' }}
                value={form.designType}
                onChange={set('designType')}
                onFocus={() => setFocusedField('designType')}
                onBlur={() => setFocusedField(null)}
              >
                <option value="">Select design type</option>
                {DESIGN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <FieldLabel>Number of Designs *</FieldLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  onClick={() => setForm(p => ({ ...p, quantity: Math.max(1, p.quantity - 1) }))}
                  style={{ width: 40, height: 44, background: 'var(--c-bg2)', border: '1px solid var(--c-border)', borderRadius: 8, cursor: 'pointer', color: 'var(--c-text)', fontSize: 18 }}
                >
                  −
                </button>
                <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--c-text)', minWidth: 32, textAlign: 'center' }}>
                  {form.quantity}
                </span>
                <button
                  onClick={() => setForm(p => ({ ...p, quantity: p.quantity + 1 }))}
                  style={{ width: 40, height: 44, background: 'var(--c-bg2)', border: '1px solid var(--c-border)', borderRadius: 8, cursor: 'pointer', color: 'var(--c-text)', fontSize: 18 }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Required Date */}
            <div>
              <FieldLabel>Required Date *</FieldLabel>
              <input
                type="date"
                style={getFocusStyle('requiredDate')}
                value={form.requiredDate}
                onChange={set('requiredDate')}
                onFocus={() => setFocusedField('requiredDate')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Delivery Date */}
            <div>
              <FieldLabel>Delivery Date *</FieldLabel>
              <input
                type="date"
                style={getFocusStyle('deliveryDate')}
                value={form.deliveryDate}
                onChange={set('deliveryDate')}
                onFocus={() => setFocusedField('deliveryDate')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Requirements */}
            <div style={{ gridColumn: '1 / -1' }}>
              <FieldLabel>Design Requirements *</FieldLabel>
              <textarea
                style={{ ...getFocusStyle('requirements'), minHeight: 120, resize: 'vertical' }}
                placeholder="Tell me about your design requirements..."
                value={form.requirements}
                onChange={set('requirements')}
                onFocus={() => setFocusedField('requirements')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Upload area */}
            <div style={{ gridColumn: '1 / -1' }}>
              <FieldLabel>Reference Files (Optional)</FieldLabel>
              <div
                style={{
                  border: '2px dashed var(--c-border)',
                  borderRadius: 8,
                  padding: '28px',
                  textAlign: 'center',
                  color: 'var(--c-muted)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--c-brand)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--c-border)' }}
              >
                <p style={{ margin: 0, fontSize: 13 }}>📎 Drag &amp; drop files here or <span style={{ color: 'var(--c-brand)', fontWeight: 600 }}>Browse</span></p>
                <p style={{ margin: '6px 0 0', fontSize: 11, opacity: 0.6 }}>PNG, JPG, PDF up to 20MB</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              onClick={handleSubmit}
              disabled={!isValid(form)}
              style={{
                background: isValid(form) ? '#8B0000' : 'var(--c-bg2)',
                color: isValid(form) ? '#fff' : 'var(--c-muted)',
                border: 'none',
                borderRadius: 8,
                padding: '16px 32px',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.1em',
                cursor: isValid(form) ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (isValid(form)) (e.currentTarget as HTMLButtonElement).style.background = '#5C0000' }}
              onMouseLeave={e => { if (isValid(form)) (e.currentTarget as HTMLButtonElement).style.background = '#8B0000' }}
            >
              <span style={{ fontSize: 16 }}>💬</span>
              SUBMIT ENQUIRY &amp; CONTACT ON WHATSAPP →
            </button>
            {!isValid(form) && (
              <p style={{ fontSize: 12, color: 'var(--c-muted)', textAlign: 'center', margin: 0 }}>
                Please fill in all required fields to continue.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
