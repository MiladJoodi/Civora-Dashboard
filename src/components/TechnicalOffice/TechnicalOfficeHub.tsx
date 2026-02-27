"use client"

import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { StatsGrid } from "@/components/shared/StatsGrid/StatsGrid"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, FolderOpen, FileCheck, ShieldCheck, ArrowLeft } from "lucide-react"
import { technicalProjects, technicalDocs, qualityInspections } from "@/data/mock/technical"
import Link from "next/link"

const stats = [
  { title: "پروژه‌های فعال", value: technicalProjects.filter(p => p.status === "active").length, icon: Briefcase, color: "text-blue-500" },
  { title: "اسناد فنی", value: technicalDocs.length, icon: FolderOpen, color: "text-orange-500" },
  { title: "اسناد تایید شده", value: technicalDocs.filter(d => d.status === "approved").length, icon: FileCheck, color: "text-green-500" },
  { title: "بازرسی‌های کیفیت", value: qualityInspections.length, icon: ShieldCheck, color: "text-purple-500" },
]

const quickLinks = [
  { title: "مدیریت پروژه", description: "مشاهده و مدیریت پروژه‌های فنی", href: "/technical-office/projects", icon: Briefcase },
  { title: "اسناد فنی", description: "مدیریت نقشه‌ها، مشخصات و گزارشات", href: "/technical-office/docs", icon: FolderOpen },
  { title: "کنترل کیفیت", description: "بازرسی‌ها و نتایج آزمایشات", href: "/technical-office/quality", icon: ShieldCheck },
]

export function TechnicalOfficeHub() {
  return (
    <div className="space-y-6">
      <PageHeader title="دفتر فنی پروژه" description="مدیریت فنی پروژه‌ها، اسناد و کنترل کیفیت" Icon={Briefcase} />

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
