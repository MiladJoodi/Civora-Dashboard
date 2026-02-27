"use client"

import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarRange, TrendingUp, TrendingDown, Users, Smile } from "lucide-react"
import { monthlyData } from "@/data/mock/reports"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const chartData = monthlyData.map(m => ({
  name: m.month,
  درآمد: Math.round(m.revenue / 1000000000),
  هزینه: Math.round(m.expense / 1000000000),
}))

const totalRevenue = monthlyData.reduce((s, m) => s + m.revenue, 0)
const totalExpense = monthlyData.reduce((s, m) => s + m.expense, 0)
const totalProjects = monthlyData.reduce((s, m) => s + m.projectsCompleted, 0)
const avgSatisfaction = Math.round(monthlyData.reduce((s, m) => s + m.satisfaction, 0) / monthlyData.length)

export function MonthlyReportsView() {
  return (
    <div className="space-y-6">
      <PageHeader title="گزارش‌های ماهانه" description="نمای کلی عملکرد ماهانه سازمان" Icon={CalendarRange} />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-green-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-gray-500">درآمد کل</span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-gray-900">{toPersianNumber(Math.round(totalRevenue / 1000000000))} <span className="text-xs text-gray-500">میلیارد ریال</span></p>
          </CardContent>
        </Card>
        <Card className="border-red-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-red-500" />
              <span className="text-xs text-gray-500">هزینه کل</span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-gray-900">{toPersianNumber(Math.round(totalExpense / 1000000000))} <span className="text-xs text-gray-500">میلیارد ریال</span></p>
          </CardContent>
        </Card>
        <Card className="border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-gray-500">پروژه‌های تکمیل شده</span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-gray-900">{toPersianNumber(totalProjects)}</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Smile className="h-4 w-4 text-purple-500" />
              <span className="text-xs text-gray-500">میانگین رضایت</span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-gray-900">{toPersianNumber(avgSatisfaction)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">روند درآمد و هزینه ماهانه (میلیارد ریال)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ direction: "rtl", textAlign: "right", borderRadius: "8px" }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`${toPersianNumber(value)} میلیارد ریال`]}
                />
                <Legend wrapperStyle={{ direction: "rtl" }} />
                <Area type="monotone" dataKey="درآمد" stroke="#f59e0b" fill="#fef3c7" strokeWidth={2} />
                <Area type="monotone" dataKey="هزینه" stroke="#6b7280" fill="#f3f4f6" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">جزئیات عملکرد ماهانه</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-right p-3 font-medium text-gray-600">ماه</th>
                  <th className="text-right p-3 font-medium text-gray-600">درآمد</th>
                  <th className="text-right p-3 font-medium text-gray-600">هزینه</th>
                  <th className="text-right p-3 font-medium text-gray-600">سود</th>
                  <th className="text-right p-3 font-medium text-gray-600">قراردادهای جدید</th>
                  <th className="text-right p-3 font-medium text-gray-600">رضایت</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((m, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-medium">{m.month}</td>
                    <td className="p-3 text-green-600">{toPersianNumber(Math.round(m.revenue / 1000000000))} میلیارد</td>
                    <td className="p-3 text-red-600">{toPersianNumber(Math.round(m.expense / 1000000000))} میلیارد</td>
                    <td className="p-3 font-medium">{toPersianNumber(Math.round((m.revenue - m.expense) / 1000000000))} میلیارد</td>
                    <td className="p-3">{toPersianNumber(m.newContracts)}</td>
                    <td className="p-3">
                      <span className={`font-medium ${m.satisfaction >= 90 ? "text-green-600" : "text-yellow-600"}`}>
                        {toPersianNumber(m.satisfaction)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
