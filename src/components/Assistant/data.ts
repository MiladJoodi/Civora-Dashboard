import { Bot, Clock, HelpCircle, MessageSquare, Users } from "lucide-react"

export const assistantStats = [
    { title: "گفتگوهای امروز", value: "24", icon: MessageSquare, color: "text-blue-600" },
    { title: "درخواست‌های کمک", value: "8", icon: HelpCircle, color: "text-orange-600" },
    { title: "کاربران فعال", value: "12", icon: Users, color: "text-green-600" },
    { title: "میانگین پاسخ", value: "2 دقیقه", icon: Clock, color: "text-purple-600" },
]

export const recentChats = [
    {
        id: 1,
        user: "احمد محمدی",
        avatar: "/avatars/user1.jpg",
        message: "چگونه می‌توانم گزارش پیشرفت پروژه تهیه کنم؟",
        time: "10 دقیقه پیش",
        status: "answered",
        type: "ai-chat",
    },
    {
        id: 2,
        user: "فاطمه احمدی",
        avatar: "/avatars/user2.jpg",
        message: "مشکل در دسترسی به فایل‌های پروژه",
        time: "25 دقیقه پیش",
        status: "pending",
        type: "help-desk",
    },
    {
        id: 3,
        user: "علی رضایی",
        avatar: "/avatars/user4.jpg",
        message: "راهنمایی برای محاسبه مصالح مورد نیاز",
        time: "1 ساعت پیش",
        status: "answered",
        type: "ai-chat",
    },
    {
        id: 4,
        user: "مریم کریمی",
        avatar: "/avatars/user3.jpg",
        message: "خطا در سیستم ثبت حضور و غیاب",
        time: "2 ساعت پیش",
        status: "in-progress",
        type: "help-desk",
    },
]

export const quickActions = [
    {
        title: "چت هوشمند",
        description: "گفتگو با دستیار هوشمند برای پاسخ سریع",
        icon: Bot,
        href: "/assistant/ai-chat",
        color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
        iconColor: "text-blue-600",
    },
    {
        title: "میز کمک",
        description: "ارسال درخواست کمک و پشتیبانی فنی",
        icon: HelpCircle,
        href: "/assistant/help-desk",
        color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
        iconColor: "text-orange-600",
    },
]