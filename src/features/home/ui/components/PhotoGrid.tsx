// src/features/home/ui/components/PhotoGrid.tsx
import { useUserMetrics } from '@/hooks/useUserMetrics'

export function PhotoGrid() {
  const { metrics } = useUserMetrics()

  if (!metrics?.photos?.length) {
    return <p className='text-sm text-gray-500'>Sin fotos registradas aún</p>
  }

  return (
    <div className='grid grid-cols-3 gap-2'>
      {metrics.photos.map((url, idx) => (
        <img
          key={idx}
          src={url}
          alt={`Foto ${idx + 1}`}
          className='w-full h-auto rounded-md object-cover aspect-[3/4] border border-gray-200'
        />
      ))}
    </div>
  )
}
