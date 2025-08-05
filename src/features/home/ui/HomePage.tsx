import {
  ArrowUpRight,
  Dumbbell,
  Salad,
  ImageIcon,
  CalendarDays,
} from 'lucide-react'
import { DashboardCard } from './components/DashboardCard'
import { MetricRow } from './components/MetricRow'
import { PhotoGrid } from './components/PhotoGrid'
import { useTodayTraining } from '@/hooks/useTodayTraining'
import { useNutritionPlans } from '@/features/nutritionPlans/domain/useNutritionPlans'
import { useUserMetrics } from '@/hooks/useUserMetrics'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const { training, loading: loadingTraining } = useTodayTraining()
  const { plans: nutrition, loading: loadingNutrition } = useNutritionPlans()
  const { metrics, loading: loadingMetrics } = useUserMetrics()

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex justify-between items-start'>
        <div>
          <h1 className='text-3xl font-semibold text-gray-900'>Hola, Ángel 👋</h1>
          <p className='text-sm text-gray-500'>Martes, 23 de abril</p>
        </div>
        <Button variant='default' className='flex items-center gap-2'>
          <CalendarDays size={16} /> Ver agenda diaria
        </Button>
      </div>

      {/* Grid de tarjetas */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <DashboardCard icon={<Dumbbell size={24} />} title='Hoy entrenas'>
          {loadingTraining ? (
            <p className='text-gray-400'>Cargando entrenamiento...</p>
          ) : training ? (
            <>
              <p className='text-base font-medium mb-1'>
                {training.muscleGroups?.join(' + ') || 'Sin info'}
              </p>
              <Button variant='link' className='text-indigo-600 px-0'>Ver plan completo</Button>
            </>
          ) : (
            <p className='text-gray-400'>No hay entrenamiento asignado</p>
          )}
        </DashboardCard>

        <DashboardCard icon={<Salad size={24} />} title='Nutrición' accentColor='text-green-600'>
          {loadingNutrition ? (
            <p className='text-gray-400'>Cargando nutrición...</p>
          ) : nutrition?.length ? (
            <>
              <p className='text-base font-medium mb-1'>
                {nutrition[0].name} • {nutrition[0].dailyCalories} kcal
              </p>
              <Button variant='link' className='text-green-600 px-0'>Ver comidas</Button>
            </>
          ) : (
            <p className='text-gray-400'>No hay plan nutricional activo</p>
          )}
        </DashboardCard>

        <DashboardCard title='📊 Últimas métricas'>
          {loadingMetrics ? (
            <p className='text-gray-400'>Cargando métricas...</p>
          ) : metrics ? (
            <div className='space-y-2'>
              <MetricRow label='Peso' value={`${metrics.weight} kg`} />
              <MetricRow label='% Grasa' value={`${metrics.bodyFat}%`} />
              <div className='flex items-center gap-2 text-green-600 text-sm pt-2'>
                <ArrowUpRight size={16} /> Progreso esta semana
              </div>
            </div>
          ) : (
            <p className='text-gray-400'>Sin métricas disponibles</p>
          )}
        </DashboardCard>

        <DashboardCard icon={<ImageIcon size={24} />} title='Fotos de progreso' accentColor='text-pink-600'>
          <PhotoGrid />
          <Button variant='link' className='text-pink-600 px-0 mt-2'>Ver todas</Button>
        </DashboardCard>
      </div>
    </div>
  )
}
