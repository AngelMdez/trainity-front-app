import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/features/auth/context/auth-context'
import AuthLayout from './AuthLayout'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { loginWithEmail, loginAsDemoUser, loginWithGoogle } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await loginWithEmail(email, password)
      navigate('/')
    } catch {
      alert('Login fallido')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setLoading(true)
    try {
      await loginAsDemoUser()
      navigate('/')
    } catch {
      alert('Error con demo user')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await loginWithGoogle()
      navigate('/')
    } catch {
      alert('Error con Google')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title='Inicia sesión'
      subtitle='Accede a tu cuenta de Trainity'
    >
      <form onSubmit={handleLogin} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Correo</Label>
          <Input
            id='email'
            type='email'
            placeholder='tuemail@trainity.app'
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

        <div className='text-sm text-right'>
          <Link to='/forgot-password' className='text-indigo-600 hover:underline'>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <div className='space-y-2 pt-2'>
          <Button type='submit' className='w-full' disabled={loading}>
            Entrar
          </Button>
          <Button
            type='button'
            variant='outline'
            className='w-full'
            onClick={handleDemoLogin}
            disabled={loading}
          >
            Acceder como demo user
          </Button>
          <Button
            type='button'
            variant='outline'
            className='w-full'
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Acceder con Google
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
