"use client"

import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { StatsGrid } from "@/components/shared/StatsGrid/StatsGrid"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Calendar, CalendarDays, CalendarRange, ArrowLeft, FileText } from "lucide-react"
import { dailyReports } from "@/data/mock/reports"
import Link from "next/link"

const stats = [
  { title: "گزارش‌های روزانه", value: dailyReports.length, icon: Calendar, color: "text-blue-500" },
  { title: "تایید شده", value: dailyReports.filter(r => r.status === "approved").length, icon: FileText, color: "text-green-500" },
  { title: "در انتظار بررسی", value: dailyReports.filter(r => r.status === "submitted").length, icon: CalendarDays, color: "text-orange-500" },
  { title: "رد شده", value: dailyReports.filter(r => r.status === "rejected").length, icon: CalendarRange, color: "text-red-500" },
]

const quickLinks = [
  { title: "گزارش‌های روزانه", description: "مشاهده و مدیریت گزارشات روزانه", href: "/reports/daily", icon: Calendar },
  { title: "گزارش‌های هفتگی", description: "خلاصه عملکرد هفتگی با نمودار", href: "/reports/weekly", icon: CalendarDays },
  { title: "گزارش‌های ماهانه", description: "نمای کلی عملکرد ماهانه", href: "/reports/monthly", icon: CalendarRange },
]

export function ReportsHub() {
  return (
    <div className="space-y-6">
      <PageHeader title="گزارشات" description="مدیریت و مشاهده گزارش‌های عملکردی" Icon={BarChart3} />
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link key={link.href} href={link.href}>
              <Card className="hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer h-full">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="rounded-xl bg-orange-50 p-3 shrink-0">
                    <Icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{link.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{link.description}</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-400 shrink-0" />
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
