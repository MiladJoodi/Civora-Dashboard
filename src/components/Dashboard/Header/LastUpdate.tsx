"use client"

import { useEffect, useState } from "react"
import { Bell, RefreshCw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function LastUpdate() {
    const [time, setTime] = useState<string | null>(null)
    const [refreshing, setRefreshing] = useState(false) // برای چرخش آیکون

    // Load اولیه
    useEffect(() => {
        const now = new Date()
        const formatter = new Intl.DateTimeFormat("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })

        const timer = setTimeout(() => {
            setTime(formatter.format(now))
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    const refreshTime = () => {
        setRefreshing(true)

        const now = new Date()
        const formatter = new Intl.DateTimeFormat("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })

        setTimeout(() => {
            setTime(formatter.format(now))
            setRefreshing(false)
        }, 1000)
    }

    return (
        <div className="flex items-center gap-1 text-gray-600 bg-gray-100 px-1 py-1 rounded-lg text-sm w-max shadow-sm">
            <Bell className="w-4 h-4 text-blue-500" />
            <span className="hidden sm:block">آخرین بروزرسانی:</span>

            <span className="min-w-[2.5rem] text-blue-600">
                {time ? time : (
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                )}
            </span>

            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={refreshTime}
                        className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-blue-500 cursor-pointer"
                    >
                        <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                    </button>
                </TooltipTrigger>
                <TooltipContent className="bg-orange-100/50 text-[#da8439] border border-orange-300 shadow-md">
                    بروزرسانی
                </TooltipContent>
            </Tooltip>

        </div>
    )
}
