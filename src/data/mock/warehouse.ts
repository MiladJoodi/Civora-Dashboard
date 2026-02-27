import {
  generateId,
  randomJalaliDate,
  randomInt,
  randomItem,
} from "@/lib/mock-helpers"

// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────

export interface InventoryItem {
  id: string
  name: string
  category: "structural" | "electrical" | "plumbing" | "finishing" | "safety"
  stock: number
  unit: string
  minStock: number
  maxStock: number
  location: string
  lastRestocked: string
  unitPrice: number
  status: "available" | "low-stock" | "out-of-stock"
}

export interface WarehouseOrder {
  id: string
  items: string
  supplier: string
  status: "pending" | "approved" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  deliveryDate: string
  totalAmount: number
  priority: "high" | "medium" | "low"
}

export interface Supplier {
  id: string
  name: string
  category: string
  phone: string
  email: string
  rating: number
  totalOrders: number
  reliability: "high" | "medium" | "low"
  address: string
}

// ────────────────────────────────────────────────────────────
// Translation maps
// ────────────────────────────────────────────────────────────

export const categoryLabels: Record<InventoryItem["category"], string> = {
  structural: "سازه‌ای",
  electrical: "برقی",
  plumbing: "لوله‌کشی",
  finishing: "نازک‌کاری",
  safety: "ایمنی",
}

export const orderStatusLabels: Record<WarehouseOrder["status"], string> = {
  pending: "در انتظار",
  approved: "تایید شده",
  shipped: "ارسال شده",
  delivered: "تحویل داده شده",
  cancelled: "لغو شده",
}

export const priorityLabels: Record<WarehouseOrder["priority"], string> = {
  high: "بالا",
  medium: "متوسط",
  low: "پایین",
}

export const reliabilityLabels: Record<Supplier["reliability"], string> = {
  high: "بالا",
  medium: "متوسط",
  low: "پایین",
}

// ────────────────────────────────────────────────────────────
// Raw data pools
// ────────────────────────────────────────────────────────────

const structuralItems = [
  "سیمان تیپ ۲",
  "سیمان تیپ ۵",
  "میلگرد ۱۴",
  "میلگرد ۱۸",
  "میلگرد ۲۰",
  "میلگرد ۲۵",
  "آجر نسوز",
  "آجر سفالی",
  "بلوک سیمانی",
  "بلوک سبک",
  "تیرآهن ۱۴",
  "تیرآهن ۱۸",
  "ناودانی ۱۰",
  "نبشی ۶",
  "ورق فولادی ۳ میل",
  "پیچ و مهره ساختمانی",
  "شن ریزدانه",
  "ماسه شسته",
  "بتن آماده",
  "سنگ کوهی",
]

const electricalItems = [
  "سیم مسی ۲.۵",
  "سیم مسی ۴",
  "کابل ۴×۱۶",
  "کابل فیبر نوری",
  "کلید مینیاتوری ۲۵A",
  "کلید مینیاتوری ۳۲A",
  "پریز برق ۲۲۰V",
  "کلید تک‌پل",
  "لامپ LED ۱۲W",
  "چراغ سقفی صنعتی",
  "تابلو برق ۱۲ ردیفه",
  "فیوز ۶۳A",
]

const plumbingItems = [
  "لوله پلیکا ۱۱۰",
  "لوله پلیکا ۶۳",
  "لوله گالوانیزه ۲ اینچ",
  "شیر فلکه ۲ اینچ",
  "شیر پیسوار",
  "اتصال چهارراه",
  "زانوی ۹۰ درجه",
  "پمپ آب خانگی",
  "منبع آب ۱۰۰۰ لیتری",
  "لوله مسی ۱/۲ اینچ",
]

const finishingItems = [
  "کاشی ۳۰×۳۰",
  "سرامیک ۶۰×۶۰",
  "سنگ تراورتن",
  "گچ ساختمانی",
  "رنگ نمای بیرونی",
  "رنگ پلاستیک داخلی",
  "بتونه دیواری",
  "پروفیل آلومینیومی",
  "شیشه دوجداره",
  "درب چوبی ملامینه",
  "پارکت لمینت",
  "موزائیک گرانیتی",
]

