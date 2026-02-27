import { randomPersianName, randomJalaliDate, randomInt, randomItem } from "@/lib/mock-helpers"

export interface DailyReport {
  id: string
  date: string
  project: string
  workersPresent: number
  activitiesCompleted: string[]
  issues: string[]
  weather: string
  submittedBy: string
  status: "submitted" | "approved" | "rejected"
}

export interface WeeklyData {
  week: string
  workDays: number
  totalWorkers: number
  completionRate: number
  budget: number
  spent: number
  incidents: number
}

export interface MonthlyData {
  month: string
  revenue: number
  expense: number
  projectsCompleted: number
  newContracts: number
  teamSize: number
  satisfaction: number
}

const projects = ["برج سیورا", "مجتمع مسکونی آریا", "پروژه تجاری پارسیان", "برج‌های دوقلو نیایش", "مجتمع ورزشی المپیک", "بیمارستان شفا"]
const activities = ["بتن‌ریزی طبقه سوم", "نصب اسکلت طبقه ششم", "سیم‌کشی برق", "لوله‌کشی فاضلاب", "نازک‌کاری", "آرماتوربندی", "قالب‌بندی", "رنگ‌آمیزی", "سنگ‌کاری", "عایق‌کاری"]
const issues = ["تاخیر در تامین مصالح", "کمبود نیروی کار", "خرابی جرثقیل", "بارندگی شدید", "بدون مشکل", "نیاز به هماهنگی بیشتر", "تغییر در نقشه‌ها"]

export const dailyReports: DailyReport[] = Array.from({ length: 65 }, (_, i) => ({
  id: `DR-${String(i + 1).padStart(3, "0")}`,
  date: randomJalaliDate(1403, 1403),
  project: randomItem(projects),
  workersPresent: randomInt(10, 60),
  activitiesCompleted: Array.from({ length: randomInt(2, 4) }, () => randomItem(activities)),
  issues: randomInt(1, 3) === 1 ? [randomItem(issues)] : ["بدون مشکل"],
  weather: randomItem(["آفتابی", "ابری", "بارانی", "نیمه‌ابری"]),
  submittedBy: randomPersianName(),
  status: randomItem(["submitted", "approved", "approved", "approved", "rejected"] as const),
}))

export const weeklyData: WeeklyData[] = [
  { week: "هفته اول آبان", workDays: 6, totalWorkers: 245, completionRate: 78, budget: 12500000000, spent: 9800000000, incidents: 1 },
  { week: "هفته دوم آبان", workDays: 6, totalWorkers: 252, completionRate: 82, budget: 13000000000, spent: 10200000000, incidents: 0 },
  { week: "هفته سوم آبان", workDays: 5, totalWorkers: 238, completionRate: 75, budget: 11000000000, spent: 9500000000, incidents: 2 },
  { week: "هفته چهارم آبان", workDays: 6, totalWorkers: 260, completionRate: 85, budget: 14000000000, spent: 11500000000, incidents: 0 },
  { week: "هفته اول آذر", workDays: 6, totalWorkers: 248, completionRate: 80, budget: 12800000000, spent: 10100000000, incidents: 1 },
  { week: "هفته دوم آذر", workDays: 5, totalWorkers: 230, completionRate: 72, budget: 11500000000, spent: 9200000000, incidents: 3 },
  { week: "هفته سوم آذر", workDays: 6, totalWorkers: 255, completionRate: 88, budget: 13500000000, spent: 11000000000, incidents: 0 },
  { week: "هفته چهارم آذر", workDays: 6, totalWorkers: 262, completionRate: 90, budget: 14500000000, spent: 12000000000, incidents: 1 },
]

export const monthlyData: MonthlyData[] = [
  { month: "فروردین", revenue: 85000000000, expense: 72000000000, projectsCompleted: 1, newContracts: 3, teamSize: 220, satisfaction: 88 },
  { month: "اردیبهشت", revenue: 92000000000, expense: 78000000000, projectsCompleted: 0, newContracts: 2, teamSize: 228, satisfaction: 90 },
  { month: "خرداد", revenue: 98000000000, expense: 82000000000, projectsCompleted: 1, newContracts: 4, teamSize: 235, satisfaction: 87 },
  { month: "تیر", revenue: 105000000000, expense: 88000000000, projectsCompleted: 0, newContracts: 1, teamSize: 240, satisfaction: 91 },
  { month: "مرداد", revenue: 110000000000, expense: 95000000000, projectsCompleted: 2, newContracts: 3, teamSize: 245, satisfaction: 89 },
  { month: "شهریور", revenue: 115000000000, expense: 98000000000, projectsCompleted: 1, newContracts: 2, teamSize: 250, satisfaction: 92 },
  { month: "مهر", revenue: 120000000000, expense: 102000000000, projectsCompleted: 0, newContracts: 5, teamSize: 255, satisfaction: 93 },
  { month: "آبان", revenue: 125000000000, expense: 108000000000, projectsCompleted: 1, newContracts: 2, teamSize: 252, satisfaction: 91 },
  { month: "آذر", revenue: 118000000000, expense: 100000000000, projectsCompleted: 2, newContracts: 3, teamSize: 260, satisfaction: 94 },
  { month: "دی", revenue: 108000000000, expense: 92000000000, projectsCompleted: 0, newContracts: 1, teamSize: 248, satisfaction: 90 },
  { month: "بهمن", revenue: 112000000000, expense: 96000000000, projectsCompleted: 1, newContracts: 4, teamSize: 258, satisfaction: 92 },
  { month: "اسفند", revenue: 130000000000, expense: 110000000000, projectsCompleted: 3, newContracts: 6, teamSize: 265, satisfaction: 95 },
]
