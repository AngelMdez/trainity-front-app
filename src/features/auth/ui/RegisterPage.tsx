import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/features/auth/context/auth-context'
import AuthLayout from './AuthLayout'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { registerWithEmail, loginWithGoogle } = useAuth()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      alert('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)
    try {
      await registerWithEmail(email, password)
      navigate('/')
    } catch {
      alert('Error al registrar.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    setLoading(true)
    try {
      await loginWithGoogle()
      navigate('/')
    } catch {
      alert('Error al registrar con Google.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title='Crear cuenta'
      subtitle='Regístrate para empezar en Trainity'
    >
      <form onSubmit={handleRegister} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Correo</Label>
          <Input
            id='email'
            type='email'
            placeholder='correo@trainity.app'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password'>Contraseña</Label>
          <Input
            id='password'
            type='password'
            placeholder='••••••••'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='confirm'>Repetir contraseña</Label>
          <Input
            id='confirm'
            type='password'
            placeholder='••••••••'
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
        </div>

        <div className='space-y-2 pt-2'>
          <Button type='submit' className='w-full' disabled={loading}>
            Registrarse
          </Button>
          <Button
            type='button'
            variant='outline'
            className='w-full'
            onClick={handleGoogleRegister}
            disabled={loading}
          >
            Registrarse con Google
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
