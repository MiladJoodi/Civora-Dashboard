import { randomPersianName, randomInt, randomItem } from "@/lib/mock-helpers"

export interface Channel {
  id: string
  name: string
  description: string
  members: number
  lastMessage: string
  lastMessageTime: string
  unread: number
}

export interface DirectContact {
  id: string
  name: string
  avatar: string
  role: string
  online: boolean
  lastMessage: string
  lastMessageTime: string
  unread: number
}

export interface ChatMessage {
  id: string
  sender: string
  avatar: string
  content: string
  timestamp: string
  isOwn: boolean
}

export const channels: Channel[] = [
  { id: "ch-1", name: "#عمومی", description: "گفتگوهای عمومی تیم", members: 48, lastMessage: "جلسه هماهنگی فردا ساعت ۹ صبح", lastMessageTime: "۱۰ دقیقه پیش", unread: 3 },
  { id: "ch-2", name: "#پروژه-سیورا", description: "بحث‌های مربوط به پروژه برج سیورا", members: 22, lastMessage: "گزارش پیشرفت فاز ۳ آماده شد", lastMessageTime: "۳۰ دقیقه پیش", unread: 1 },
  { id: "ch-3", name: "#ایمنی", description: "اطلاعیه‌ها و گزارش‌های ایمنی", members: 48, lastMessage: "بازرسی ایمنی هفتگی انجام شد", lastMessageTime: "۱ ساعت پیش", unread: 0 },
  { id: "ch-4", name: "#انبار", description: "هماهنگی موجودی و سفارشات", members: 15, lastMessage: "سیمان تیپ ۲ موجودی بحرانی", lastMessageTime: "۲ ساعت پیش", unread: 5 },
  { id: "ch-5", name: "#مالی", description: "بحث‌های مالی و حسابداری", members: 10, lastMessage: "صورتحساب پیمانکار ارسال شد", lastMessageTime: "۳ ساعت پیش", unread: 0 },
  { id: "ch-6", name: "#فنی", description: "مباحث فنی و مهندسی", members: 30, lastMessage: "نقشه‌های بازنگری شده آپلود شد", lastMessageTime: "۴ ساعت پیش", unread: 2 },
  { id: "ch-7", name: "#اطلاعیه‌ها", description: "اطلاعیه‌های رسمی شرکت", members: 48, lastMessage: "تعطیلی پنجشنبه آینده", lastMessageTime: "دیروز", unread: 0 },
  { id: "ch-8", name: "#تجهیزات", description: "هماهنگی تجهیزات و ماشین‌آلات", members: 18, lastMessage: "جرثقیل برجی ۲ نیاز به سرویس دارد", lastMessageTime: "دیروز", unread: 1 },
]

export const directContacts: DirectContact[] = Array.from({ length: 20 }, (_, i) => {
  const name = randomPersianName()
  const roles = ["مهندس عمران", "مدیر پروژه", "سرکارگر", "حسابدار", "مسئول ایمنی", "ناظر", "مهندس معمار", "انباردار"]
  return {
    id: `dm-${i + 1}`,
    name,
    avatar: name.charAt(0),
    role: randomItem(roles),
    online: randomInt(0, 3) !== 0,
    lastMessage: randomItem([
      "سلام، گزارش رو فرستادم",
      "فردا جلسه داریم",
      "نقشه‌ها آماده شد",
      "ممنون، بررسی میکنم",
      "هماهنگی شد",
      "لطفا تایید کنید",
      "فایل رو دریافت کردم",
      "بله، انجام میشه",
    ]),
    lastMessageTime: randomItem(["۵ دقیقه پیش", "۱۵ دقیقه پیش", "۱ ساعت پیش", "۳ ساعت پیش", "دیروز", "۲ روز پیش"]),
    unread: randomItem([0, 0, 0, 1, 2, 3]),
  }
})

export const sampleMessages: ChatMessage[] = [
  { id: "m-1", sender: "سارا احمدی", avatar: "س", content: "سلام، گزارش پیشرفت هفتگی رو آماده کردم. میتونید بررسی کنید؟", timestamp: "۱۴:۳۰", isOwn: false },
  { id: "m-2", sender: "شما", avatar: "م", content: "سلام، بله الان چک میکنم. ممنون", timestamp: "۱۴:۳۲", isOwn: true },
  { id: "m-3", sender: "سارا احمدی", avatar: "س", content: "فایل رو در پوشه اشتراکی پروژه گذاشتم", timestamp: "۱۴:۳۳", isOwn: false },
  { id: "m-4", sender: "شما", avatar: "م", content: "خوبه. نکته‌ای هم درباره تاخیر در تامین مصالح داشتم که باید اضافه بشه", timestamp: "۱۴:۳۵", isOwn: true },
  { id: "m-5", sender: "سارا احمدی", avatar: "س", content: "بله حتما. فردا بخش تامین مصالح رو هم اضافه میکنم و نسخه نهایی رو میفرستم", timestamp: "۱۴:۳۶", isOwn: false },
  { id: "m-6", sender: "شما", avatar: "م", content: "عالیه. جلسه هماهنگی فردا ساعت ۹ هم یادتون باشه", timestamp: "۱۴:۳۸", isOwn: true },
  { id: "m-7", sender: "سارا احمدی", avatar: "س", content: "بله حتما، تقویمم رو تنظیم کردم ✅", timestamp: "۱۴:۳۹", isOwn: false },
]
