"use client"

import { useMemo } from "react"
import { DataTable, type Column } from "@/components/shared/DataTable/DataTable"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { transactions, type Transaction } from "@/data/mock/transactions"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import { formatCurrency } from "@/lib/mock-helpers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Receipt } from "lucide-react"

type TransactionRow = Transaction

const transactionStatusLabels: Record<string, string> = {
  completed: "تکمیل شده",
  pending: "در انتظار",
  cancelled: "لغو شده",
}

const typeLabels: Record<string, string> = {
  income: "درآمد",
  expense: "هزینه",
}

export default function TransactionTable() {
  const data = useMemo<TransactionRow[]>(
    () => transactions.slice(0, 50) as TransactionRow[],
    []
  )

  const columns = useMemo<Column<TransactionRow>[]>(
    () => [
      {
        key: "id",
        header: "شناسه",
        className: "w-20 text-xs",
        render: (item: TransactionRow) => (
          <span className="text-xs text-gray-400 font-mono" dir="ltr">
            {toPersianNumber(String(item.id).slice(-6))}
          </span>
        ),
      },
      {
        key: "description",
        header: "شرح",
        sortable: true,
        render: (item: TransactionRow) => (
          <span className="text-sm text-gray-800 font-medium">
            {item.description}
          </span>
        ),
      },
      {
        key: "amount",
        header: "مبلغ",
        sortable: true,
        render: (item: TransactionRow) => (
          <span
            className={`text-sm font-semibold ${
              item.type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {item.type === "income" ? "+" : "-"}
            {toPersianNumber(formatCurrency(item.amount))}
          </span>
        ),
      },
      {
        key: "type",
        header: "نوع",
        render: (item: TransactionRow) => (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              item.type === "income"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {typeLabels[item.type]}
          </span>
        ),
      },
      {
        key: "date",
        header: "تاریخ",
        sortable: true,
        render: (item: TransactionRow) => (
          <span className="text-sm text-gray-500">
            {toPersianNumber(item.date)}
          </span>
        ),
      },
      {
        key: "status",
        header: "وضعیت",
        render: (item: TransactionRow) => (
          <StatusBadge
            status={item.status}
            label={transactionStatusLabels[item.status]}
          />
        ),
      },
    ],
    []
  )

  return (
    <Card className="overflow-hidden rounded-xl border border-orange-100 bg-white/60 backdrop-blur-md shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm sm:text-base font-semibold text-gray-700">
          آخرین تراکنش‌ها
        </CardTitle>
        <Receipt className="h-5 w-5 text-orange-500" />
      </CardHeader>
      <CardContent>
        <DataTable<TransactionRow>
          data={data}
          columns={columns}
          searchable={true}
          searchPlaceholder="جستجو در تراکنش‌ها..."
          searchKeys={["description", "project", "category"]}
          pageSize={8}
          emptyTitle="تراکنشی یافت نشد"
          emptyDescription="هیچ تراکنشی با معیارهای جستجو مطابقت ندارد"
        />
      </CardContent>
    </Card>
  )
}
