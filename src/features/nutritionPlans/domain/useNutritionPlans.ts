import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { NutritionPlan } from '@/features/nutritionPlans/domain/interfaces/models'

export function useNutritionPlans() {
  const [plans, setPlans] = useState<NutritionPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'nutritionPlans'))
        const result = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as NutritionPlan[]
        setPlans(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  return { plans, loading, error }
}
