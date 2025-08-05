import { useParams, Link } from 'react-router-dom'
import { useClientById } from '@/hooks/useClientById'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { client, loading } = useClientById(id!)

  if (loading) return <div className='text-gray-500 text-center py-8'>Cargando cliente...</div>
  if (!client) return <div className='text-red-500 text-center py-8'>Cliente no encontrado.</div>

  return (
    <div className='space-y-6 max-w-4xl mx-auto'>
      {/* Botón volver */}
      <Button asChild variant='link' className='text-indigo-600 px-0'>
        <Link to='/admin/clients'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Volver a clientes
        </Link>
      </Button>

      {/* Card */}
      <div className='bg-white p-6 rounded-xl shadow-sm space-y-6'>
        {/* Header */}
        <div className='flex items-center gap-6'>
          <div
            className='w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold'>
            {client.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className='text-2xl font-semibold text-gray-900'>{client.name}</h1>
            <p className='text-sm text-gray-500'>{client.email}</p>
          </div>
        </div>

        {/* Datos */}
        <div className='text-sm text-gray-700 space-y-2'>
          <p><span className='font-medium'>Registrado el:</span> {new Date(client.createdAt).toLocaleDateString()}</p>
          <p><span className='font-medium'>Estado:</span> {client.active ? 'Activo' : 'Inactivo'}</p>
        </div>
      </div>
    </div>
  )
}
