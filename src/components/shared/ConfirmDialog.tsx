"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  variant?: "danger" | "warning" | "default"
  loading?: boolean
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title = "آیا مطمئن هستید؟",
  description = "این عملیات قابل بازگشت نیست.",
  confirmLabel = "تایید",
  cancelLabel = "انصراف",
  onConfirm,
  variant = "danger",
  loading = false,
}: ConfirmDialogProps) {
  const variantStyles = {
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    default: "bg-orange-500 hover:bg-orange-600 text-white",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`rounded-full p-2 ${variant === "danger" ? "bg-red-100" : variant === "warning" ? "bg-yellow-100" : "bg-orange-100"}`}>
              <AlertTriangle className={`h-5 w-5 ${variant === "danger" ? "text-red-600" : variant === "warning" ? "text-yellow-600" : "text-orange-600"}`} />
            </div>
            <DialogTitle className="text-base">{title}</DialogTitle>
          </div>
          <DialogDescription className="mr-12 text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {cancelLabel}
          </Button>
          <Button
            className={`w-full sm:w-auto ${variantStyles[variant]}`}
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
            disabled={loading}
          >
            {loading ? "در حال انجام..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
