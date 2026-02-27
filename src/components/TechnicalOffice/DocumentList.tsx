"use client"

import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { DataTable, type Column } from "@/components/shared/DataTable/DataTable"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Badge } from "@/components/ui/badge"
import { FolderOpen, FileText, FileImage, FileBadge, FileCheck2, ScrollText } from "lucide-react"
import { technicalDocs, docTypeLabels, type TechnicalDoc } from "@/data/mock/technical"
import { toPersianNumber } from "@/lib/ToPersianNumber"

const typeIcons: Record<string, React.ElementType> = {
  drawing: FileImage,
  specification: ScrollText,
  report: FileText,
  permit: FileBadge,
  certificate: FileCheck2,
}

export function DocumentList() {
  const columns: Column<TechnicalDoc>[] = [
    { key: "id", header: "شناسه", sortable: true, className: "w-28" },
    {
      key: "title",
      header: "عنوان",
      sortable: true,
      render: (item) => {
        const IconComp = typeIcons[item.type as string] ?? FileText
        return (
          <div className="flex items-center gap-2">
            <IconComp className="h-4 w-4 text-orange-500 shrink-0" />
            <span className="text-sm truncate max-w-[200px]">{item.title as string}</span>
          </div>
        )
      },
    },
    {
      key: "type",
      header: "نوع",
      render: (item) => (
        <Badge variant="outline" className="text-xs">
          {docTypeLabels[item.type as string] ?? item.type}
        </Badge>
      ),
    },
    { key: "project", header: "پروژه", sortable: true },
    {
      key: "version",
      header: "نسخه",
      render: (item) => <span className="text-sm font-mono">{toPersianNumber(item.version)}</span>,
    },
    { key: "uploadDate", header: "تاریخ بارگذاری", sortable: true },
    { key: "uploadedBy", header: "بارگذاری توسط" },
    { key: "fileSize", header: "حجم" },
    {
      key: "status",
      header: "وضعیت",
      render: (item) => <StatusBadge status={item.status as string} />,
    },
  ]

  const data = technicalDocs

  return (
    <div className="space-y-6">
      <PageHeader title="اسناد فنی" description="مدیریت نقشه‌ها، مشخصات فنی و گزارشات" Icon={FolderOpen} />

      <DataTable
        data={data}
        columns={columns}
        searchPlaceholder="جستجوی سند..."
        searchKeys={["title", "project", "uploadedBy"]}
        pageSize={12}
      />
    </div>
  )
}
