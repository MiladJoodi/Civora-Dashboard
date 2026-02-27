"use client"

import { useMemo } from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import { PieChart as PieChartIcon } from "lucide-react"

interface ProjectStatus {
  name: string
  value: number
  color: string
}

const projectStatusData: ProjectStatus[] = [
  { name: "در حال اجرا", value: 8, color: "#3b82f6" },
  { name: "طراحی", value: 3, color: "#f59e0b" },
  { name: "تکمیل شده", value: 5, color: "#22c55e" },
  { name: "متوقف", value: 1, color: "#f87171" },
]

const total = projectStatusData.reduce((sum, item) => sum + item.value, 0)

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: ProjectStatus
  }>
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null
  const data = payload[0]

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg text-sm" dir="rtl">
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: data.payload.color }}
        />
        <span className="font-medium text-gray-800">{data.name}</span>
      </div>
      <p className="mt-1 text-gray-600">
        {toPersianNumber(data.value)} پروژه
      </p>
    </div>
  )
}


function CustomLegend({ payload }: { payload?: Array<{ value: string; color: string }> }) {
  if (!payload) return null

  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm" dir="rtl">
      {payload.map((entry, index) => {
        const item = projectStatusData[index]
        return (
          <div key={entry.value} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600">{entry.value}</span>
            <span className="text-gray-400">({toPersianNumber(item.value)})</span>
          </div>
        )
      })}
    </div>
  )
}

export default function ProjectStatusChart() {
  const data = useMemo(() => projectStatusData, [])

  return (
    <Card className="overflow-hidden rounded-xl border border-orange-100 bg-white/60 backdrop-blur-md shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm sm:text-base font-semibold text-gray-700">
          وضعیت پروژه‌ها
        </CardTitle>
        <PieChartIcon className="h-5 w-5 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="h-64 sm:h-72 md:h-80 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius="55%"
                outerRadius="80%"
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ paddingBottom: "12%" }}>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800">
                {toPersianNumber(total)}
              </div>
              <div className="text-xs text-gray-500">پروژه</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
