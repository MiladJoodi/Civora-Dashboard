"use client"

import { useState } from "react"
import { Package, Plus } from "lucide-react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { DataTable, Column } from "@/components/shared/DataTable/DataTable"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Button } from "@/components/ui/button"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import { formatCurrency } from "@/lib/mock-helpers"
import {
  inventoryItems,
  categoryLabels,
  type InventoryItem,
} from "@/data/mock/warehouse"
import { AddInventoryDialog } from "./AddInventoryDialog"

function StockBar({ stock, minStock, maxStock }: { stock: number; minStock: number; maxStock: number }) {
  const percentage = Math.min((stock / maxStock) * 100, 100)
  let barColor = "bg-green-500"
  if (stock <= minStock) {
    barColor = "bg-red-500"
  } else if (stock <= minStock * 2) {
    barColor = "bg-yellow-500"
  }

  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
        {toPersianNumber(stock)}
      </span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden min-w-[60px]">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default function InventoryList() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const columns: Column<InventoryItem>[] = [
    {
      key: "name",
      header: "نام کالا",
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
        <span className="text-sm text-gray-600">
          {categoryLabels[item.category]}
        </span>
      ),
    },
    {
      key: "stock",
      header: "موجودی",
      sortable: true,
      render: (item) => (
        <StockBar
          stock={item.stock}
          minStock={item.minStock}
          maxStock={item.maxStock}
        />
      ),
    },
    {
      key: "unit",
      header: "واحد",
      render: (item) => (
        <span className="text-sm text-gray-600">{item.unit}</span>
      ),
    },
    {
      key: "location",
      header: "موقعیت",
      sortable: true,
      render: (item) => (
        <span className="text-sm text-gray-600">{item.location}</span>
      ),
    },
    {
      key: "status",
      header: "وضعیت",
      sortable: true,
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: "unitPrice",
      header: "قیمت واحد",
      sortable: true,
      render: (item) => (
        <span className="text-sm text-gray-700 whitespace-nowrap">
          {toPersianNumber(formatCurrency(item.unitPrice))}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6 px-3 container mx-auto">
      <PageHeader title="موجودی انبار" Icon={Package} />

      <DataTable<InventoryItem>
        data={inventoryItems}
        columns={columns}
        searchable
        searchPlaceholder="جستجوی نام کالا..."
        searchKeys={["name"]}
        pageSize={12}
        emptyIcon={Package}
        emptyTitle="کالایی یافت نشد"
        emptyDescription="هیچ کالایی در انبار ثبت نشده است."
        headerActions={
          <Button
            onClick={() => setDialogOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
            size="sm"
          >
            <Plus className="h-4 w-4 ml-1" />
            افزودن کالا
          </Button>
        }
      />

      <AddInventoryDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
