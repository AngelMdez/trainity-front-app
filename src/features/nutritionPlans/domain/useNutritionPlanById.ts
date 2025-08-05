import { useEffect, useState } from 'react'
import { fetchNutritionPlanById } from '@/features/nutritionPlans/api/nutritionPlansApi'
import { NutritionPlan } from '@/features/nutritionPlans/domain/interfaces/models'

export function useNutritionPlanById(id?: string) {
  const [plan, setPlan] = useState<NutritionPlan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetch = async () => {
      const data = await fetchNutritionPlanById(id)
      setPlan(data)
      setLoading(false)
    }

    fetch()
  }, [id])

  return { plan, loading }
}
