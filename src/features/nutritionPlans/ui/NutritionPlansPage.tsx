import { useNavigate } from 'react-router-dom'
import { useNutritionPlans } from '@/features/nutritionPlans/domain/useNutritionPlans'
import EmptyState from '@/components/EmptyState'
import { Button } from '@/components/ui/button'

export default function NutritionPlansPage() {
  const { plans, loading, error } = useNutritionPlans()
  const navigate = useNavigate()

  if (loading) return <div className='text-gray-500 text-center py-8'>Cargando planes...</div>
  if (error) return <div className='text-red-500 text-center py-8'>Error al cargar planes.</div>

  if (!plans || plans.length === 0) {
    return (
      <EmptyState
        title='No hay planes de nutrición'
        description='Crea tu primer plan para empezar.'
        actionLabel='Crear plan'
        actionHref='/admin/nutrition-plans/new'
      />
    )
  }

  return (
    <div className='space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-semibold text-gray-900'>Planes de nutrición</h1>
        <Button onClick={() => navigate('/admin/nutrition-plans/new')}>+ Nuevo plan</Button>
      </div>

      <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {plans.map(plan => (
          <li key={plan.id}
              className='bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition'>
            <div className='space-y-2'>
              <h2 className='text-base font-semibold text-gray-900'>{plan.name}</h2>
              <p className='text-sm text-gray-500'>{plan.description}</p>
              <p className='text-xs text-gray-400'>Duración: {plan.durationWeeks} semanas</p>
              <Button
                variant='secondary'
                className='mt-2'
                onClick={() => navigate(`/admin/nutrition-plans/${plan.id}/edit`)}
              >
                Editar
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
