"use client"

import { useState } from "react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { DataTable, type Column } from "@/components/shared/DataTable/DataTable"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Briefcase } from "lucide-react"
import { technicalProjects, phaseLabels, type TechnicalProject } from "@/data/mock/technical"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import { formatCurrency } from "@/lib/mock-helpers"

export function ProjectManagement() {
  const [selected, setSelected] = useState<TechnicalProject | null>(null)

  const columns: Column<TechnicalProject >[] = [
    { key: "id", header: "شناسه", sortable: true, className: "w-24" },
    { key: "name", header: "نام پروژه", sortable: true },
    { key: "engineer", header: "مهندس مسئول" },
    {
      key: "phase",
      header: "فاز",
      render: (item) => (
        <span className="text-sm">{phaseLabels[item.phase as string] ?? item.phase}</span>
      ),
    },
    {
      key: "progress",
      header: "پیشرفت",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2 min-w-[120px]">
          <Progress value={item.progress as number} className="h-2 flex-1" />
          <span className="text-xs text-gray-500 w-8 text-left">{toPersianNumber(item.progress)}%</span>
        </div>
      ),
    },
    {
      key: "drawings",
      header: "نقشه‌ها",
      sortable: true,
      render: (item) => <span className="text-sm">{toPersianNumber(item.drawings)}</span>,
    },
    { key: "lastUpdate", header: "آخرین بروزرسانی", sortable: true },
    {
      key: "status",
      header: "وضعیت",
      render: (item) => <StatusBadge status={item.status as string} />,
    },
  ]

  const data = technicalProjects

  return (
    <div className="space-y-6">
      <PageHeader title="مدیریت پروژه" description="مشاهده و مدیریت پروژه‌های فنی" Icon={Briefcase} />

      <DataTable
        data={data}
        columns={columns}
        searchPlaceholder="جستجوی پروژه..."
        searchKeys={["name", "engineer"]}
        pageSize={10}
        onRowClick={(item) => setSelected(item as unknown as TechnicalProject)}
      />

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>
            <DialogDescription>شناسه: {selected?.id}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 mt-2 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-500">مهندس مسئول:</span>
                  <p className="font-medium">{selected.engineer}</p>
                </div>
                <div>
                  <span className="text-gray-500">فاز:</span>
                  <p className="font-medium">{phaseLabels[selected.phase]}</p>
                </div>
                <div>
                  <span className="text-gray-500">تعداد نقشه‌ها:</span>
                  <p className="font-medium">{toPersianNumber(selected.drawings)}</p>
                </div>
                <div>
                  <span className="text-gray-500">بودجه:</span>
                  <p className="font-medium">{toPersianNumber(formatCurrency(selected.budget))}</p>
                </div>
              </div>
              <div>
                <span className="text-gray-500">پیشرفت:</span>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={selected.progress} className="h-2.5 flex-1" />
                  <span className="text-xs font-medium">{toPersianNumber(selected.progress)}%</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
