import { useState, useEffect, createContext, useContext } from 'react'
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
      {page === 'admin' && <AdminPage />}
    </Ctx.Provider>
  )
}
