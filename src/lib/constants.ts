// Persian month names (Jalali/Solar Hijri calendar)
export const persianMonths = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
] as const

// Role labels
export const roleLabels: Record<string, string> = {
  admin: "مدیر سیستم",
  manager: "مدیر پروژه",
  engineer: "مهندس",
  viewer: "ناظر",
  foreman: "سرکارگر",
  operator: "اپراتور",
  technician: "تکنسین",
  accountant: "حسابدار",
  safety: "مسئول ایمنی",
  architect: "معمار",
}

// Department labels
export const departmentLabels: Record<string, string> = {
  management: "مدیریت",
  engineering: "مهندسی",
  operations: "عملیات",
  warehouse: "انبار",
  finance: "مالی",
  safety: "ایمنی",
  quality: "کنترل کیفیت",
  technical: "دفتر فنی",
}

// Status color mapping (for use with Tailwind classes)
export const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  active: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  "in-progress": { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  pending: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
  completed: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
  cancelled: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  draft: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500" },
  approved: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  rejected: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  open: { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500" },
  resolved: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
  high: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  medium: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
  low: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  pass: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  fail: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  conditional: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
  available: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  "low-stock": { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
  "out-of-stock": { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  "on-leave": { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
  inactive: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" },
}

// Status Persian labels
export const statusLabels: Record<string, string> = {
  active: "فعال",
  "in-progress": "در حال انجام",
  pending: "در انتظار",
  completed: "تکمیل شده",
  cancelled: "لغو شده",
  draft: "پیش‌نویس",
  approved: "تایید شده",
  rejected: "رد شده",
  open: "باز",
  resolved: "حل شده",
  submitted: "ارسال شده",
  planned: "برنامه‌ریزی شده",
  delivered: "تحویل داده شده",
  shipped: "ارسال شده",
  high: "بالا",
  medium: "متوسط",
  low: "پایین",
  pass: "قبول",
  fail: "رد",
  conditional: "مشروط",
  available: "موجود",
  "low-stock": "کم‌موجود",
  "out-of-stock": "ناموجود",
  "on-leave": "مرخصی",
  inactive: "غیرفعال",
}

// Priority labels
export const priorityLabels: Record<string, string> = {
  high: "بالا",
  medium: "متوسط",
  low: "پایین",
  critical: "بحرانی",
}

// Breadcrumb route-to-label mapping
export const routeLabels: Record<string, string> = {
  "": "صفحه اصلی",
  "assistant": "دستیار",
  "ai-chat": "چت هوشمند",
  "help-desk": "میز کمک",
  "team-chat": "چت تیمی",
  "channels": "کانال‌ها",
  "direct": "پیام‌های مستقیم",
  "contracts": "قراردادها",
  "active": "فعال",
  "pending": "در انتظار",
  "completed": "تکمیل شده",
  "operations": "عملیات",
  "daily": "روزانه",
  "maintenance": "نگهداری",
  "technical-office": "دفتر فنی",
  "projects": "پروژه‌ها",
  "docs": "اسناد",
  "quality": "کنترل کیفیت",
  "reports": "گزارشات",
  "weekly": "هفتگی",
  "monthly": "ماهانه",
  "news": "اخبار",
  "company": "شرکت",
  "industry": "صنعت",
  "warehouse": "انبار",
  "inventory": "موجودی",
  "orders": "سفارشات",
  "suppliers": "تامین‌کنندگان",
  "settings": "تنظیمات",
  "profile": "پروفایل",
  "system": "سیستم",
  "permissions": "مجوزها",
  "login": "ورود",
}
