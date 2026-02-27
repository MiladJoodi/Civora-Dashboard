"use client"

import { useState, useMemo } from "react"
import {
  Users,
  Star,
  Phone,
  Mail,
  MapPin,
  LayoutGrid,
  List,
  Search,
  ShoppingCart,
} from "lucide-react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { DataTable, Column } from "@/components/shared/DataTable/DataTable"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { EmptyState } from "@/components/shared/EmptyState"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import {
  suppliers,
  reliabilityLabels,
  type Supplier,
} from "@/data/mock/warehouse"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  )
}

function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <Card className="border border-gray-200 hover:border-orange-200 hover:shadow-md transition-all duration-200">
      <CardContent className="pt-2 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {supplier.name}
            </h3>
            <span className="text-xs text-gray-500">{supplier.category}</span>
          </div>
          <StatusBadge
            status={supplier.reliability}
            label={reliabilityLabels[supplier.reliability]}
          />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={supplier.rating} />
          <span className="text-xs text-gray-500">
            ({toPersianNumber(supplier.rating)} از {toPersianNumber(5)})
          </span>
        </div>

        {/* Orders */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ShoppingCart className="h-3.5 w-3.5 text-gray-400" />
          <span>{toPersianNumber(supplier.totalOrders)} سفارش</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span dir="ltr" className="text-right">
              {toPersianNumber(supplier.phone)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span className="truncate text-xs" dir="ltr">
              {supplier.email}
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5" />
            <span className="text-xs line-clamp-2">{supplier.address}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SuppliersList() {
  const [viewMode, setViewMode] = useState<"card" | "table">("card")
  const [search, setSearch] = useState("")

  const filteredSuppliers = useMemo(() => {
    if (!search.trim()) return suppliers
    const term = search.toLowerCase()
    return suppliers.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.category.toLowerCase().includes(term)
    )
  }, [search])

  const tableColumns: Column<Supplier>[] = [
    {
      key: "name",
      header: "نام",
      sortable: true,
      render: (item) => (
        <span className="font-medium text-gray-900">{item.name}</span>
      ),
    },
    {
      key: "category",
      header: "دسته‌بندی",
      sortable: true,
      render: (item) => (
        <span className="text-sm text-gray-600">{item.category}</span>
      ),
    },
    {
      key: "rating",
      header: "امتیاز",
      sortable: true,
      render: (item) => <StarRating rating={item.rating} />,
    },
    {
      key: "totalOrders",
      header: "تعداد سفارشات",
      sortable: true,
      render: (item) => (
        <span className="text-sm text-gray-700">
          {toPersianNumber(item.totalOrders)}
        </span>
      ),
    },
    {
      key: "reliability",
      header: "قابلیت اطمینان",
      sortable: true,
      render: (item) => (
        <StatusBadge
          status={item.reliability}
          label={reliabilityLabels[item.reliability]}
        />
      ),
    },
    {
      key: "phone",
      header: "تلفن",
      render: (item) => (
        <span className="text-sm text-gray-600 whitespace-nowrap" dir="ltr">
          {toPersianNumber(item.phone)}
        </span>
      ),
    },
    {
      key: "email",
      header: "ایمیل",
      render: (item) => (
        <span className="text-xs text-gray-600" dir="ltr">
          {item.email}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6 px-3 container mx-auto">
      <PageHeader title="تامین‌کنندگان" Icon={Users} />

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="جستجوی تامین‌کننده..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9"
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5 self-start">
          <Button
            variant={viewMode === "card" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("card")}
            className={`h-8 px-3 cursor-pointer ${
              viewMode === "card"
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "text-gray-600"
            }`}
          >
            <LayoutGrid className="h-4 w-4 ml-1" />
            کارت
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className={`h-8 px-3 cursor-pointer ${
              viewMode === "table"
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "text-gray-600"
            }`}
          >
            <List className="h-4 w-4 ml-1" />
            جدول
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "card" ? (
        filteredSuppliers.length === 0 ? (
          <EmptyState
            icon={Users}
            title="تامین‌کننده‌ای یافت نشد"
            description="هیچ تامین‌کننده‌ای مطابق با جستجوی شما یافت نشد."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSuppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        )
      ) : (
        <DataTable<Supplier>
          data={filteredSuppliers}
          columns={tableColumns}
          searchable={false}
          pageSize={10}
          emptyIcon={Users}
          emptyTitle="تامین‌کننده‌ای یافت نشد"
          emptyDescription="هیچ تامین‌کننده‌ای ثبت نشده است."
        />
      )}
    </div>
  )
}
