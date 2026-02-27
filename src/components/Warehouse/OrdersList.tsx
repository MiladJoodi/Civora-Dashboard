"use client"

import { useState } from "react"
import { ShoppingCart, Plus } from "lucide-react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { DataTable, Column } from "@/components/shared/DataTable/DataTable"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Button } from "@/components/ui/button"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import { formatCurrency } from "@/lib/mock-helpers"
import {
  warehouseOrders,
  type WarehouseOrder,
} from "@/data/mock/warehouse"
import { CreateOrderDialog } from "./CreateOrderDialog"

export default function OrdersList() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const columns: Column<WarehouseOrder>[] = [
    {
      key: "id",
      header: "شناسه",
      render: (item) => (
        <span className="text-xs font-mono text-gray-500 whitespace-nowrap">
          {toPersianNumber(item.id.slice(0, 12))}
        </span>
      ),
    },
    {
      key: "items",
      header: "اقلام",
      render: (item) => (
        <div className="max-w-[200px]">
          <span className="text-sm text-gray-900 line-clamp-2">{item.items}</span>
        </div>
      ),
    },
    {
      key: "supplier",
      header: "تامین‌کننده",
      sortable: true,
      render: (item) => (
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          {item.supplier}
        </span>
      ),
    },
    {
      key: "totalAmount",
      header: "مبلغ",
      sortable: true,
      render: (item) => (
        <span className="text-sm text-gray-700 whitespace-nowrap">
          {toPersianNumber(formatCurrency(item.totalAmount))}
        </span>
      ),
    },
    {
      key: "orderDate",
      header: "تاریخ سفارش",
      sortable: true,
      render: (item) => (
        <span className="text-sm text-gray-600 whitespace-nowrap">
          {toPersianNumber(item.orderDate)}
        </span>
      ),
    },
    {
      key: "deliveryDate",
      header: "تاریخ تحویل",
      sortable: true,
      render: (item) => (
        <span className="text-sm text-gray-600 whitespace-nowrap">
          {toPersianNumber(item.deliveryDate)}
        </span>
      ),
    },
    {
      key: "priority",
      header: "اولویت",
      sortable: true,
      render: (item) => <StatusBadge status={item.priority} />,
    },
    {
      key: "status",
      header: "وضعیت",
      sortable: true,
      render: (item) => <StatusBadge status={item.status} />,
    },
  ]

  return (
    <div className="space-y-6 px-3 container mx-auto">
      <PageHeader title="سفارشات" Icon={ShoppingCart} />

      <DataTable<WarehouseOrder>
        data={warehouseOrders}
        columns={columns}
        searchable
        searchPlaceholder="جستجوی تامین‌کننده یا اقلام..."
        searchKeys={["supplier", "items"]}
        pageSize={10}
        emptyIcon={ShoppingCart}
        emptyTitle="سفارشی یافت نشد"
        emptyDescription="هنوز هیچ سفارشی ثبت نشده است."
        headerActions={
          <Button
            onClick={() => setDialogOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
            size="sm"
          >
            <Plus className="h-4 w-4 ml-1" />
            ثبت سفارش
          </Button>
        }
      />

      <CreateOrderDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
