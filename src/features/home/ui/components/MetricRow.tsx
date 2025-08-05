// src/features/home/ui/components/MetricRow.tsx
interface MetricRowProps {
  label: string
  value: string
}

export function MetricRow({ label, value }: MetricRowProps) {
  return (
    <div className='flex justify-between text-sm text-gray-700'>
      <span>{label}</span>
      <span className='font-medium text-gray-900'>{value}</span>
    </div>
  )
}
