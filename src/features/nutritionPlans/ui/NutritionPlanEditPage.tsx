import { useNavigate, useParams } from 'react-router-dom'
import { useNutritionPlanById } from '@/features/nutritionPlans/domain/useNutritionPlanById'
import { updateNutritionPlan } from '@/features/nutritionPlans/api/nutritionPlansApi'
import NutritionPlanForm from './NutritionPlanForm'
import { NutritionPlan } from '@/features/nutritionPlans/domain/interfaces/models'

export default function NutritionPlanEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { plan, loading } = useNutritionPlanById(id)

  if (loading) return <div className='text-gray-500 text-center py-8'>Cargando...</div>
  if (!plan) return <div className='text-red-500 text-center py-8'>Plan no encontrado.</div>

  const handleSubmit = async (data: Omit<NutritionPlan, 'id'>) => {
    await updateNutritionPlan(id!, data)
    navigate('/admin/nutrition-plans')
  }

  return <NutritionPlanForm initialData={plan} onSubmit={handleSubmit} />
}
