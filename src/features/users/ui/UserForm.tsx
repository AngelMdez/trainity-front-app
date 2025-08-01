import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../api/createUser';
import { CreateUserInput } from '../domain/types';
import { isValidUser } from '../domain/validators';

export function UserForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<CreateUserInput>({ email: '', name: '' });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setForm({ email: '', name: '' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUser(form)) return alert('Email inválido');
    mutation.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
      <input
        className="border p-2"
        type="email"
        placeholder="Correo"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="border p-2"
        type="text"
        placeholder="Nombre"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
        Crear usuario
      </button>
    </form>
  );
}
