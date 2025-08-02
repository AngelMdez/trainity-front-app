import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/features/layout/ui/Sidebar'
import { UserDropdown } from './components/UserDropdown'

export const Layout = () => {
  return (
    <div className='flex h-screen w-screen bg-black text-white overflow-hidden'>
      <Sidebar />
      <main className='flex-1 overflow-y-auto px-6 py-4'>
        {/* Cabecera con usuario */}
        <div className='flex justify-end mb-6'>
          <UserDropdown />
        </div>

        {/* Página actual */}
        <Outlet />
      </main>
    </div>
  )
}
