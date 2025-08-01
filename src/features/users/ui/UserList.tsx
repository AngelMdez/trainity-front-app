import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/fetchUsers';

export function UserList() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <ul className="mt-4">
      {users?.map(user => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}
