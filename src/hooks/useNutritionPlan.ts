import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/features/auth/context/auth-context'

export function useNutritionPlan() {
  const { user } = useAuth()
  const [nutrition, setNutrition] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const ref = doc(db, 'mock_users', user.email!)

    getDoc(ref)
      .then((docSnap) => {
        setNutrition(docSnap.exists() ? docSnap.data().nutrition || null : null)
      })
      .finally(() => setLoading(false))
  }, [user])

  return { nutrition, loading }
}