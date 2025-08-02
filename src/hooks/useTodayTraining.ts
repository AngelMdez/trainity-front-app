import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/features/auth/domain/auth-context'

export function useTodayTraining() {
  const { user } = useAuth()
  const [training, setTraining] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const today = new Date().toISOString().split('T')[0]
    const ref = doc(db, 'mock_users', user.email!, 'training', today)

    getDoc(ref)
      .then((docSnap) => {
        setTraining(docSnap.exists() ? docSnap.data() : null)
      })
      .finally(() => setLoading(false))
  }, [user])

  return { training, loading }
}