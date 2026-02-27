"use client"

import { useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { monthlyRevenue } from "@/data/mock/revenue"
import { TrendingUp } from "lucide-react"

function formatRial(value: number): string {
  if (value >= 1_000_000_000_000) {
    const num = value / 1_000_000_000_000
    return `${num.toLocaleString("fa-IR")} هزار میلیارد`
  }
  if (value >= 1_000_000_000) {
    const num = value / 1_000_000_000
    return `${num.toLocaleString("fa-IR")} میلیارد`
  }
  if (value >= 1_000_000) {
    const num = value / 1_000_000
    return `${num.toLocaleString("fa-IR")} میلیون`
  }
  return value.toLocaleString("fa-IR")
}

function formatAxisRial(value: number): string {
  if (value >= 1_000_000_000) {
    const num = value / 1_000_000_000
    return `${num.toLocaleString("fa-IR")}`
  }
  return value.toLocaleString("fa-IR")
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
    color: string
  }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg text-sm" dir="rtl">
      <p className="mb-2 font-semibold text-gray-800">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 py-0.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600">
            {entry.dataKey === "revenue" ? "درآمد" : "هزینه"}:
          </span>
          <span className="font-medium text-gray-900">
            {formatRial(entry.value)} ریال
          </span>
        </div>
      ))}
    </div>
  )
}

function CustomLegend() {
  return (
    <div className="mt-2 flex items-center justify-center gap-6 text-xs sm:text-sm" dir="rtl">
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
        <span className="text-gray-600">درآمد</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-400" />
        <span className="text-gray-600">هزینه</span>
      </div>
    </div>
  )
}

export default function RevenueChart() {
  const data = useMemo(() => monthlyRevenue, [])

  return (
    <Card className="overflow-hidden rounded-xl border border-orange-100 bg-white/60 backdrop-blur-md shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm sm:text-base font-semibold text-gray-700">
          نمودار درآمد و هزینه
        </CardTitle>
        <TrendingUp className="h-5 w-5 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="h-64 sm:h-72 md:h-80 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#9ca3af" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#6b7280" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#6b7280" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatAxisRial}
                width={45}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#f97316"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
                dot={false}
                activeDot={{ r: 5, stroke: "#f97316", strokeWidth: 2, fill: "#fff" }}
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#9ca3af"
                strokeWidth={2}
                fill="url(#expenseGradient)"
                dot={false}
                activeDot={{ r: 4, stroke: "#9ca3af", strokeWidth: 2, fill: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
