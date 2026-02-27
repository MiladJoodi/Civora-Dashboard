# Civora Dashboard

سیستم مدیریت پروژه‌های ساختمانی — داشبورد مدیریتی جامع برای تیم‌های عمرانی

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org/)

---

## درباره پروژه

Civora یک داشبورد مدیریتی SaaS برای مدیریت پروژه‌های ساختمانی است که شامل ۳۷ صفحه کامل با رابط کاربری فارسی راست‌چین (RTL) می‌باشد. این پروژه شامل سیستم احراز هویت، مدیریت قراردادها، انبارداری، عملیات، گزارش‌گیری، چت تیمی و تنظیمات کامل کاربران است.

## امکانات کلیدی

- **داشبورد اصلی** — نمودارهای تعاملی (درآمد/هزینه، وضعیت پروژه‌ها)، KPI cards، فید فعالیت و جدول تراکنش‌ها
- **مدیریت قراردادها** — لیست قراردادهای فعال/معلق/تکمیل‌شده با جستجو، مرتب‌سازی و صفحه‌بندی
- **انبارداری** — مدیریت موجودی، سفارشات و تامین‌کنندگان
- **عملیات** — عملیات روزانه و تعمیرات و نگهداری
- **دفتر فنی** — مدیریت پروژه‌ها، مستندات و بازرسی کیفیت
- **گزارش‌ها** — گزارشات روزانه، هفتگی و ماهانه با نمودارهای مقایسه‌ای
- **چت تیمی** — کانال‌ها و پیام‌های مستقیم
- **اخبار** — اخبار شرکت و صنعت
- **تنظیمات** — پروفایل، تنظیمات سیستم و مدیریت کاربران (CRUD کامل)
- **دستیار هوشمند** — چت AI و میز کمک (تیکتینگ)
- **سیستم احراز هویت** — لاگین با انتخاب نقش، محافظت مسیرها با Proxy

## پیش‌نمایش صفحات

| صفحه | مسیر | توضیح |
|------|------|-------|
| داشبورد | `/` | صفحه اصلی با نمودارها و آمار |
| ورود | `/login` | فرم ورود با انتخاب نقش |
| قراردادها | `/contracts` | هاب قراردادها + زیرصفحات |
| انبار | `/warehouse` | موجودی، سفارشات، تامین‌کنندگان |
| عملیات | `/operations` | عملیات روزانه و تعمیرات |
| دفتر فنی | `/technical-office` | پروژه‌ها، مستندات، کیفیت |
| گزارش‌ها | `/reports` | روزانه، هفتگی، ماهانه |
| چت تیمی | `/team-chat` | کانال‌ها و پیام مستقیم |
| اخبار | `/news` | اخبار شرکت و صنعت |
| تنظیمات | `/settings` | پروفایل، سیستم، مجوزها |
| دستیار | `/assistant` | چت AI و میز کمک |

## تکنولوژی‌ها

