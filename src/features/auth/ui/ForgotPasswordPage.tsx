import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/features/auth/context/auth-context'
import AuthLayout from './AuthLayout'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await resetPassword(email)
      setSent(true)
    } catch {
      alert('Error al enviar el email de recuperación.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title='¿Olvidaste tu contraseña?'
      subtitle='Introduce tu correo y te enviaremos un enlace para restablecerla.'
    >
      {sent ? (
        <p className='text-green-600 text-sm'>Correo de recuperación enviado ✉️</p>
      ) : (
        <form onSubmit={handleSubmit} className='space-y-4'>
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

          <Button type='submit' className='w-full' disabled={loading}>
            Enviar enlace de recuperación
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
