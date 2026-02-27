import {
  generateId,
  randomPersianName,
  randomItem,
  randomInt,
} from "@/lib/mock-helpers"

export interface ActivityItem {
  id: string
  user: string
  action: string
  type: "project" | "document" | "contract" | "warehouse" | "system"
  timestamp: string
  icon: string
}

const activityTemplates: Record<ActivityItem["type"], { actions: string[]; icons: string[] }> = {
  project: {
    actions: [
      "پروژه برج مسکونی آفتاب را به‌روزرسانی کرد",
      "گزارش پیشرفت پروژه ستاره را ثبت کرد",
      "وضعیت پروژه بیمارستان را به «در حال اجرا» تغییر داد",
      "فاز دوم پروژه پارکینگ را آغاز کرد",
      "جلسه هماهنگی پروژه بزرگراه را ثبت کرد",
      "برنامه زمان‌بندی پروژه مدرسه را تنظیم کرد",
      "نقشه‌های اجرایی پروژه اداری را بارگذاری کرد",
      "درخواست تمدید مهلت پروژه گلستان را ارسال کرد",
      "بازدید میدانی از پروژه پل عابر انجام داد",
      "آزمایش بتن پروژه مسجد را ثبت کرد",
      "صورت‌وضعیت شماره ۵ پروژه کارخانه را ارسال کرد",
      "تغییرات طراحی پروژه مرکز خرید را اعمال کرد",
      "گزارش ماهانه پروژه برج آفتاب را تهیه کرد",
      "مشکل فنی پروژه بزرگراه را گزارش کرد",
      "تاییدیه فاز سه پروژه ستاره را دریافت کرد",
    ],
    icons: ["Building2", "Hammer", "HardHat", "ClipboardCheck"],
  },
  document: {
    actions: [
      "نقشه معماری طبقه سوم را بارگذاری کرد",
      "قرارداد جدید پیمانکار را آپلود کرد",
      "مستندات ایمنی را به‌روزرسانی کرد",
      "صورت‌جلسه جلسه هفتگی را ثبت کرد",
      "نقشه سازه‌ای فونداسیون را ارسال کرد",
      "فایل مشخصات فنی مصالح را اضافه کرد",
      "گزارش آزمایشگاه خاک را بارگذاری کرد",
      "دستورالعمل اجرایی جدید را منتشر کرد",
      "نامه اداری به کارفرما را ارسال کرد",
      "مدارک بیمه‌ای کارگران را به‌روزرسانی کرد",
      "نقشه تاسیسات مکانیکی را تایید کرد",
      "مستندات تغییرات طراحی را آرشیو کرد",
    ],
    icons: ["FileText", "Upload", "File", "FolderOpen"],
  },
  contract: {
    actions: [
      "قرارداد جدید با پیمانکار اسکلت را ثبت کرد",
      "الحاقیه قرارداد تاسیسات را اضافه کرد",
      "وضعیت قرارداد نمای ساختمان را تایید کرد",
      "پیش‌فاکتور تجهیزات ایمنی را بررسی کرد",
      "قرارداد خرید مصالح ساختمانی را نهایی کرد",
      "مناقصه پیمانکار فاز دو را منتشر کرد",
      "قرارداد اجاره جرثقیل را تمدید کرد",
      "صورت‌وضعیت پیمانکار برق را تایید کرد",
      "ضمانت‌نامه بانکی پیمانکار را ثبت کرد",
      "تسویه حساب قرارداد قبلی را انجام داد",
    ],
    icons: ["FileSignature", "ScrollText", "Handshake", "Receipt"],
  },
  warehouse: {
    actions: [
      "موجودی سیمان را به‌روزرسانی کرد",
      "درخواست خرید ۵۰ تن میلگرد را ثبت کرد",
      "رسید ورود آجر به انبار را صادر کرد",
      "حواله خروج تیرآهن را تایید کرد",
      "گزارش موجودی انبار مرکزی را تهیه کرد",
      "درخواست خرید لوله و اتصالات را ارسال کرد",
      "بازرسی کیفی مصالح ورودی را انجام داد",
      "انتقال مصالح به کارگاه شماره ۳ را ثبت کرد",
      "سفارش خرید کاشی و سرامیک را تایید کرد",
      "شمارش فیزیکی انبار ابزارآلات را انجام داد",
      "کالای آسیب‌دیده را گزارش کرد",
      "حواله خروج رنگ و چسب را صادر کرد",
    ],
    icons: ["Package", "Warehouse", "Boxes", "PackageCheck"],
  },
  system: {
    actions: [
      "دسترسی کاربر جدید را تنظیم کرد",
      "تنظیمات سیستم را به‌روزرسانی کرد",
      "پشتیبان‌گیری از اطلاعات را انجام داد",
      "رمز عبور خود را تغییر داد",
      "نقش کاربر جدید را تعریف کرد",
      "وارد سیستم شد",
      "گزارش عملکرد ماهانه را دریافت کرد",
      "اطلاعیه جدید برای تیم ارسال کرد",
      "تنظیمات اعلان‌ها را تغییر داد",
      "پروفایل کاربری خود را ویرایش کرد",
    ],
    icons: ["Settings", "Shield", "Database", "UserCog"],
  },
}

const types: ActivityItem["type"][] = [
  "project",
  "document",
  "contract",
  "warehouse",
  "system",
]

function generateTimestamp(index: number): string {
  const baseYear = 1403
  const baseMonth = 8
  const totalMinutes = index * randomInt(15, 180)
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)

  const day = Math.max(1, 29 - totalDays % 29)
  const monthOffset = Math.floor(totalDays / 30)
  const month = Math.max(1, baseMonth - monthOffset)

  const hour = randomInt(7, 19)
  const minute = randomInt(0, 59)

  const monthStr = String(month).padStart(2, "0")
  const dayStr = String(day).padStart(2, "0")
  const hourStr = String(hour).padStart(2, "0")
  const minuteStr = String(minute).padStart(2, "0")

  return `${baseYear}/${monthStr}/${dayStr} - ${hourStr}:${minuteStr}`
}

function generateActivities(count: number): ActivityItem[] {
  const activities: ActivityItem[] = []

  for (let i = 0; i < count; i++) {
    const type = randomItem(types)
    const template = activityTemplates[type]
    const action = randomItem(template.actions)
    const icon = randomItem(template.icons)

    activities.push({
      id: generateId(),
      user: randomPersianName(),
      action,
      type,
      timestamp: generateTimestamp(i),
      icon,
    })
  }

  return activities
}

export const activityLog: ActivityItem[] = generateActivities(120)

export const recentActivities = activityLog.slice(0, 20)
