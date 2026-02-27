"use client"

import type { LucideIcon } from "lucide-react"
import { Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: LucideIcon
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon = Inbox,
  title = "موردی یافت نشد",
  description = "هیچ داده‌ای برای نمایش وجود ندارد.",
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="mb-4 rounded-full bg-orange-50 p-4">
        <Icon className="h-8 w-8 text-orange-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
          size="sm"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
