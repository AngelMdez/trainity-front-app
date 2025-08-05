import { useClients } from '@/hooks/useClients'
import { Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const ITEMS_PER_PAGE = 6

export default function ClientsPage() {
  const { clients, loading } = useClients()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filteredClients = useMemo(() => {
    return clients.filter(client =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase()),
    )
  }, [clients, search])

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE)
  const paginatedClients = filteredClients.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  if (loading) return <div className='text-gray-500 text-center py-8'>Cargando clientes...</div>

  return (
    <div className='space-y-6'>
      <h1 className='text-xl font-semibold text-gray-900'>Clientes</h1>

      <Input
        type='text'
        placeholder='Buscar clientes por nombre o email'
        value={search}
        onChange={e => {
          setSearch(e.target.value)
          setPage(1)
        }}
        className='max-w-md'
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {paginatedClients.map(client => (
          <Link
            key={client.id}
            to={`/admin/clients/${client.id}`}
            className='bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-4'
          >
            <div
              className='w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg'>
              {client.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className='text-base font-medium text-gray-900'>{client.name}</h2>
              <p className='text-sm text-gray-500'>{client.email}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className='mt-6 flex justify-center gap-3'>
          <Button
            variant='outline'
            size='sm'
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </Button>
          <span className='text-sm text-gray-600 px-2'>{page} / {totalPages}</span>
          <Button
            variant='outline'
            size='sm'
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  )
}
