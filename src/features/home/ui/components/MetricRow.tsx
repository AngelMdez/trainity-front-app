interface MetricRowProps {
  label: string
  value: string
}

export function MetricRow({ label, value }: MetricRowProps) {
  return (
    <div className="flex justify-between text-sm text-zinc-300">
      <span>{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  )
}