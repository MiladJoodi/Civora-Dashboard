export interface KPIData {
  title: string
  value: string | number
  change: number
  trend: "up" | "down" | "neutral"
  icon: string
}

export const kpiData: KPIData[] = [
  {
    title: "پروژه‌های فعال",
    value: 12,
    change: 8.5,
    trend: "up",
    icon: "Building2",
  },
  {
    title: "اعضای تیم",
    value: 48,
    change: 2.1,
    trend: "up",
    icon: "Users",
  },
  {
    title: "بودجه مصرفی",
    value: "۸۲٪",
    change: -3.2,
    trend: "down",
    icon: "Wallet",
  },
  {
    title: "رضایت مشتری",
    value: "۹۴٪",
    change: 5.8,
    trend: "up",
    icon: "ThumbsUp",
  },
]