const safetyItems = [
  "کلاه ایمنی",
  "دستکش ایمنی",
  "کفش ایمنی",
  "جلیقه مهاری",
  "عینک محافظ",
  "ماسک فیلتردار",
  "طناب ایمنی ۱۰ متری",
  "کپسول آتش‌نشانی",
  "تابلو هشدار",
  "تور حفاظتی",
  "نوار خطر",
]

const itemsByCategory: Record<InventoryItem["category"], string[]> = {
  structural: structuralItems,
  electrical: electricalItems,
  plumbing: plumbingItems,
  finishing: finishingItems,
  safety: safetyItems,
}

const unitsByCategory: Record<InventoryItem["category"], string[]> = {
  structural: ["تن", "عدد", "متر مکعب", "کیلوگرم", "شاخه"],
  electrical: ["متر", "عدد", "حلقه", "رول", "بسته"],
  plumbing: ["متر", "عدد", "شاخه", "دستگاه"],
  finishing: ["مترمربع", "کیلوگرم", "عدد", "بسته", "قوطی", "متر"],
  safety: ["عدد", "جفت", "بسته", "رول"],
}

const locations = ["انبار A", "انبار B", "انبار C", "محوطه", "سوله شمالی", "سوله جنوبی"]

const supplierNames = [
  "شرکت فولاد پارس",
  "بازرگانی آریا سیمان",
  "تامین‌کالای صنعت",
  "گروه صنعتی کاوه",
  "شرکت برق‌صنعت ایران",
  "صنایع لوله و اتصالات بهمن",
  "بازرگانی سنگ آذرین",
  "شرکت رنگ و پوشش نیکا",
  "تجهیزات ایمنی آسمان",
  "شرکت مصالح ساختمانی سپهر",
  "گروه بازرگانی آبادگران",
  "شرکت تاسیسات مکانیکی پایدار",
  "صنایع آلومینیوم پارس",
  "بازرگانی آهن تجارت",
  "شرکت تولید بلوک سبک آسان",
  "تامین تجهیزات برقی نور",
  "شرکت شیشه ایمن پاسارگاد",
  "صنایع چوب و دکوراسیون پردیس",
  "بازرگانی لوله فردوس",
  "شرکت کاشی و سرامیک گلستان",
  "گروه صنعتی ایمن سازه",
  "شرکت تجهیزات حفاظتی البرز",
  "بازرگانی مصالح رضوان",
  "شرکت تولیدی کابل سیمین",
  "گروه بازرگانی ساختمان‌پرداز",
]

const supplierCategories = [
  "مصالح ساختمانی",
  "تجهیزات برقی",
  "لوله‌کشی و تاسیسات",
  "ایمنی و حفاظت",
  "مصالح نازک‌کاری",
  "آهن‌آلات و فولاد",
]

const supplierAddresses = [
  "تهران، خیابان آزادی، پلاک ۴۵",
  "اصفهان، خیابان چهارباغ، کوچه ۱۲",
  "تبریز، بلوار ولیعصر، ساختمان نگین",
  "شیراز، خیابان زند، پلاک ۸۷",
  "مشهد، بلوار وکیل‌آباد، طبقه ۳",
  "تهران، شهرک صنعتی شمس‌آباد",
  "کرج، فاز ۴ مهرشهر، بلوار ارم",
  "قم، خیابان معلم، کوچه ۵",
  "اهواز، کیانپارس، خیابان ۱۰",
  "تهران، بزرگراه فتح، خروجی سه‌راه شریف",
  "یزد، بلوار دانشجو، پلاک ۲۲",
  "تهران، جاده مخصوص کرج، کیلومتر ۱۸",
  "اصفهان، شهرک صنعتی جی",
  "رشت، بلوار شهید بهشتی، پلاک ۶۱",
  "تهران، خیابان ولیعصر، ساختمان سپید",
]

// ────────────────────────────────────────────────────────────
// Generators
// ────────────────────────────────────────────────────────────

