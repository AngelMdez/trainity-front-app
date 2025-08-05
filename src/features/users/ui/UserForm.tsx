import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../api/createUser'
import { CreateUserInput } from '../domain/types'
import { isValidUser } from '../domain/validators'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export function UserForm() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState<CreateUserInput>({ email: '', name: '' })

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setForm({ email: '', name: '' })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidUser(form)) return alert('Email inválido')
    mutation.mutate(form)
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-sm space-y-6 max-w-md mx-auto'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Correo electrónico</Label>
        <Input
          id='email'
          type='email'
          value={form.email}
          placeholder='correo@ejemplo.com'
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='name'>Nombre</Label>
        <Input
          id='name'
          type='text'
          value={form.name}
          placeholder='Nombre completo'
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      <div className='pt-2 text-right'>
        <Button type='submit'>Crear usuario</Button>
      </div>
    </form>
  )
}
