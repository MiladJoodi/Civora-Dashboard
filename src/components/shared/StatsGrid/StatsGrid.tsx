import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toPersianNumber } from "@/lib/ToPersianNumber"

interface StatItem {
  title: string
  value: React.ReactNode
  icon: LucideIcon
  color?: string
  change?: number
  trend?: "up" | "down"
  trendIcon?: LucideIcon
}

interface StatsGridProps {
  stats: StatItem[]
  className?: string
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats, className }) => {
  return (
    <div className={`grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 select-none ${className}`} role="list">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const TrendIcon = stat.trendIcon
        const isUp = stat.trend === "up"
        const changeAbs = stat.change != null ? Math.abs(stat.change) : null

        return (
          <Card
            key={index}
            className="relative overflow-hidden rounded-xl border border-orange-100 bg-white/60 backdrop-blur-md shadow-sm hover:shadow-lg transition-all duration-300"
            role="listitem"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-50 via-white to-orange-100 opacity-30 pointer-events-none" />

            <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base font-semibold text-gray-700">{stat.title}</CardTitle>
              <div className="transition-transform duration-300 hover:scale-110 hover:rotate-3">
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color ?? "text-orange-500"}`} />
              </div>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900 drop-shadow-md tracking-tight">
                {toPersianNumber(stat.value)}
              </div>
              {changeAbs != null && TrendIcon && (
                <div className="mt-2 flex items-center justify-center gap-1">
                  <TrendIcon
                    className={`h-3.5 w-3.5 ${
                      isUp ? "text-green-500" : "text-red-500"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      isUp ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {toPersianNumber(`${changeAbs}٪`)}
                  </span>
                  <span className="text-xs text-gray-400">
                    نسبت به ماه قبل
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

