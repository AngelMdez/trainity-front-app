import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/features/layout/ui/Sidebar'

export const Layout = () => {
  return (
    <div className="flex h-screen w-screen bg-black text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
