"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DataTableSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function DataTableSearch({
  value,
  onChange,
  placeholder = "جستجو...",
  className,
}: DataTableSearchProps) {
  const [local, setLocal] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => onChange(local), 300)
    return () => clearTimeout(timer)
  }, [local, onChange])

  useEffect(() => {
    setLocal(value)
  }, [value])

  return (
    <div className={cn("relative w-full sm:max-w-xs", className)}>
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      <Input
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="pr-9 pl-8 h-9 text-sm"
      />
      {local && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-1 top-1/2 -translate-y-1/2 h-7 w-7"
          onClick={() => {
            setLocal("")
            onChange("")
          }}
        >
          <X className="h-3.5 w-3.5 text-gray-400" />
        </Button>
      )}
    </div>
  )
}