function generateInventoryItems(): InventoryItem[] {
  const items: InventoryItem[] = []
  const categories: InventoryItem["category"][] = [
    "structural",
    "electrical",
    "plumbing",
    "finishing",
    "safety",
  ]

  // Track used names to avoid duplicates
  const usedNames = new Set<string>()

  for (let i = 0; i < 55; i++) {
    const category = categories[i % categories.length]
    const pool = itemsByCategory[category]
    let name = pool[i % pool.length]

    // Handle duplicates by appending a suffix
    if (usedNames.has(name)) {
      name = `${name} (${randomItem(["درجه ۱", "درجه ۲", "صادراتی", "ایرانی", "وارداتی"])})`
    }
    usedNames.add(name)

    const minStock = randomInt(5, 50)
    const maxStock = randomInt(minStock * 3, minStock * 8)
    const stock = randomInt(0, maxStock)

    let status: InventoryItem["status"]
    if (stock === 0) {
      status = "out-of-stock"
    } else if (stock <= minStock) {
      status = "low-stock"
    } else {
      status = "available"
    }

    items.push({
      id: generateId(),
      name,
      category,
      stock,
      unit: randomItem(unitsByCategory[category]),
      minStock,
      maxStock,
      location: randomItem(locations),
      lastRestocked: randomJalaliDate(1403, 1404),
      unitPrice: randomInt(50000, 25000000),
      status,
    })
  }

  return items
}

function generateOrders(suppliers: Supplier[], inventory: InventoryItem[]): WarehouseOrder[] {
  const orders: WarehouseOrder[] = []

  for (let i = 0; i < 35; i++) {
    const numItems = randomInt(1, 4)
    const orderItems: string[] = []
    for (let j = 0; j < numItems; j++) {
      const item = randomItem(inventory)
      if (!orderItems.includes(item.name)) {
        orderItems.push(item.name)
      }
    }

    const supplier = randomItem(suppliers)
    const statuses: WarehouseOrder["status"][] = [
      "pending",
      "approved",
      "shipped",
      "delivered",
      "cancelled",
    ]
    const priorities: WarehouseOrder["priority"][] = ["high", "medium", "low"]

    orders.push({
      id: generateId(),
      items: orderItems.join("، "),
      supplier: supplier.name,
      status: randomItem(statuses),
      orderDate: randomJalaliDate(1403, 1404),
      deliveryDate: randomJalaliDate(1404, 1404),
      totalAmount: randomInt(5000000, 500000000),
      priority: randomItem(priorities),
    })
  }

  return orders
}

function generateSuppliers(): Supplier[] {
  const suppliers: Supplier[] = []

  for (let i = 0; i < 25; i++) {
    const reliabilities: Supplier["reliability"][] = ["high", "medium", "low"]

    const phonePrefix = randomItem(["021", "031", "041", "051", "011", "013"])
    const phoneNumber = `${phonePrefix}-${randomInt(20000000, 99999999)}`

    const emailDomains = [
      "company.ir",
      "pardis.com",
      "gmail.com",
      "sanaat.ir",
      "tejarat.co",
    ]
    const emailName = supplierNames[i]
      .replace(/شرکت |بازرگانی |گروه |صنایع |تجهیزات /g, "")
      .replace(/ /g, "")
      .substring(0, 8)
      .toLowerCase()

    suppliers.push({
      id: generateId(),
      name: supplierNames[i],
      category: randomItem(supplierCategories),
      phone: phoneNumber,
      email: `info@${emailName || "supplier" + i}${randomItem(emailDomains)}`,
      rating: randomInt(1, 5),
      totalOrders: randomInt(3, 120),
      reliability: randomItem(reliabilities),
      address: randomItem(supplierAddresses),
    })
  }

  return suppliers
}

// ────────────────────────────────────────────────────────────
// Exported data
// ────────────────────────────────────────────────────────────

export const suppliers: Supplier[] = generateSuppliers()
export const inventoryItems: InventoryItem[] = generateInventoryItems()
export const warehouseOrders: WarehouseOrder[] = generateOrders(suppliers, inventoryItems)
