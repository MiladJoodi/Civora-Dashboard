"use client"

import { useState } from "react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { EmptyState } from "@/components/shared/EmptyState"
import { DataTableSearch } from "@/components/shared/DataTable/DataTableSearch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ShieldCheck, Calendar, User, ClipboardList } from "lucide-react"
import { qualityInspections, type QualityInspection } from "@/data/mock/technical"
import { toPersianNumber } from "@/lib/ToPersianNumber"

const resultColors: Record<string, string> = {
  pass: "border-green-200 bg-green-50/50",
  fail: "border-red-200 bg-red-50/50",
  conditional: "border-yellow-200 bg-yellow-50/50",
}

export function QualityInspections() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<QualityInspection | null>(null)

  const filtered = qualityInspections.filter((item) => {
    if (!search) return true
    const term = search.toLowerCase()
    return (
      item.project.toLowerCase().includes(term) ||
      item.inspectionType.toLowerCase().includes(term) ||
      item.inspector.toLowerCase().includes(term)
    )
  })

  return (
    <div className="space-y-6">
      <PageHeader title="کنترل کیفیت" description="بازرسی‌ها و نتایج آزمایشات کیفی" Icon={ShieldCheck} />

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-green-200 bg-green-50/30">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-700">{toPersianNumber(qualityInspections.filter(i => i.result === "pass").length)}</p>
            <p className="text-xs text-green-600 mt-1">قبول شده</p>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50/30">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-700">{toPersianNumber(qualityInspections.filter(i => i.result === "conditional").length)}</p>
            <p className="text-xs text-yellow-600 mt-1">مشروط</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/30">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-700">{toPersianNumber(qualityInspections.filter(i => i.result === "fail").length)}</p>
            <p className="text-xs text-red-600 mt-1">رد شده</p>
          </CardContent>
        </Card>
      </div>

      <DataTableSearch value={search} onChange={setSearch} placeholder="جستجوی بازرسی..." />

      {filtered.length === 0 ? (
        <EmptyState title="بازرسی یافت نشد" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((inspection) => (
            <Card
              key={inspection.id}
              className={`cursor-pointer hover:shadow-md transition-all ${resultColors[inspection.result] ?? ""}`}
              onClick={() => setSelected(inspection)}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-mono text-gray-400">{inspection.id}</span>
                  <StatusBadge status={inspection.result} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{inspection.inspectionType}</h3>
                <p className="text-xs text-gray-600">{inspection.project}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {toPersianNumber(inspection.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {inspection.inspector}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selected?.inspectionType}</DialogTitle>
            <DialogDescription>{selected?.project} - {selected?.id}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 mt-2 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-500">بازرس:</span>
                  <p className="font-medium">{selected.inspector}</p>
                </div>
                <div>
                  <span className="text-gray-500">تاریخ:</span>
                  <p className="font-medium">{toPersianNumber(selected.date)}</p>
                </div>
                <div>
                  <span className="text-gray-500">نتیجه:</span>
                  <p><StatusBadge status={selected.result} /></p>
                </div>
                <div>
                  <span className="text-gray-500">بازرسی بعدی:</span>
                  <p className="font-medium">{toPersianNumber(selected.nextInspection)}</p>
                </div>
              </div>
              <div>
                <span className="text-gray-500">یافته‌ها:</span>
                <ul className="mt-1 space-y-1">
                  {selected.findings.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <ClipboardList className="h-3.5 w-3.5 mt-0.5 text-gray-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
