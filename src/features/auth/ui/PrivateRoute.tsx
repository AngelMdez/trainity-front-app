import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../domain/auth-context'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) return null // o spinner si prefieres

  return user ? <Outlet /> : <Navigate to='/login' replace />
}
