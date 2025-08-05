import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { FoodItem } from '../domain/interfaces/foodItem'

export function useFoods() {
  const [foods, setFoods] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'foods'))
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as FoodItem[]
        setFoods(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchFoods()
  }, [])

  return { foods, loading, error }
}
