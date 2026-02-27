import { randomPersianName, randomJalaliDate, randomInt, randomItem, generateId } from "@/lib/mock-helpers"

export interface TechnicalProject {
  id: string
  name: string
  phase: "design" | "review" | "approved" | "construction" | "inspection"
  engineer: string
  drawings: number
  lastUpdate: string
  progress: number
  budget: number
  status: "active" | "completed" | "on-hold"
}

export interface TechnicalDoc {
  id: string
  title: string
  type: "drawing" | "specification" | "report" | "permit" | "certificate"
  project: string
  version: string
  uploadDate: string
  uploadedBy: string
  fileSize: string
  status: "draft" | "review" | "approved" | "archived"
}

export interface QualityInspection {
  id: string
  project: string
  inspectionType: string
  date: string
  inspector: string
  result: "pass" | "fail" | "conditional"
  findings: string[]
  nextInspection: string
  description: string
}

const projects = ["برج سیورا", "مجتمع مسکونی آریا", "پروژه تجاری پارسیان", "برج‌های دوقلو نیایش", "مجتمع ورزشی المپیک", "بیمارستان شفا", "هتل بزرگ کوروش", "مرکز خرید ستاره", "پارکینگ طبقاتی شهید بهشتی", "مجتمع آموزشی دانش"]
const docTitles = ["نقشه سازه طبقات", "مشخصات فنی بتن", "گزارش آزمایش خاک", "پروانه ساختمان", "گواهی آتش‌نشانی", "نقشه تاسیسات مکانیکی", "نقشه تاسیسات برقی", "گزارش پیشرفت فیزیکی", "دستورالعمل ایمنی", "نقشه معماری طبقات", "جزئیات اتصالات فولادی", "نقشه فونداسیون", "گزارش نظارت عالیه", "مشخصات فنی عایق", "پروتکل کنترل کیفیت"]
const inspectionTypes = ["بازرسی بتن‌ریزی", "بازرسی جوش", "آزمایش مقاومت بتن", "بازرسی آرماتوربندی", "تست نشت آب", "بازرسی سیستم اطفاء حریق", "آزمایش خاک", "بازرسی اسکلت فلزی", "تست فشار لوله‌کشی", "بازرسی عایق حرارتی", "بازرسی ایمنی کارگاه", "تست مقاومت الکتریکی"]
const findingsList = ["مطابق با استاندارد", "نیاز به اصلاح جزئی", "کیفیت بتن بالاتر از حد مطلوب", "انحراف ۲ سانتی‌متری از محور", "ضخامت پوشش آرماتور کمتر از حد مجاز", "عدم رعایت فاصله میلگردها", "کیفیت جوش قابل قبول", "نشتی در اتصالات لوله‌کشی", "عایق‌کاری ناقص", "تجهیزات ایمنی ناکافی"]

export const phaseLabels: Record<string, string> = {
  design: "طراحی",
  review: "بازبینی",
  approved: "تایید شده",
  construction: "اجرا",
  inspection: "بازرسی",
}

export const docTypeLabels: Record<string, string> = {
  drawing: "نقشه",
  specification: "مشخصات فنی",
  report: "گزارش",
  permit: "مجوز",
  certificate: "گواهی",
}

export const technicalProjects: TechnicalProject[] = projects.map((name, i) => ({
  id: `TP-${String(i + 1).padStart(3, "0")}`,
  name,
  phase: randomItem(["design", "review", "approved", "construction", "construction", "inspection"] as const),
  engineer: randomPersianName(),
  drawings: randomInt(5, 45),
  lastUpdate: randomJalaliDate(1403, 1403),
  progress: randomInt(10, 95),
  budget: randomInt(10, 500) * 1000000000,
  status: randomItem(["active", "active", "active", "completed", "on-hold"] as const),
}))

export const technicalDocs: TechnicalDoc[] = Array.from({ length: 45 }, (_, i) => ({
  id: `DOC-${String(i + 1).padStart(3, "0")}`,
  title: randomItem(docTitles),
  type: randomItem(["drawing", "drawing", "specification", "report", "report", "permit", "certificate"] as const),
  project: randomItem(projects),
  version: `${randomInt(1, 5)}.${randomInt(0, 9)}`,
  uploadDate: randomJalaliDate(1402, 1403),
  uploadedBy: randomPersianName(),
  fileSize: `${randomInt(1, 50)}.${randomInt(1, 9)} MB`,
  status: randomItem(["draft", "review", "approved", "approved", "archived"] as const),
}))

export const qualityInspections: QualityInspection[] = Array.from({ length: 25 }, (_, i) => {
  const numFindings = randomInt(1, 3)
  return {
    id: `QI-${String(i + 1).padStart(3, "0")}`,
    project: randomItem(projects),
    inspectionType: randomItem(inspectionTypes),
    date: randomJalaliDate(1403, 1403),
    inspector: randomPersianName(),
    result: randomItem(["pass", "pass", "pass", "fail", "conditional"] as const),
    findings: Array.from({ length: numFindings }, () => randomItem(findingsList)),
    nextInspection: randomJalaliDate(1403, 1403),
    description: `بازرسی ${randomItem(inspectionTypes)} در ${randomItem(projects)}`,
  }
})
