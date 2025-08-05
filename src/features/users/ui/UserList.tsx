import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../api/fetchUsers'

export function UserList() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isLoading) {
    return <div className='text-gray-500 text-center py-8'>Cargando usuarios...</div>
  }

  if (error) {
    return <div className='text-red-500 text-center py-8'>Error: {(error as Error).message}</div>
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-lg font-semibold text-gray-900'>Usuarios registrados</h2>

      <ul className='bg-white rounded-xl shadow-sm divide-y divide-gray-100'>
        {users?.map(user => (
          <li key={user.id} className='px-6 py-4 flex justify-between items-center'>
            <span className='text-gray-900'>{user.name}</span>
            <span className='text-sm text-gray-500'>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
