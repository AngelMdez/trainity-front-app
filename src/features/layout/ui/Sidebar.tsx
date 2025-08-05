// src/features/layout/ui/Sidebar.tsx
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ListChecks } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className='h-full w-full flex flex-col'>
      <div className='h-16 flex items-center gap-3 px-6'>
        <span className='text-lg font-semibold text-gray-800 tracking-tight'>Trainity</span>
      </div>

      <nav className='flex-1 px-4 py-4 space-y-2 text-sm text-gray-700'>
        <NavLink
          to='/admin/nutrition-plans'
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-gray-200 ${
              isActive ? 'bg-gray-300 font-medium text-gray-900' : ''
            }`
          }
        >
          <ListChecks className='w-4 h-4' />
          Planes de nutrición
        </NavLink>

        <NavLink
          to='/'
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-gray-200 ${
              isActive ? 'bg-gray-300 font-medium text-gray-900' : ''
            }`
          }
        >
          <LayoutDashboard className='w-4 h-4' />
          Dashboard
        </NavLink>
      </nav>
    </aside>
  )
}
