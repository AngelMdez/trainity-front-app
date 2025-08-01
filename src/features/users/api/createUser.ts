import { CreateUserInput, User } from '../domain/types';

export async function createUser(data: CreateUserInput): Promise<User> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear usuario');
  return res.json();
}
