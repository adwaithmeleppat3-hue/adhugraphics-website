import { useAuth } from './AuthProvider'
import AdminLoginPage from '../pages/AdminLoginPage'
import AdminPage from '../pages/AdminPage'

export default function ProtectedAdmin() {
  const { session, loading } = useAuth()

  if (loading) return null
  return session ? <AdminPage /> : <AdminLoginPage />
}
