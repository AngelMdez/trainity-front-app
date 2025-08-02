import { useClients } from '@/hooks/useClients'
import { Link } from 'react-router-dom'

export default function ClientsPage() {
  const { clients, loading } = useClients()

  return (
    <div className='p-8 text-white space-y-6'>
      <h1 className='text-2xl font-bold'>Clientes</h1>

      {loading ? (
        <p className='text-zinc-400'>Cargando clientes...</p>
      ) : clients.length === 0 ? (
        <p className='text-zinc-500'>No hay clientes registrados.</p>
      ) : (
        <table className='w-full border-collapse text-sm'>
          <thead className='text-zinc-400 text-left border-b border-zinc-700'>
          <tr>
            <th className='py-2'>Nombre</th>
            <th>Email</th>
            <th>Último acceso</th>
            <th>Plan</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          {clients.map((client) => (
            <tr key={client.id} className='border-b border-zinc-800 hover:bg-zinc-900'>
              <td className='py-2'>{client.name || '—'}</td>
              <td>{client.email || '—'}</td>
              <td>{client.lastLogin || '—'}</td>
              <td>{client.planAssigned || '—'}</td>
              <td>
                <Link
                  to={`/admin/clients/\${client.id}`}
                  className='text-indigo-400 hover:underline'
                >
                  Ver
                </Link>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  )
}