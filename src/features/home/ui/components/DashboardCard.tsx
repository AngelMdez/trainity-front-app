import { ReactNode } from "react"

interface DashboardCardProps {
  icon?: ReactNode
  title: string
  children: ReactNode
  accentColor?: string // e.g. "text-indigo-400"
}

export function DashboardCard({
  icon,
  title,
  children,
  accentColor = "text-indigo-400",
}: DashboardCardProps) {
  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-xl shadow-md hover:scale-[1.01] transition">
      <div className="flex items-center gap-4 mb-4">
        {icon && (
          <div className="p-3 bg-zinc-800 rounded-full">
            <div className={accentColor}>{icon}</div>
          </div>
        )}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  )
}