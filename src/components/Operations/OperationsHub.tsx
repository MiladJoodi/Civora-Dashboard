"use client"

import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { StatsGrid } from "@/components/shared/StatsGrid/StatsGrid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Settings, Calendar, Wrench, Users, AlertTriangle, ArrowLeft } from "lucide-react"
import { dailyOperations, maintenanceTasks } from "@/data/mock/operations"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import Link from "next/link"

const stats = [
  { title: "عملیات امروز", value: dailyOperations.filter(o => o.status === "in-progress").length, icon: Calendar, color: "text-blue-500" },
  { title: "عملیات تکمیل شده", value: dailyOperations.filter(o => o.status === "completed").length, icon: Settings, color: "text-green-500" },
  { title: "تعمیرات در انتظار", value: maintenanceTasks.filter(t => t.status === "pending").length, icon: Wrench, color: "text-orange-500" },
  { title: "تعمیرات اضطراری", value: maintenanceTasks.filter(t => t.type === "emergency").length, icon: AlertTriangle, color: "text-red-500" },
]

const quickLinks = [
  { title: "عملیات روزانه", description: "مشاهده و مدیریت عملیات روزانه پروژه‌ها", href: "/operations/daily", icon: Calendar },
  { title: "نگهداری و تعمیرات", description: "برنامه‌ریزی و پیگیری تعمیرات تجهیزات", href: "/operations/maintenance", icon: Wrench },
]

export function OperationsHub() {
  return (
    <div className="space-y-6">
      <PageHeader title="عملیات" description="مدیریت عملیات روزانه و نگهداری تجهیزات" Icon={Settings} />

      <StatsGrid stats={stats} />

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link key={link.href} href={link.href}>
              <Card className="hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer h-full">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="rounded-xl bg-orange-50 p-3 shrink-0">
                    <Icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{link.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{link.description}</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-400 shrink-0 mr-auto" />
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Recent Operations Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">آخرین عملیات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dailyOperations.slice(0, 5).map((op) => (
              <div key={op.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono text-gray-400 shrink-0">{op.id}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{op.projectName}</p>
                    <p className="text-xs text-gray-500">{op.date} - شیفت {op.shift === "morning" ? "صبح" : op.shift === "afternoon" ? "عصر" : "شب"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {toPersianNumber(op.workersCount)} نفر
                  </span>
                  <StatusBadge status={op.status} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
