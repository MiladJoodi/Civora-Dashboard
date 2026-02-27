"use client"

import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"
import { weeklyData } from "@/data/mock/reports"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const chartData = weeklyData.map(w => ({
  name: w.week,
  بودجه: Math.round(w.budget / 1000000000),
  هزینه: Math.round(w.spent / 1000000000),
}))

export function WeeklyReportsView() {
  return (
    <div className="space-y-6">
      <PageHeader title="گزارش‌های هفتگی" description="خلاصه عملکرد هفتگی پروژه‌ها" Icon={CalendarDays} />

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">مقایسه بودجه و هزینه هفتگی (میلیارد ریال)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ direction: "rtl", textAlign: "right", borderRadius: "8px" }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`${toPersianNumber(value)} میلیارد ریال`]}
                />
                <Legend wrapperStyle={{ direction: "rtl" }} />
                <Bar dataKey="بودجه" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="هزینه" fill="#6b7280" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weekly summary table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">جدول عملکرد هفتگی</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-right p-3 font-medium text-gray-600">هفته</th>
                  <th className="text-right p-3 font-medium text-gray-600">روزهای کاری</th>
                  <th className="text-right p-3 font-medium text-gray-600">نیروی کار</th>
                  <th className="text-right p-3 font-medium text-gray-600">نرخ تکمیل</th>
                  <th className="text-right p-3 font-medium text-gray-600">حوادث</th>
                </tr>
              </thead>
              <tbody>
                {weeklyData.map((w, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-medium">{w.week}</td>
                    <td className="p-3">{toPersianNumber(w.workDays)}</td>
                    <td className="p-3">{toPersianNumber(w.totalWorkers)} نفر</td>
                    <td className="p-3">
                      <span className={`font-medium ${w.completionRate >= 80 ? "text-green-600" : w.completionRate >= 70 ? "text-yellow-600" : "text-red-600"}`}>
                        {toPersianNumber(w.completionRate)}%
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`${w.incidents === 0 ? "text-green-600" : "text-red-600"} font-medium`}>
                        {toPersianNumber(w.incidents)}
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
