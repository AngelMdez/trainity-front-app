import { Menu } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'
import { useAuth } from '@/features/auth/context/auth-context'
import { useNavigate } from 'react-router-dom'

export function UserDropdown() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const initials = user?.email?.charAt(0).toUpperCase() || '?'

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className='flex items-center gap-2 text-sm text-gray-300 hover:text-white'>
        <span>{user?.email || 'User'}</span>
        <div className='w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center'>
          {initials}
        </div>
        <ChevronDown size={16} />
      </Menu.Button>

      <Menu.Items
        className='absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-zinc-900 shadow-lg ring-1 ring-zinc-700 focus:outline-none z-50'>
        <div className='py-1'>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={`${
                  active ? 'bg-zinc-700' : ''
                } block w-full px-4 py-2 text-left text-sm text-white`}
              >
                Logout
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  )
}
