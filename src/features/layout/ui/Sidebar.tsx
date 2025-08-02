import { NavLink } from 'react-router-dom'
import { Dumbbell, BarChart3 } from 'lucide-react'

export const Sidebar = () => {
  return (
    <aside className='w-64 bg-gray-950 h-full flex flex-col justify-between px-4 py-6 border-r border-gray-800'>
      <div>
        <div className='text-2xl font-bold flex items-center gap-2 mb-8'>
          <Dumbbell className='w-6 h-6' /> Workout Log
        </div>
        <nav className='flex flex-col gap-2'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm ${isActive ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`
            }
          >
            <Dumbbell className='w-4 h-4' /> Home
          </NavLink>
          <NavLink
            to='/charts'
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm ${isActive ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`
            }
          >
            <BarChart3 className='w-4 h-4' /> Charts
          </NavLink>
        </nav>
      </div>
      <div className='flex flex-col gap-4 text-sm text-gray-400'>
        <div>
          <span className='block mb-1'>Weight Unit</span>
          <div className='flex gap-2'>
            <button className='px-3 py-1 rounded bg-gray-800'>Imperial</button>
            <button className='px-3 py-1 rounded bg-gray-700 text-white'>Metric</button>
          </div>
        </div>
        <p className='text-center text-xs'>Made with ❤️ by AngelMdez</p>
      </div>
    </aside>
  )
}
