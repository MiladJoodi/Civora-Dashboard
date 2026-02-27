import { BarChart3, Users, FileText, MessageSquare } from "lucide-react"
import { TrendingUp, TrendingDown } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface StatItem {
    title: string
    value: string
    icon: LucideIcon
    color: string
    change: number
    trend: "up" | "down"
    trendIcon: LucideIcon
}

export const stats: StatItem[] = [
    {
        title: "پروژه‌های فعال",
        value: "12",
        icon: BarChart3,
        color: "text-blue-600",
        change: 8.5,
        trend: "up",
        trendIcon: TrendingUp,
    },
    {
        title: "اعضای تیم",
        value: "48",
        icon: Users,
        color: "text-green-600",
        change: 2.1,
        trend: "up",
        trendIcon: TrendingUp,
    },
    {
        title: "قراردادهای جاری",
        value: "8",
        icon: FileText,
        color: "text-orange-600",
        change: -3.2,
        trend: "down",
        trendIcon: TrendingDown,
    },
    {
        title: "پیام‌های جدید",
        value: "24",
        icon: MessageSquare,
        color: "text-purple-600",
        change: 5.8,
        trend: "up",
        trendIcon: TrendingUp,
    },
]
