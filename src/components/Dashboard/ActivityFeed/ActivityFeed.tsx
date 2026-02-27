"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { recentActivities, type ActivityItem } from "@/data/mock/activity-log"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import {
  Activity,
  Building2,
  Hammer,
  HardHat,
  ClipboardCheck,
  FileText,
  Upload,
  File,
  FolderOpen,
  FileSignature,
  ScrollText,
  Handshake,
  Receipt,
  Package,
  Warehouse,
  Boxes,
  PackageCheck,
  Settings,
  Shield,
  Database,
  UserCog,
  ArrowLeft,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Hammer,
  HardHat,
  ClipboardCheck,
  FileText,
  Upload,
  File,
  FolderOpen,
  FileSignature,
  ScrollText,
  Handshake,
  Receipt,
  Package,
  Warehouse,
  Boxes,
  PackageCheck,
  Settings,
  Shield,
  Database,
  UserCog,
}

const typeColors: Record<ActivityItem["type"], string> = {
  project: "bg-blue-100 text-blue-600",
  document: "bg-amber-100 text-amber-600",
  contract: "bg-green-100 text-green-600",
  warehouse: "bg-purple-100 text-purple-600",
  system: "bg-gray-100 text-gray-600",
}

export default function ActivityFeed() {
  return (
    <Card className="overflow-hidden rounded-xl border border-orange-100 bg-white/60 backdrop-blur-md shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm sm:text-base font-semibold text-gray-700">
          فعالیت‌های اخیر
        </CardTitle>
        <Activity className="h-5 w-5 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto space-y-1 scrollbar-thin" dir="rtl">
          {recentActivities.map((item) => {
            const Icon = iconMap[item.icon] ?? FileText
            const colorClass = typeColors[item.type]

            return (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-orange-50/50"
              >
                {/* Icon */}
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colorClass}`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    <span className="font-semibold text-gray-900">{item.user}</span>
                    {" "}
                    <span className="text-gray-600">{item.action}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {toPersianNumber(item.timestamp)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* View all link */}
        <div className="mt-3 border-t border-gray-100 pt-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-50"
          >
            مشاهده همه
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
