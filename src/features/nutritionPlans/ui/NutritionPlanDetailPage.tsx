import { useNavigate } from 'react-router-dom'
import { useNutritionPlan } from '@/hooks/useNutritionPlan'
import EmptyState from '@/components/EmptyState'

export default function NutritionPlansPage() {
  const { plans, loading, error } = useNutritionPlan()
  const navigate = useNavigate()

  if (loading) return <div className='p-6 text-center text-gray-400'>Loading plans...</div>
  if (error) return <div className='p-6 text-center text-red-500'>Error loading plans</div>

  if (!plans || plans.length === 0) {
    return (
      <EmptyState
        title='No nutrition plans yet'
        description='Start by creating your first plan.'
        actionLabel='Create Plan'
        actionHref='/admin/nutrition-plans/new'
      />
    )
  }

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Nutrition Plans</h1>
        <button
          onClick={() => navigate('/admin/nutrition-plans/new')}
          className='px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 text-white text-sm'
        >
          + New Plan
        </button>
      </div>
      <ul className='grid gap-4 md:grid-cols-2'>
        {plans.map(plan => (
          <li key={plan.id} className='p-5 bg-zinc-800 rounded shadow hover:shadow-lg transition'>
            <div className='flex justify-between items-start'>
              <div>
                <h2 className='text-lg font-semibold text-white'>{plan.name}</h2>
                <p className='text-sm text-gray-400'>{plan.description}</p>
                <p className='text-xs text-gray-500 mt-2'>Duration: {plan.durationWeeks} weeks</p>
              </div>
              <button
                onClick={() => navigate(`/admin/nutrition-plans/${plan.id}/edit`)}
                className='text-sm text-indigo-400 hover:underline'
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
