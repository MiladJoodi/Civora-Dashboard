"use client"

import { useEffect, useState } from "react"
import { Clock3, RefreshCw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface LastUpdateProps {
    className?: string
}

export default function LastUpdate({ className = "" }: LastUpdateProps) {
    const [time, setTime] = useState<string | null>(null)
    const [refreshing, setRefreshing] = useState(false)
    const [justUpdated, setJustUpdated] = useState(false)

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
        }, 300)

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
            setJustUpdated(true)
            setTimeout(() => setJustUpdated(false), 1500)
        }, 700)
    }

    return (
        <div className={`inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 backdrop-blur px-2 py-1 text-xs text-gray-600 shadow-sm hover:shadow transition ${className}`}>
            <span className="relative flex items-center">
                <Clock3 className="w-4 h-4 text-blue-500" />
                {justUpdated && (
                    <span className="absolute -right-1 -top-0.5 inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400"></span>
                )}
            </span>
            <span className="text-gray-700">آخرین بروزرسانی:</span>

            <span className="min-w-[2.75rem] tabular-nums font-medium text-blue-600">
                {time ? time : (
                    <span className="inline-block w-4 h-4 border-2 border-blue-500/60 border-t-transparent rounded-full animate-spin" />
                )}
            </span>

            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={refreshTime}
                        aria-label="بروزرسانی زمان"
                        className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
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
