import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <div className='min-h-screen bg-zinc-900 text-white flex items-center justify-center'>
      <div className='w-full max-w-md space-y-6 px-8 py-10 rounded-xl'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='text-4xl text-indigo-500'>🧍‍♂️</div>
          <h1 className='text-xl font-semibold text-center'>Create your account</h1>
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

          <button type='submit' className='w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded'>
            Sign up
          </button>
        </form>

        <div className='text-center text-sm text-zinc-400'>
          Already have an account? <Link to='/login' className='text-indigo-400 hover:underline'>Sign in</Link>
        </div>
      </div>
    </div>
  )
}
