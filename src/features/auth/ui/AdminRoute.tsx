import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/context/auth-context'

interface AdminRouteProps {
  children: ReactNode
  redirectPath?: string
  requiredRole?: string | string[]
  fallback?: ReactNode
}

export default function AdminRoute({
                                     children,
                                     redirectPath = '/',
                                     requiredRole = 'admin',
                                     fallback = null,
                                   }: AdminRouteProps) {
  const { user, role, loading } = useAuth()

  if (loading) return <>{fallback}</>

  if (!user) return <Navigate to='/login' replace />

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]

  if (!role || !roles.includes(role)) return <Navigate to={redirectPath} replace />

  return <>{children}</>
}
