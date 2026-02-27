"use client"

import { useState } from "react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { DataTable, type Column } from "@/components/shared/DataTable/DataTable"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, CloudSun } from "lucide-react"
import { dailyOperations, type DailyOperation, shiftTranslations } from "@/data/mock/operations"
import { toPersianNumber } from "@/lib/ToPersianNumber"

export function DailyOperationsList() {
  const [selected, setSelected] = useState<DailyOperation | null>(null)

  const columns: Column<DailyOperation >[] = [
    { key: "id", header: "شناسه", sortable: true, className: "w-24" },
    { key: "date", header: "تاریخ", sortable: true },
    { key: "projectName", header: "پروژه", sortable: true },
    {
      key: "shift",
      header: "شیفت",
      render: (item) => (
        <Badge variant="outline" className="text-xs">
          {shiftTranslations[item.shift as keyof typeof shiftTranslations]}
        </Badge>
      ),
    },
    {
      key: "workersCount",
      header: "نیروی کار",
      sortable: true,
      render: (item) => (
        <span className="flex items-center gap-1 text-sm">
          <Users className="h-3.5 w-3.5 text-gray-400" />
          {toPersianNumber(item.workersCount)} نفر
        </span>
      ),
    },
    {
      key: "weather",
      header: "آب و هوا",
      render: (item) => (
        <span className="flex items-center gap-1 text-sm text-gray-600">
          <CloudSun className="h-3.5 w-3.5" />
          {item.weather as string}
        </span>
      ),
    },
    {
      key: "status",
      header: "وضعیت",
      render: (item) => <StatusBadge status={item.status as string} />,
    },
  ]

  const data = dailyOperations

  return (
    <div className="space-y-6">
      <PageHeader title="عملیات روزانه" description="مدیریت و پیگیری عملیات روزانه پروژه‌ها" Icon={Calendar} />

      <DataTable
        data={data}
        columns={columns}
        searchPlaceholder="جستجوی پروژه..."
        searchKeys={["projectName", "supervisor"]}
        pageSize={10}
        onRowClick={(item) => setSelected(item as unknown as DailyOperation)}
      />

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>جزئیات عملیات {selected?.id}</DialogTitle>
            <DialogDescription>{selected?.projectName} - {selected?.date}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">شیفت:</span>
                  <p className="font-medium">{shiftTranslations[selected.shift]}</p>
                </div>
                <div>
                  <span className="text-gray-500">سرپرست:</span>
                  <p className="font-medium">{selected.supervisor}</p>
                </div>
                <div>
                  <span className="text-gray-500">تعداد نیروها:</span>
                  <p className="font-medium">{toPersianNumber(selected.workersCount)} نفر</p>
                </div>
                <div>
                  <span className="text-gray-500">آب و هوا:</span>
                  <p className="font-medium">{selected.weather}</p>
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-500">فعالیت‌ها:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selected.activities.map((a, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{a}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-500">تجهیزات:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selected.equipment.map((e, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{e}</Badge>
                  ))}
                </div>
              </div>

              {selected.notes && (
                <div>
                  <span className="text-sm text-gray-500">یادداشت:</span>
                  <p className="text-sm mt-1 text-gray-700">{selected.notes}</p>
                </div>
              )}

              <div className="pt-2">
                <StatusBadge status={selected.status} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
