import {
  generateId,
  randomItem,
  randomInt,
  randomJalaliDate,
} from "@/lib/mock-helpers"

export interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
  project: string
  status: "completed" | "pending" | "cancelled"
}

const categories = ["مصالح", "پیمانکار", "تجهیزات", "حقوق", "متفرقه"]

const projects = [
  "برج مسکونی آفتاب",
  "مجتمع تجاری ستاره",
  "پل عابر پیاده میدان آزادی",
  "بیمارستان امام رضا",
  "پارکینگ طبقاتی مرکزی",
  "ساختمان اداری پارسیان",
  "مجتمع مسکونی گلستان",
  "پروژه بزرگراه شرقی",
  "مدرسه فرهنگ",
  "کارخانه تولیدی آریا",
  "مسجد جامع محله",
  "مرکز خرید نگین",
]

const expenseDescriptions: Record<string, string[]> = {
  "مصالح": [
    "خرید سیمان تیپ ۲",
    "خرید آجر نسوز",
    "خرید میلگرد آجدار",
    "تهیه شن و ماسه",
    "خرید تیرآهن ۱۶",
    "خرید بتن آماده",
    "تهیه آسفالت",
    "خرید کاشی و سرامیک",
    "خرید سنگ نما",
    "تهیه عایق رطوبتی",
    "خرید لوله پلی‌اتیلن",
    "خرید سیم و کابل برق",
    "تهیه رنگ نمای ساختمان",
    "خرید پروفیل آلومینیوم",
    "خرید گچ و خاک",
    "تهیه چسب کاشی",
    "خرید ایزوگام",
    "تهیه مصالح بنایی",
    "خرید بلوک سبک",
    "تهیه پوکه معدنی",
  ],
  "پیمانکار": [
    "پرداخت پیمانکار اسکلت",
    "پرداخت پیمانکار تاسیسات",
    "پرداخت پیمانکار نازک‌کاری",
    "پرداخت پیمانکار برق",
    "پرداخت پیمانکار لوله‌کشی",
    "صورت‌وضعیت پیمانکار خاکبرداری",
    "پرداخت پیمانکار آسانسور",
    "پرداخت پیمانکار نمای ساختمان",
    "صورت‌وضعیت پیمانکار فونداسیون",
    "پرداخت پیمانکار سقف کاذب",
    "پرداخت پیمانکار کفپوش",
    "صورت‌وضعیت پیمانکار فاز دو",
  ],
  "تجهیزات": [
    "اجاره جرثقیل برجی",
    "اجاره بتونیر",
    "خرید ابزارآلات",
    "تعمیر لودر",
    "اجاره داربست فلزی",
    "خرید دستگاه جوش",
    "اجاره کمپرسور هوا",
    "خرید نردبان صنعتی",
    "تعمیر بیل مکانیکی",
    "اجاره پمپ بتن",
    "خرید کلاه ایمنی",
    "تهیه تجهیزات ایمنی",
  ],
  "حقوق": [
    "پرداخت حقوق ماهانه کارکنان",
    "پرداخت اضافه‌کار",
    "پرداخت بیمه کارگران",
    "پرداخت پاداش عملکرد",
    "پرداخت عیدی و سنوات",
    "پرداخت حق مسکن",
    "پرداخت حق اولاد",
    "پرداخت بن کارگری",
  ],
  "متفرقه": [
    "هزینه حمل و نقل",
    "هزینه خوابگاه کارگران",
    "هزینه غذای کارگاه",
    "پرداخت قبض برق کارگاه",
    "پرداخت قبض آب کارگاه",
    "هزینه چاپ نقشه",
    "هزینه آزمایشگاه بتن",
    "هزینه نگهبانی شبانه",
    "خرید لوازم اداری",
    "هزینه بیمه پروژه",
    "جریمه تخلف ساختمانی",
    "هزینه مشاوره حقوقی",
  ],
}

const incomeDescriptions = [
  "دریافت صورت‌وضعیت از کارفرما",
  "دریافت پیش‌پرداخت قرارداد",
  "تسویه حساب پروژه تکمیل‌شده",
  "دریافت ضمانت‌نامه بانکی",
  "فروش مصالح مازاد",
  "دریافت مطالبات معوقه",
  "درآمد اجاره تجهیزات",
  "دریافت سپرده حسن انجام کار",
  "درآمد مشاوره فنی",
  "دریافت تعدیل قرارداد",
]

function generateTransactions(count: number): Transaction[] {
  const transactions: Transaction[] = []

  for (let i = 0; i < count; i++) {
    const isIncome = Math.random() < 0.25
    const type: Transaction["type"] = isIncome ? "income" : "expense"
    const category = isIncome ? "متفرقه" : randomItem(categories)

    let description: string
    if (isIncome) {
      description = randomItem(incomeDescriptions)
    } else {
      const descs = expenseDescriptions[category]
      description = randomItem(descs)
    }

    const statusWeight = Math.random()
    let status: Transaction["status"]
    if (statusWeight < 0.7) {
      status = "completed"
    } else if (statusWeight < 0.9) {
      status = "pending"
    } else {
      status = "cancelled"
    }

    let amount: number
    if (isIncome) {
      amount = randomInt(5, 500) * 100_000_000
    } else {
      if (category === "حقوق") {
        amount = randomInt(5, 80) * 100_000_000
      } else if (category === "پیمانکار") {
        amount = randomInt(10, 300) * 100_000_000
      } else if (category === "تجهیزات") {
        amount = randomInt(2, 50) * 100_000_000
      } else if (category === "مصالح") {
        amount = randomInt(5, 150) * 100_000_000
      } else {
        amount = randomInt(1, 30) * 100_000_000
      }
    }

    transactions.push({
      id: generateId(),
      description,
      amount,
      type,
      category,
      date: randomJalaliDate(1402, 1403),
      project: randomItem(projects),
      status,
    })
  }

  return transactions.sort((a, b) => {
    if (b.date > a.date) return 1
    if (b.date < a.date) return -1
    return 0
  })
}

export const transactions: Transaction[] = generateTransactions(220)

export const completedTransactions = transactions.filter(
  (t) => t.status === "completed"
)
export const pendingTransactions = transactions.filter(
  (t) => t.status === "pending"
)
export const incomeTransactions = transactions.filter(
  (t) => t.type === "income"
)
export const expenseTransactions = transactions.filter(
  (t) => t.type === "expense"
)
