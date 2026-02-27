"use client"

import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Settings, User, Monitor, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

const settingsLinks = [
  {
    title: "پروفایل کاربری",
    description: "ویرایش نام، ایمیل، تصویر پروفایل و تنظیمات اعلان‌ها",
    href: "/settings/profile",
    icon: User,
    color: "bg-blue-50 text-blue-500",
  },
  {
    title: "تنظیمات سیستم",
    description: "تم رابط کاربری، زبان، فرمت تاریخ و تنظیمات نمایش",
    href: "/settings/system",
    icon: Monitor,
    color: "bg-purple-50 text-purple-500",
  },
  {
    title: "مدیریت کاربران و مجوزها",
    description: "افزودن، ویرایش و حذف اعضای تیم و تنظیم سطح دسترسی",
    href: "/settings/permissions",
    icon: Shield,
    color: "bg-orange-50 text-orange-500",
  },
]

export function SettingsHub() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="تنظیمات"
        description="مدیریت تنظیمات سیستم، پروفایل و مجوزهای دسترسی"
        Icon={Settings}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {settingsLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link key={link.href} href={link.href}>
              <Card className="hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`rounded-xl p-3 ${link.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <ArrowLeft className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base">{link.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
