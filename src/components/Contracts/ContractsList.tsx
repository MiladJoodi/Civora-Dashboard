"use client"

import { useState, useMemo } from "react"
import { DataTable, Column } from "@/components/shared/DataTable/DataTable"
import { StatusBadge } from "@/components/shared/StatusBadge"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { Button } from "@/components/ui/button"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import { formatCurrency } from "@/lib/mock-helpers"
import { contracts as initialContracts, Contract } from "@/data/mock/contracts"
import { ContractDetailDialog } from "./ContractDetailDialog"
import { CreateContractDialog } from "./CreateContractDialog"
import {
  FileText,
  Plus,
  Clock,
  FileCheck,
} from "lucide-react"

interface ContractsListProps {
  statusFilter: "active" | "pending" | "completed"
}

const statusTitles: Record<string, string> = {
  active: "قراردادهای فعال",
  pending: "قراردادهای در انتظار تایید",
  completed: "قراردادهای تکمیل شده",
}

const statusDescriptions: Record<string, string> = {
  active: "لیست قراردادهای در حال اجرا",
  pending: "لیست قراردادهای در انتظار تایید و بررسی",
  completed: "لیست قراردادهای تکمیل و تحویل شده",
}

const statusIcons: Record<string, typeof FileText> = {
  active: FileText,
  pending: Clock,
  completed: FileCheck,
}

export function ContractsList({ statusFilter }: ContractsListProps) {
  const [contractsData, setContractsData] = useState<Contract[]>(initialContracts)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)

  const filteredContracts = useMemo(
    () => contractsData.filter((c) => c.status === statusFilter),
    [contractsData, statusFilter]
  )

  function handleRowClick(contract: Contract) {
    setSelectedContract(contract)
    setDetailOpen(true)
  }

  function handleCreated(newContract: Contract) {
    setContractsData((prev) => [newContract, ...prev])
  }

  const columns: Column<Contract>[] = [
    {
      key: "title",
      header: "عنوان",
      sortable: true,
      className: "min-w-[200px]",
      render: (item) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 shrink-0 text-orange-400" />
          <span className="font-medium text-gray-900">{item.title}</span>
        </div>
      ),
    },
    {
      key: "contractor",
      header: "پیمانکار",
      sortable: true,
      className: "min-w-[150px]",
      render: (item) => (
        <span className="text-gray-700">{item.contractor}</span>
      ),
    },
    {
      key: "value",
      header: "ارزش",
      sortable: true,
      className: "min-w-[140px]",
      render: (item) => (
        <span className="font-medium text-gray-900">
          {toPersianNumber(formatCurrency(item.value))}
        </span>
      ),
    },
    {
      key: "progress",
      header: "پیشرفت",
      sortable: true,
      className: "min-w-[130px]",
      render: (item) => {
        const progressColor =
          item.progress >= 75
            ? "bg-green-500"
            : item.progress >= 40
              ? "bg-orange-500"
              : item.progress > 0
                ? "bg-yellow-500"
                : "bg-gray-300"
        return (
          <div className="flex items-center gap-2">
            <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full transition-all ${progressColor}`}
                style={{ width: `${item.progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-600">
              {toPersianNumber(item.progress)}٪
            </span>
          </div>
        )
      },
    },
    {
      key: "status",
      header: "وضعیت",
      sortable: true,
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: "startDate",
      header: "تاریخ شروع",
      sortable: true,
      className: "min-w-[110px]",
      render: (item) => (
        <span className="text-gray-600">
          {toPersianNumber(item.startDate)}
        </span>
      ),
    },
  ]

  const IconComponent = statusIcons[statusFilter] ?? FileText

  return (
    <div className="space-y-6">
      <PageHeader
        title={statusTitles[statusFilter]}
        description={statusDescriptions[statusFilter]}
        Icon={IconComponent}
      />

      <DataTable<Contract>
        data={filteredContracts}
        columns={columns}
        searchable
        searchPlaceholder="جستجو در عنوان، پیمانکار یا پروژه..."
        searchKeys={["title", "contractor", "projectName"]}
        pageSize={10}
        onRowClick={handleRowClick}
        emptyTitle="قراردادی یافت نشد"
        emptyDescription="هیچ قراردادی با این وضعیت وجود ندارد."
        headerActions={
          <Button
            onClick={() => setCreateOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white"
            size="sm"
          >
            <Plus className="ml-1.5 h-4 w-4" />
            قرارداد جدید
          </Button>
        }
      />

      <ContractDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        contract={selectedContract}
      />

      <CreateContractDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={handleCreated}
      />
    </div>
  )
}