| تکنولوژی | نسخه | کاربرد |
|-----------|-------|--------|
| [Next.js](https://nextjs.org/) | 16 | فریم‌ورک React با App Router |
| [React](https://react.dev/) | 19 | کتابخانه UI |
| [TypeScript](https://www.typescriptlang.org/) | 5 | تایپ‌سیفتی |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | استایل‌دهی utility-first |
| [Radix UI](https://www.radix-ui.com/) | — | کامپوننت‌های headless (Dialog, Select, Switch, Tabs, ...) |
| [Recharts](https://recharts.org/) | 3 | نمودارهای تعاملی |
| [Lucide React](https://lucide.dev/) | — | آیکون‌ها |
| [Sonner](https://sonner.emilkowal.ski/) | 2 | نوتیفیکیشن Toast |
| [CVA](https://cva.style/) | — | مدیریت variant کامپوننت‌ها |

## ساختار پروژه

```
src/
├── app/                        # صفحات (App Router)
│   ├── layout.tsx              # لایه‌بندی اصلی (فونت، Auth، Toast)
│   ├── page.tsx                # داشبورد اصلی
│   ├── login/                  # صفحه ورود
│   ├── contracts/              # قراردادها (active, pending, completed)
│   ├── warehouse/              # انبار (inventory, orders, suppliers)
│   ├── operations/             # عملیات (daily, maintenance)
│   ├── technical-office/       # دفتر فنی (projects, docs, quality)
│   ├── reports/                # گزارش‌ها (daily, weekly, monthly)
│   ├── team-chat/              # چت تیمی (channels, direct)
│   ├── news/                   # اخبار (company, industry)
│   ├── settings/               # تنظیمات (profile, system, permissions)
│   ├── assistant/              # دستیار (ai-chat, help-desk)
│   └── projects/[id]/          # جزئیات پروژه
│
├── components/
│   ├── ui/                     # کامپوننت‌های پایه (Button, Dialog, Table, ...)
│   ├── shared/                 # کامپوننت‌های مشترک
│   │   ├── DataTable/          # جدول داده با جستجو، مرتب‌سازی، صفحه‌بندی
│   │   ├── Sidebar/            # سایدبار ناوبری
│   │   ├── GlobalHeader/       # هدر بالای صفحه
│   │   ├── Skeletons/          # اسکلتن بارگذاری صفحات
│   │   ├── PageHeader/         # هدر صفحات
│   │   ├── StatsGrid/          # گرید آمار
│   │   ├── StatusBadge.tsx     # نشان وضعیت
│   │   ├── ConfirmDialog.tsx   # دیالوگ تایید
│   │   └── EmptyState.tsx      # حالت خالی
│   ├── Dashboard/              # کامپوننت‌های داشبورد
│   ├── Contracts/              # کامپوننت‌های قراردادها
│   ├── Warehouse/              # کامپوننت‌های انبار
│   ├── Operations/             # کامپوننت‌های عملیات
│   ├── TechnicalOffice/        # کامپوننت‌های دفتر فنی
│   ├── Reports/                # کامپوننت‌های گزارش‌ها
│   ├── TeamChat/               # کامپوننت‌های چت
│   ├── News/                   # کامپوننت‌های اخبار
│   ├── Settings/               # کامپوننت‌های تنظیمات (CRUD کاربران)
│   └── Login/                  # کامپوننت‌های ورود
│
├── data/mock/                  # داده‌های نمونه
│   ├── users.ts                # ۱۵۰+ عضو تیم
│   ├── transactions.ts         # ۲۰۰+ تراکنش مالی
│   ├── contracts.ts            # ۴۰+ قرارداد
│   ├── warehouse.ts            # موجودی، سفارشات، تامین‌کنندگان
│   ├── operations.ts           # عملیات روزانه و تعمیرات
│   ├── technical.ts            # پروژه‌ها، مستندات، بازرسی
│   ├── reports.ts              # گزارشات روزانه
│   ├── revenue.ts              # داده‌های درآمد/هزینه
│   ├── chat.ts                 # کانال‌ها، مخاطبین، پیام‌ها
│   ├── news.ts                 # ۲۴ مقاله خبری
│   ├── activity-log.ts         # لاگ فعالیت‌ها
│   └── kpi.ts                  # شاخص‌های عملکرد
│
├── store/
│   └── auth-store.tsx          # Context احراز هویت
│
├── lib/
│   ├── utils.ts                # cn() و ابزارهای عمومی
│   ├── ToPersianNumber.ts      # تبدیل اعداد به فارسی
│   ├── constants.ts            # ثابت‌ها و برچسب‌ها
│   └── mock-helpers.ts         # توابع کمکی داده نمونه
│
└── proxy.ts                    # Proxy (احراز هویت مسیرها)
```

## نصب و راه‌اندازی

### پیش‌نیازها

- [Node.js](https://nodejs.org/) نسخه 18 یا بالاتر
- [npm](https://www.npmjs.com/) یا [pnpm](https://pnpm.io/) یا [yarn](https://yarnpkg.com/)

### مراحل نصب

```bash
# کلون مخزن
git clone https://github.com/your-username/civora-dashboard.git
cd civora-dashboard

# نصب وابستگی‌ها
npm install

# اجرای حالت توسعه
npm run dev

# ساخت نسخه production
npm run build

# اجرای نسخه production
npm start
```

سرور توسعه روی [http://localhost:3000](http://localhost:3000) اجرا می‌شود.

## نحوه استفاده

### ورود به سیستم

صفحه ورود (`/login`) شامل ۴ کاربر پیش‌فرض با نقش‌های مختلف است. هر ترکیب ایمیل و رمز عبور پذیرفته می‌شود:

| نام | نقش | ایمیل |
|-----|------|-------|
| علی محمدی | مدیر پروژه | ali@civora.com |
| سارا احمدی | مهندس عمران | sara@civora.com |
| رضا کریمی | سرپرست کارگاه | reza@civora.com |
| مریم حسینی | حسابدار | maryam@civora.com |

### الگوهای طراحی

- **صفحات Hub**: هر بخش یک صفحه اصلی با آمار و لینک سریع به زیرصفحات دارد
- **صفحات لیست**: از کامپوننت `DataTable` مشترک با جستجو، مرتب‌سازی و صفحه‌بندی استفاده می‌کنند
- **CRUD**: مدیریت کاربران در تنظیمات شامل ایجاد، ویرایش و حذف با دیالوگ‌های فرم و اعتبارسنجی
- **اسکلتن بارگذاری**: تمام صفحات دارای `loading.tsx` با انیمیشن shimmer هستند

### کامپوننت‌های مشترک

| کامپوننت | کاربرد |
|----------|--------|
| `DataTable<T>` | جدول جنریک با جستجو، مرتب‌سازی ستون‌ها، صفحه‌بندی، عملیات ردیف |
| `PageHeader` | هدر استاندارد صفحات با عنوان، توضیح و آیکون |
| `StatsGrid` | نمایش گرید آمار در بالای صفحات Hub |
| `StatusBadge` | نشان وضعیت رنگی (فعال، معلق، تکمیل، ...) |
| `ConfirmDialog` | دیالوگ تایید عملیات خطرناک (حذف) |
| `EmptyState` | حالت خالی با آیکون و پیام |

## قراردادهای فنی

- **RTL**: تمام صفحات راست‌چین با `dir="rtl"` و CSS logical properties
- **اعداد فارسی**: تمام اعداد از `toPersianNumber()` عبور می‌کنند
- **تاریخ**: تاریخ‌ها به فرمت شمسی (جلالی)
- **تم رنگی**: نارنجی/کهربایی به عنوان رنگ اصلی
- **فونت**: Vazirmatn از Google Fonts
- **داده‌ها**: Mock data در فایل‌ها immutable، در کامپوننت‌ها mutable (useState)
- **احراز هویت**: React Context + localStorage + Cookie + Proxy

## ساختار مسیرها (۳۷ مسیر)

```
/                           داشبورد اصلی
/login                      ورود به سیستم
/contracts                  هاب قراردادها
/contracts/active           قراردادهای فعال
/contracts/pending          قراردادهای معلق
/contracts/completed        قراردادهای تکمیل‌شده
/warehouse                  هاب انبار
/warehouse/inventory        موجودی انبار
/warehouse/orders           سفارشات
/warehouse/suppliers        تامین‌کنندگان
/operations                 هاب عملیات
/operations/daily           عملیات روزانه
/operations/maintenance     تعمیرات و نگهداری
/technical-office           هاب دفتر فنی
/technical-office/projects  مدیریت پروژه‌ها
/technical-office/docs      مستندات فنی
/technical-office/quality   بازرسی کیفیت
/reports                    هاب گزارش‌ها
/reports/daily              گزارشات روزانه
/reports/weekly             گزارشات هفتگی
/reports/monthly            گزارشات ماهانه
/team-chat                  هاب چت تیمی
/team-chat/channels         کانال‌ها
/team-chat/direct           پیام مستقیم
/news                       هاب اخبار
/news/company               اخبار شرکت
/news/industry              اخبار صنعت
/settings                   هاب تنظیمات
/settings/profile           پروفایل کاربری
/settings/system            تنظیمات سیستم
/settings/permissions       مدیریت کاربران و مجوزها
/assistant                  هاب دستیار
/assistant/ai-chat          چت هوش مصنوعی
/assistant/help-desk        میز کمک (تیکتینگ)
/projects/[id]              جزئیات پروژه
```

## لایسنس

MIT

---

ساخته شده با Next.js و Tailwind CSS
