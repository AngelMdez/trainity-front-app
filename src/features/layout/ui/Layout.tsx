// src/features/layout/ui/Layout.tsx
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Sidebar } from '@/features/layout/ui/Sidebar'

export default function Layout() {
  return (
    <div className='flex h-screen w-screen bg-[#f1f3f4] text-gray-900'>
      {/* Sidebar */}
      <div className='hidden md:flex w-60'>
        <Sidebar />
      </div>

      {/* Main */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Topbar */}
        <header className='h-16 bg-[#f1f3f4] flex items-center justify-between px-6'>
          <div className='flex items-center gap-3'>
            <button className='md:hidden'>
              <Menu className='text-gray-600 w-5 h-5' />
            </button>
            <input
              type='search'
              placeholder='Buscar...'
              className='w-full max-w-md bg-white text-sm text-gray-700 rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 shadow-sm'
            />
          </div>

          <div className='flex items-center gap-3'>
            <span className='text-sm text-gray-600'>admin@trainity.app</span>
            <img
              src='https://www.gravatar.com/avatar/?d=mp'
              alt='avatar'
              className='w-8 h-8 rounded-full border'
            />
          </div>
        </header>

        {/* Main content */}
        <main className='flex-1 overflow-y-auto px-6 py-8 flex justify-center'>
          <div className='w-full max-w-6xl bg-white rounded-xl shadow-sm p-6'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
