// src/features/home/ui/components/DashboardCard.tsx
import { ReactNode } from 'react'

interface DashboardCardProps {
  title: string
  icon?: ReactNode
  accentColor?: string
  children: ReactNode
}

export function DashboardCard({ title, icon, accentColor = 'text-indigo-600', children }: DashboardCardProps) {
  return (
    <div className='bg-white rounded-xl shadow-sm p-5 space-y-4 border border-gray-200'>
      <div className='flex items-center gap-3'>
        {icon && <div className={`w-6 h-6 ${accentColor}`}>{icon}</div>}
        <h2 className='text-base font-semibold text-gray-900'>{title}</h2>
      </div>
      <div className='text-sm text-gray-700 space-y-1'>{children}</div>
    </div>
  )
}
