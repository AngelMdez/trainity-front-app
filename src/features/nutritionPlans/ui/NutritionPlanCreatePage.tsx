import { useNavigate } from 'react-router-dom'
import { createNutritionPlan } from '@/features/nutritionPlans/api/nutritionPlansApi'
import NutritionPlanForm from './NutritionPlanForm'
import { NutritionPlan } from '@/features/nutritionPlans/domain/interfaces/models'

export default function NutritionPlanCreatePage() {
  const navigate = useNavigate()

  const handleSubmit = async (data: Omit<NutritionPlan, 'id'>) => {
    await createNutritionPlan(data)
    navigate('/admin/nutrition-plans')
  }

  return <NutritionPlanForm onSubmit={handleSubmit} />
}
