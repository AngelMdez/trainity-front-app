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
import { useNutritionPlan } from '@/hooks/useNutritionPlan'
import { useUserMetrics } from '@/hooks/useUserMetrics'

export default function HomePageFancyConnected() {
  const { training, loading: loadingTraining } = useTodayTraining()
  const { nutrition, loading: loadingNutrition } = useNutritionPlan()
  const { metrics, loading: loadingMetrics } = useUserMetrics()

  return (
    <div className='p-8 space-y-8 bg-zinc-950 min-h-screen text-white'>
      {/* Header */}
      <div className='flex justify-between items-start'>
        <div>
          <h1 className='text-4xl font-bold'>Hola, Ángel 👋</h1>
          <p className='text-zinc-400'>Martes, 23 de abril</p>
        </div>
        <button className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-sm px-4 py-2 rounded shadow'>
          <CalendarDays size={16} /> Ver agenda diaria
        </button>
      </div>

      {/* Grid dashboard */}
      <div className='grid grid-cols-2 gap-6'>
        <DashboardCard icon={<Dumbbell size={24} />} title='Hoy entrenas'>
          {loadingTraining ? (
            <p className='text-zinc-400'>Cargando entrenamiento...</p>
          ) : training ? (
            <>
              <p className='text-lg font-semibold mb-2'>
                {training.muscleGroups?.join(' + ') || 'Sin info'}
              </p>
              <button className='text-sm text-indigo-400 hover:underline'>Ver plan completo</button>
            </>
          ) : (
            <p className='text-zinc-500'>No hay entrenamiento asignado</p>
          )}
        </DashboardCard>

        <DashboardCard icon={<Salad size={24} />} title='Nutrición' accentColor='text-green-400'>
          {loadingNutrition ? (
            <p className='text-zinc-400'>Cargando nutrición...</p>
          ) : nutrition ? (
            <>
              <p className='text-lg font-semibold mb-2'>
                {nutrition.plan} • {nutrition.calories} kcal
              </p>
              <button className='text-sm text-green-400 hover:underline'>Ver comidas</button>
            </>
          ) : (
            <p className='text-zinc-500'>No hay plan nutricional activo</p>
          )}
        </DashboardCard>

        <DashboardCard title='📊 Últimas métricas'>
          {loadingMetrics ? (
            <p className='text-zinc-400'>Cargando métricas...</p>
          ) : metrics ? (
            <div className='space-y-2'>
              <MetricRow label='Peso' value={metrics.weight + ' kg'} />
              <MetricRow label='% Grasa' value={metrics.bodyFat + '%'} />
              <div className='flex items-center gap-2 text-green-400 text-sm pt-2'>
                <ArrowUpRight size={16} /> Progreso esta semana
              </div>
            </div>
          ) : (
            <p className='text-zinc-500'>Sin métricas disponibles</p>
          )}
        </DashboardCard>

        <DashboardCard icon={<ImageIcon size={24} />} title='Fotos de progreso' accentColor='text-pink-400'>
          <PhotoGrid />
          <button className='text-sm text-pink-400 hover:underline'>Ver todas</button>
        </DashboardCard>
      </div>
    </div>
  )
}