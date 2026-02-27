"use client"

import { useState } from "react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { DataTable, type Column } from "@/components/shared/DataTable/DataTable"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Calendar, Users } from "lucide-react"
import { dailyReports, type DailyReport } from "@/data/mock/reports"
import { toPersianNumber } from "@/lib/ToPersianNumber"

export function DailyReportsList() {
  const [selected, setSelected] = useState<DailyReport | null>(null)

  const columns: Column<DailyReport>[] = [
    { key: "id", header: "شناسه", sortable: true, className: "w-24" },
    { key: "date", header: "تاریخ", sortable: true },
    { key: "project", header: "پروژه", sortable: true },
    {
      key: "workersPresent",
      header: "نیروی کار",
      sortable: true,
      render: (item) => (
        <span className="flex items-center gap-1 text-sm">
          <Users className="h-3.5 w-3.5 text-gray-400" />
          {toPersianNumber(item.workersPresent)} نفر
        </span>
      ),
    },
    { key: "weather", header: "آب و هوا" },
    { key: "submittedBy", header: "ارسال توسط" },
    {
      key: "status",
      header: "وضعیت",
      render: (item) => <StatusBadge status={item.status as string} />,
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="گزارش‌های روزانه" description="لیست گزارشات روزانه پروژه‌ها" Icon={Calendar} />

      <DataTable<DailyReport>
        data={dailyReports}
        columns={columns}
        searchPlaceholder="جستجوی گزارش..."
        searchKeys={["project", "submittedBy"]}
        pageSize={10}
        onRowClick={(item) => setSelected(item)}
      />

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>گزارش {selected?.id}</DialogTitle>
            <DialogDescription>{selected?.project} - {selected?.date}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 mt-2 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-gray-500">ارسال توسط:</span><p className="font-medium">{selected.submittedBy}</p></div>
                <div><span className="text-gray-500">نیروی حاضر:</span><p className="font-medium">{toPersianNumber(selected.workersPresent)} نفر</p></div>
                <div><span className="text-gray-500">آب و هوا:</span><p className="font-medium">{selected.weather}</p></div>
                <div><span className="text-gray-500">وضعیت:</span><p><StatusBadge status={selected.status} /></p></div>
              </div>
              <div>
                <span className="text-gray-500">فعالیت‌های انجام شده:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selected.activitiesCompleted.map((a, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{a}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-500">مشکلات:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selected.issues.map((issue, i) => (
                    <Badge key={i} variant={issue === "بدون مشکل" ? "secondary" : "destructive"} className="text-xs">{issue}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
