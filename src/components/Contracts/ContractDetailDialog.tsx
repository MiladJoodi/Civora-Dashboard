"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import { formatCurrency } from "@/lib/mock-helpers"
import { Contract, contractTypeLabels } from "@/data/mock/contracts"
import {
  Calendar,
  Building2,
  User,
  FileText,
  TrendingUp,
  Paperclip,
  ClipboardList,
} from "lucide-react"

interface ContractDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contract: Contract | null
}

export function ContractDetailDialog({
  open,
  onOpenChange,
  contract,
}: ContractDetailDialogProps) {
  if (!contract) return null

  const progressColor =
    contract.progress >= 75
      ? "bg-green-500"
      : contract.progress >= 40
        ? "bg-orange-500"
        : contract.progress > 0
          ? "bg-yellow-500"
          : "bg-gray-300"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {contract.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            جزئیات قرارداد
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Status and Type Row */}
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={contract.status} />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              <ClipboardList className="h-3 w-3" />
              {contractTypeLabels[contract.type]}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Contractor */}
            <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <User className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
              <div>
                <p className="text-xs text-gray-500">پیمانکار</p>
                <p className="text-sm font-medium text-gray-900">
                  {contract.contractor}
                </p>
              </div>
            </div>

            {/* Project */}
            <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
              <div>
                <p className="text-xs text-gray-500">پروژه</p>
                <p className="text-sm font-medium text-gray-900">
                  {contract.projectName}
                </p>
              </div>
            </div>

            {/* Value */}
            <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
              <div>
                <p className="text-xs text-gray-500">ارزش قرارداد</p>
                <p className="text-sm font-medium text-gray-900">
                  {toPersianNumber(formatCurrency(contract.value))}
                </p>
              </div>
            </div>

            {/* Attachments */}
            <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <Paperclip className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
              <div>
                <p className="text-xs text-gray-500">پیوست‌ها</p>
                <p className="text-sm font-medium text-gray-900">
                  {toPersianNumber(contract.attachments)} فایل
                </p>
              </div>
            </div>

            {/* Start Date */}
            <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
              <div>
                <p className="text-xs text-gray-500">تاریخ شروع</p>
                <p className="text-sm font-medium text-gray-900">
                  {toPersianNumber(contract.startDate)}
                </p>
              </div>
            </div>

            {/* End Date */}
            <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
              <div>
                <p className="text-xs text-gray-500">تاریخ پایان</p>
                <p className="text-sm font-medium text-gray-900">
                  {toPersianNumber(contract.endDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">
                  پیشرفت قرارداد
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                {toPersianNumber(contract.progress)}٪
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full transition-all ${progressColor}`}
                style={{ width: `${contract.progress}%` }}
              />
            </div>
          </div>

          {/* Last Update */}
          <div className="text-xs text-gray-400">
            آخرین بروزرسانی: {toPersianNumber(contract.lastUpdate)}
          </div>

          {/* Description */}
          <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <p className="mb-1 text-xs font-medium text-gray-500">توضیحات</p>
            <p className="text-sm leading-6 text-gray-700">
              {contract.description}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
