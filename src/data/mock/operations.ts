import { randomPersianName, randomJalaliDate, randomInt, randomItem, generateId } from "@/lib/mock-helpers"

export interface DailyOperation {
  id: string
  date: string
  projectName: string
  shift: "morning" | "afternoon" | "night"
  workersCount: number
  activities: string[]
  equipment: string[]
  weather: string
  notes: string
  supervisor: string
  status: "planned" | "in-progress" | "completed" | "cancelled"
}

export interface MaintenanceTask {
  id: string
  equipment: string
  type: "preventive" | "corrective" | "emergency"
  priority: "high" | "medium" | "low"
  scheduledDate: string
  completedDate: string
  assignee: string
  status: "pending" | "in-progress" | "completed"
  description: string
  cost: number
}

const projects = ["برج سیورا", "مجتمع مسکونی آریا", "پروژه تجاری پارسیان", "برج‌های دوقلو نیایش", "مجتمع ورزشی المپیک", "بیمارستان شفا", "هتل بزرگ کوروش", "مرکز خرید ستاره"]
const activities = ["بتن‌ریزی فونداسیون", "نصب اسکلت فلزی", "سیم‌کشی برق طبقات", "لوله‌کشی فاضلاب", "نازک‌کاری طبقه سوم", "آرماتوربندی", "قالب‌بندی دیوار", "عایق‌کاری سقف", "نصب پنجره‌ها", "کف‌سازی پارکینگ", "رنگ‌آمیزی نما", "نصب آسانسور", "سنگ‌کاری لابی", "تاسیسات مکانیکی", "اجرای نمای شیشه‌ای"]
const equipmentList = ["جرثقیل برجی", "بتونیر", "بیل مکانیکی", "کمپرسور هوا", "دستگاه جوش", "پمپ بتن", "میکسر بتن", "بالابر", "اره آلومینیوم", "دریل ستونی"]
const weatherOptions = ["آفتابی", "ابری", "بارانی", "طوفانی", "مه‌آلود", "نیمه‌ابری"]
const shiftLabels = { morning: "صبح", afternoon: "عصر", night: "شب" }
const maintenanceEquipment = ["جرثقیل برجی ۱", "جرثقیل برجی ۲", "بیل مکانیکی کوماتسو", "پمپ بتن پوتزمایستر", "بتونیر ۵۰۰ لیتری", "کمپرسور اطلس‌کوپکو", "بالابر ساختمانی", "ژنراتور ۲۵۰ کیلووات", "لودر چرخ‌دار", "دامپ‌تراک", "دستگاه جوش لینکلن", "میکسر بتن سیار", "تاور کرین لیبهر"]
const maintenanceDescriptions = ["سرویس دوره‌ای روغن و فیلتر", "تعویض کابل بالابر", "تعمیر سیستم هیدرولیک", "بازرسی ایمنی سالانه", "تعویض لنت ترمز", "تعمیر موتور الکتریکی", "کالیبراسیون سیستم ایمنی", "تعویض تسمه‌های انتقال قدرت", "رفع نشتی روغن", "بازرسی سیم‌بکسل‌ها"]

export const shiftTranslations = shiftLabels

export const dailyOperations: DailyOperation[] = Array.from({ length: 35 }, (_, i) => {
  const numActivities = randomInt(2, 5)
  const numEquipment = randomInt(1, 4)
  return {
    id: `OP-${String(i + 1).padStart(3, "0")}`,
    date: randomJalaliDate(1403, 1403),
    projectName: randomItem(projects),
    shift: randomItem(["morning", "afternoon", "night"] as const),
    workersCount: randomInt(8, 45),
    activities: Array.from({ length: numActivities }, () => randomItem(activities)),
    equipment: Array.from({ length: numEquipment }, () => randomItem(equipmentList)),
    weather: randomItem(weatherOptions),
    notes: randomItem(["بدون مشکل خاص", "تاخیر ۳۰ دقیقه‌ای به دلیل بارندگی", "نیاز به تجهیزات اضافی", "عملکرد مطلوب تیم", "کمبود نیروی کار", ""]),
    supervisor: randomPersianName(),
    status: randomItem(["planned", "in-progress", "completed", "completed", "completed", "cancelled"] as const),
  }
})

export const maintenanceTasks: MaintenanceTask[] = Array.from({ length: 30 }, (_, i) => ({
  id: `MT-${String(i + 1).padStart(3, "0")}`,
  equipment: randomItem(maintenanceEquipment),
  type: randomItem(["preventive", "preventive", "corrective", "corrective", "emergency"] as const),
  priority: randomItem(["high", "medium", "medium", "low"] as const),
  scheduledDate: randomJalaliDate(1403, 1403),
  completedDate: randomItem(["", "", randomJalaliDate(1403, 1403)]),
  assignee: randomPersianName(),
  status: randomItem(["pending", "in-progress", "completed", "completed"] as const),
  description: randomItem(maintenanceDescriptions),
  cost: randomInt(5, 500) * 1000000,
}))

export const typeLabels: Record<string, string> = {
  preventive: "پیشگیرانه",
  corrective: "اصلاحی",
  emergency: "اضطراری",
}
