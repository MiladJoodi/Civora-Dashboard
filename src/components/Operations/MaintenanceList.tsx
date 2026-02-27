"use client"

import { useState } from "react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { DataTable, type Column } from "@/components/shared/DataTable/DataTable"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Wrench } from "lucide-react"
import { maintenanceTasks, typeLabels, type MaintenanceTask } from "@/data/mock/operations"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import { formatCurrency } from "@/lib/mock-helpers"

export function MaintenanceList() {
  const [selected, setSelected] = useState<MaintenanceTask | null>(null)

  const columns: Column<MaintenanceTask >[] = [
    { key: "id", header: "شناسه", sortable: true, className: "w-24" },
    { key: "equipment", header: "تجهیزات", sortable: true },
    {
      key: "type",
      header: "نوع",
      render: (item) => (
        <span className="text-sm">{typeLabels[item.type as string] ?? item.type}</span>
      ),
    },
    {
      key: "priority",
      header: "اولویت",
      render: (item) => <StatusBadge status={item.priority as string} />,
    },
    { key: "scheduledDate", header: "تاریخ برنامه‌ریزی", sortable: true },
    { key: "assignee", header: "مسئول" },
    {
      key: "cost",
      header: "هزینه",
      sortable: true,
      render: (item) => (
        <span className="text-sm font-medium">{toPersianNumber(formatCurrency(item.cost as number))}</span>
      ),
    },
    {
      key: "status",
      header: "وضعیت",
      render: (item) => <StatusBadge status={item.status as string} />,
    },
  ]

  const data = maintenanceTasks

  return (
    <div className="space-y-6">
      <PageHeader title="نگهداری و تعمیرات" description="برنامه‌ریزی و پیگیری تعمیرات تجهیزات" Icon={Wrench} />

      <DataTable
        data={data}
        columns={columns}
        searchPlaceholder="جستجوی تجهیزات..."
        searchKeys={["equipment", "assignee"]}
        pageSize={10}
        onRowClick={(item) => setSelected(item as unknown as MaintenanceTask)}
      />

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>جزئیات تعمیرات {selected?.id}</DialogTitle>
            <DialogDescription>{selected?.equipment}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 mt-2 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-500">نوع:</span>
                  <p className="font-medium">{typeLabels[selected.type]}</p>
                </div>
                <div>
                  <span className="text-gray-500">اولویت:</span>
                  <p><StatusBadge status={selected.priority} /></p>
                </div>
                <div>
                  <span className="text-gray-500">تاریخ برنامه‌ریزی:</span>
                  <p className="font-medium">{toPersianNumber(selected.scheduledDate)}</p>
                </div>
                <div>
                  <span className="text-gray-500">مسئول:</span>
                  <p className="font-medium">{selected.assignee}</p>
                </div>
                <div>
                  <span className="text-gray-500">هزینه:</span>
                  <p className="font-medium">{toPersianNumber(formatCurrency(selected.cost))}</p>
                </div>
                <div>
                  <span className="text-gray-500">وضعیت:</span>
                  <p><StatusBadge status={selected.status} /></p>
                </div>
              </div>
              <div>
                <span className="text-gray-500">توضیحات:</span>
                <p className="mt-1 text-gray-700">{selected.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
