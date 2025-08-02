export function PhotoGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 gap-2 mb-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-zinc-700 h-20 rounded" />
      ))}
    </div>
  )
}