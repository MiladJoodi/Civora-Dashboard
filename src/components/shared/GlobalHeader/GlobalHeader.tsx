"use client"

import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { TbMessage2 } from "react-icons/tb"
import { Breadcrumb } from "@/components/shared/Breadcrumb"

export function GlobalHeader() {
  return (
    <header className="bg-white border border-gray-200 px-4 sm:px-6 py-3 rounded-t-lg">
      <div className="flex items-center justify-between">
        {/* Right side - Dynamic Breadcrumb */}
        <div className="flex items-center min-w-0 mr-10 sm:mr-0">
          <Breadcrumb />
        </div>

        {/* Left side - Icons */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 border border-gray-200 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer shadow-sm"
          >
            <Bell className="!h-5 !w-5 text-gray-600" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="p-2 border border-gray-200 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer shadow-sm"
          >
            <TbMessage2 className="!h-5 !w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  )
}
