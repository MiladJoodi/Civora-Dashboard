"use client"

import { useEffect, useState } from "react"
import { Clock3, RefreshCw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

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
        <Badge className={`inline-flex items-center gap-2 rounded-md border border-orange-200 bg-orange-50 text-xs text-orange-700 shadow-sm hover:shadow transition ${className}`}>
            <span className="relative flex items-center">
                {justUpdated && (
                    <span className="absolute -right-1 inline-flex h-2 w-2 animate-ping rounded-full bg-orange-400"></span>
                )}
            </span>
            <span className="hidden sm:block text-orange-700">آخرین بروزرسانی:</span>
            <span className="min-w-[2.75rem] tabular-nums font-medium text-orange-700">
                {time ? time : (
                    <span className="inline-block w-4 h-4 border-2 border-orange-500/60 border-t-transparent rounded-full animate-spin" />
                )}
            </span>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={refreshTime}
                        aria-label="بروزرسانی زمان"
                        className="w-6 h-6 rounded-full flex items-center justify-center text-orange-500 hover:text-orange-700 hover:bg-orange-100 transition cursor-pointer"
                    >
                        <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                    </button>
                </TooltipTrigger>
                <TooltipContent className="bg-orange-50 text-orange-700 border border-orange-200 shadow-md">
                    بروزرسانی
                </TooltipContent>
            </Tooltip>
        </Badge>
    )
}
