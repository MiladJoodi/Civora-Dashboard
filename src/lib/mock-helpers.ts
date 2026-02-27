// Helper utilities for generating mock data

let idCounter = 1000

export function generateId(): string {
  return `id-${++idCounter}-${Math.random().toString(36).substring(2, 7)}`
}

// Persian first names
const firstNames = [
  "علی", "محمد", "حسین", "رضا", "مهدی", "امیر", "سعید", "حمید", "فرهاد", "بهرام",
  "سارا", "مریم", "فاطمه", "زهرا", "نرگس", "مینا", "لیلا", "شیما", "نازنین", "پریسا",
  "احمد", "جواد", "کامران", "پویا", "آرش", "نیما", "سینا", "دانیال", "یاسر", "عباس",
  "الهام", "سمیرا", "آزاده", "هانیه", "ریحانه", "مهسا", "غزاله", "سپیده", "شقایق", "نسیم",
]

const lastNames = [
  "محمدی", "احمدی", "رضایی", "حسینی", "کریمی", "موسوی", "هاشمی", "عباسی", "نوری", "صادقی",
  "جعفری", "میرزایی", "رحیمی", "فرهادی", "بهرامی", "تقوی", "سلطانی", "یزدانی", "خانی", "پورمحمدی",
  "کاظمی", "صفری", "نجفی", "طاهری", "قاسمی", "دهقانی", "مرادی", "حیدری", "اکبری", "شریفی",
]

export function randomPersianName(): string {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)]
  const last = lastNames[Math.floor(Math.random() * lastNames.length)]
  return `${first} ${last}`
}

export function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generate a Jalali date string in format "1403/MM/DD"
export function randomJalaliDate(yearStart = 1402, yearEnd = 1403): string {
  const year = randomInt(yearStart, yearEnd)
  const month = randomInt(1, 12)
  const maxDay = month <= 6 ? 31 : month <= 11 ? 30 : 29
  const day = randomInt(1, maxDay)
  return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`
}

export function formatJalaliDate(date: string): string {
  return date // Already in Jalali format
}

// Simulate async delay
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Format large numbers with comma separator (Persian style)
export function formatNumber(num: number): string {
  return num.toLocaleString("fa-IR")
}

// Format currency (Rial)
export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("fa-IR")} ریال`
}

// Get initials from Persian name (first letter)
export function getInitials(name: string): string {
  return name.charAt(0)
}
