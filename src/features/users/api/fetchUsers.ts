import { User } from '../domain/types';

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
  if (!res.ok) throw new Error('Error al cargar usuarios');
  return res.json();
}
