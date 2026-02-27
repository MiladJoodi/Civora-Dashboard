"use client"

import { cn } from "@/lib/utils"
import { statusColors, statusLabels } from "@/lib/constants"

interface StatusBadgeProps {
  status: string
  className?: string
  showDot?: boolean
  label?: string
}

export function StatusBadge({ status, className, showDot = true, label }: StatusBadgeProps) {
  const colors = statusColors[status] ?? statusColors["draft"]
  const displayLabel = label ?? statusLabels[status] ?? status

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        colors.bg,
        colors.text,
        className
      )}
    >
      {showDot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", colors.dot)} />
      )}
      {displayLabel}
    </span>
  )
}
