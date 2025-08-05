import { ReactNode } from 'react'

interface AuthLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#f1f3f4] px-4'>
      <div className='bg-white p-6 rounded-xl shadow-sm w-full max-w-md space-y-6'>
        <div className='space-y-1 text-center'>
          <h1 className='text-xl font-semibold text-gray-900'>{title}</h1>
          {subtitle && <p className='text-sm text-gray-500'>{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}