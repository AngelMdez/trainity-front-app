import { useEffect, useState } from 'react';

type User = { id: number; email: string; name?: string };

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users`)
      .then(res => res.json())
      .then(setUsers)
      .catch(err => console.error('Error fetching users', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Usuarios</h1>
      <ul className="mt-4">
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
