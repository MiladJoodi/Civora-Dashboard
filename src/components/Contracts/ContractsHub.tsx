"use client"

import { useMemo } from "react"
import Link from "next/link"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { StatsGrid } from "@/components/shared/StatsGrid/StatsGrid"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent } from "@/components/ui/card"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import { formatCurrency } from "@/lib/mock-helpers"
import { contracts } from "@/data/mock/contracts"
import {
  FileText,
  CheckCircle2,
  Clock,
  Banknote,
  ArrowLeft,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface QuickAction {
  title: string
  description: string
  href: string
  icon: LucideIcon
  count: number
  color: string
  bgColor: string
}

export function ContractsHub() {
  const activeCount = useMemo(
    () => contracts.filter((c) => c.status === "active").length,
    []
  )
  const pendingCount = useMemo(
    () => contracts.filter((c) => c.status === "pending").length,
    []
  )
  const completedCount = useMemo(
    () => contracts.filter((c) => c.status === "completed").length,
    []
  )
  const totalValue = useMemo(
    () => contracts.reduce((sum, c) => sum + c.value, 0),
    []
  )

  const recentContracts = useMemo(
    () => [...contracts].sort((a, b) => b.lastUpdate.localeCompare(a.lastUpdate)).slice(0, 5),
    []
  )

  const stats = [
    {
      title: "قراردادهای فعال",
      value: activeCount,
      icon: FileText,
      color: "text-green-500",
    },
    {
      title: "در انتظار تایید",
      value: pendingCount,
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      title: "تکمیل شده",
      value: completedCount,
      icon: CheckCircle2,
      color: "text-emerald-500",
    },
    {
      title: "ارزش کل قراردادها",
      value: formatCurrency(totalValue),
      icon: Banknote,
      color: "text-orange-500",
    },
  ]

  const quickActions: QuickAction[] = [
    {
      title: "قراردادهای فعال",
      description: "مشاهده و مدیریت قراردادهای در حال اجرا",
      href: "/contracts/active",
      icon: FileText,
      count: activeCount,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "در انتظار تایید",
      description: "بررسی و تایید قراردادهای جدید",
      href: "/contracts/pending",
      icon: Clock,
      count: pendingCount,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "تکمیل شده",
      description: "آرشیو قراردادهای تکمیل و تحویل شده",
      href: "/contracts/completed",
      icon: CheckCircle2,
      count: completedCount,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="قراردادها"
        description="مدیریت و پیگیری قراردادهای پروژه"
        Icon={FileText}
      />

      {/* Stats Grid */}
      <StatsGrid stats={stats} />

      {/* Quick Action Cards */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          دسترسی سریع
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="group cursor-pointer border border-gray-200 transition-all duration-200 hover:border-orange-200 hover:shadow-md">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-lg p-2.5 ${action.bgColor} transition-transform duration-200 group-hover:scale-105`}
                      >
                        <action.icon
                          className={`h-5 w-5 ${action.color}`}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {action.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg font-bold text-gray-900">
                        {toPersianNumber(action.count)}
                      </span>
                      <ArrowLeft className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:-translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Contracts */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          آخرین قراردادها
        </h2>
        <Card className="border border-gray-200">
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentContracts.map((contract) => {
                const progressColor =
                  contract.progress >= 75
                    ? "bg-green-500"
                    : contract.progress >= 40
                      ? "bg-orange-500"
                      : contract.progress > 0
                        ? "bg-yellow-500"
                        : "bg-gray-300"

                return (
                  <div
                    key={contract.id}
                    className="flex flex-col gap-3 p-4 transition-colors hover:bg-gray-50/50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="rounded-lg bg-orange-50 p-2 shrink-0">
                        <FileText className="h-4 w-4 text-orange-500" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {contract.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {contract.contractor} | {contract.projectName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6 shrink-0 mr-11 sm:mr-0">
                      {/* Progress */}
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full rounded-full ${progressColor}`}
                            style={{ width: `${contract.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-left">
                          {toPersianNumber(contract.progress)}٪
                        </span>
                      </div>

                      {/* Value */}
                      <span className="hidden text-xs font-medium text-gray-700 lg:inline-block">
                        {toPersianNumber(formatCurrency(contract.value))}
                      </span>

                      {/* Status */}
                      <StatusBadge status={contract.status} />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
