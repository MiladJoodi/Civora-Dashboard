"use client"

import { useMemo } from "react"
import Link from "next/link"
import {
  Building,
  Package,
  AlertTriangle,
  ShoppingCart,
  Users,
  ArrowLeft,
  TrendingDown,
} from "lucide-react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { StatsGrid } from "@/components/shared/StatsGrid/StatsGrid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import { formatCurrency } from "@/lib/mock-helpers"
import {
  inventoryItems,
  warehouseOrders,
  suppliers,
  categoryLabels,
} from "@/data/mock/warehouse"

export default function WarehouseHub() {
  const lowStockItems = useMemo(
    () => inventoryItems.filter((item) => item.stock <= item.minStock && item.stock > 0),
    []
  )

  const outOfStockItems = useMemo(
    () => inventoryItems.filter((item) => item.stock === 0),
    []
  )

  const activeOrders = useMemo(
    () =>
      warehouseOrders.filter(
        (o) => o.status === "pending" || o.status === "approved" || o.status === "shipped"
      ),
    []
  )

  const stats = [
    {
      title: "کل اقلام",
      value: inventoryItems.length,
      icon: Package,
      color: "text-blue-500",
    },
    {
      title: "اقلام کم‌موجود",
      value: lowStockItems.length + outOfStockItems.length,
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
    {
      title: "سفارشات فعال",
      value: activeOrders.length,
      icon: ShoppingCart,
      color: "text-green-500",
    },
    {
      title: "تامین‌کنندگان",
      value: suppliers.length,
      icon: Users,
      color: "text-purple-500",
    },
  ]

  const quickLinks = [
    {
      title: "موجودی انبار",
      description: "مشاهده و مدیریت موجودی کالاهای انبار",
      icon: Package,
      href: "/warehouse/inventory",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "سفارشات",
      description: "پیگیری و مدیریت سفارشات خرید",
      icon: ShoppingCart,
      href: "/warehouse/orders",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "تامین‌کنندگان",
      description: "لیست و اطلاعات تامین‌کنندگان",
      icon: Users,
      href: "/warehouse/suppliers",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="space-y-6 px-3 container mx-auto">
      <PageHeader title="مخزن و انبار" Icon={Building} />

      <StatsGrid stats={stats} />

      {/* Low Stock Alerts */}
      {(lowStockItems.length > 0 || outOfStockItems.length > 0) && (
        <Card className="border-yellow-200 bg-yellow-50/30">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-yellow-100 p-2">
                <TrendingDown className="h-5 w-5 text-yellow-600" />
              </div>
              <CardTitle className="text-base font-semibold text-yellow-800">
                هشدار موجودی
              </CardTitle>
              <span className="mr-auto text-sm text-yellow-600">
                {toPersianNumber(lowStockItems.length + outOfStockItems.length)} قلم نیاز به بررسی
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {outOfStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-red-200 bg-white px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      <span className="text-xs text-gray-500 mr-2">
                        ({categoryLabels[item.category]})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{item.location}</span>
                    <StatusBadge status="out-of-stock" />
                  </div>
                </div>
              ))}
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-yellow-200 bg-white px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      <span className="text-xs text-gray-500 mr-2">
                        ({categoryLabels[item.category]})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">
                      موجودی: {toPersianNumber(item.stock)} {item.unit} از حداقل{" "}
                      {toPersianNumber(item.minStock)}
                    </span>
                    <StatusBadge status="low-stock" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">دسترسی سریع</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href}>
                <Card className="group cursor-pointer border border-gray-200 hover:border-orange-200 hover:shadow-md transition-all duration-200 h-full">
                  <CardContent className="flex items-start gap-4 pt-2">
                    <div className={`rounded-xl ${link.bgColor} p-3 shrink-0`}>
                      <Icon className={`h-6 w-6 ${link.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{link.description}</p>
                    </div>
                    <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-orange-500 transition-colors shrink-0 mt-1" />
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Orders Summary */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">آخرین سفارشات</CardTitle>
            <Link
              href="/warehouse/orders"
              className="text-sm text-orange-600 hover:text-orange-700 transition-colors"
            >
              مشاهده همه
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {warehouseOrders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-gray-100 px-4 py-3 hover:bg-gray-50/50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {order.items}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{order.supplier}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-gray-500">
                    {toPersianNumber(formatCurrency(order.totalAmount))}
                  </span>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
