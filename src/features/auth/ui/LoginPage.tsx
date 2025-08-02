import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../domain/auth-context'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { loginWithEmail, loginWithGoogle, loginAsDemoUser } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await loginWithEmail(email, password)
      navigate('/')
    } catch {
      setError('Invalid credentials')
    }
  }

  const handleGoogle = async () => {
    setError(null)
    try {
      await loginWithGoogle()
      navigate('/')
    } catch {
      setError('Google login failed')
    }
  }

  const handleDemoLogin = async () => {
    setError(null)
    try {
      await loginAsDemoUser()
      navigate('/')
    } catch {
      setError('Failed to log in as demo user')
    }
  }

  return (
    <div className='min-h-screen bg-zinc-900 text-white flex items-center justify-center'>
      <div className='w-full max-w-md space-y-6 px-8 py-10 rounded-xl'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='text-4xl text-indigo-500'>🏋️‍♂️</div>
          <h1 className='text-xl font-semibold text-center'>Sign in to your account</h1>
        </div>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email' className='block text-sm font-medium mb-1'>
              Email address
            </label>
            <input
              id='email'
              type='email'
              className='w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium mb-1'>
              Password
            </label>
            <input
              id='password'
              type='password'
              className='w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <div className='space-y-2 pt-2'>
            <button type='submit' className='w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded'>
              Sign in
            </button>
            <button type='button' onClick={handleDemoLogin}
                    className='w-full bg-indigo-600/70 hover:bg-indigo-500 text-white px-4 py-2 rounded'>
              Sign in as a demo user
            </button>
          </div>
        </form>

        <div className='text-center text-sm text-zinc-400'>
          Not a member? <Link to='/register' className='text-indigo-400 hover:underline'>Sign up</Link>
        </div>

        <div className='relative my-4'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-zinc-700' />
          </div>
          <div className='relative flex justify-center text-xs text-zinc-400 bg-zinc-900 px-2'>
            Or continue with
          </div>
        </div>

        <button
          type='button'
          onClick={handleGoogle}
          className='w-full flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 px-4 py-2 rounded'
        >
          <FcGoogle size={20} /> Google
        </button>
      </div>
    </div>
  )
}
