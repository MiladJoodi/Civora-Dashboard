import { Calculator, FileText, Lightbulb } from "lucide-react";

export type Message = {
    id: number;
    type: "bot" | "user";
    content: string;
    time: string;
};

export const models = [
    "GPT-5 (پیشنهادی)",
    "GPT-4 Turbo",
    "GPT-3.5 Legacy",
    "Custom Fine-Tuned",
];

export const quickSuggestions = [
    { text: "محاسبه مصالح مورد نیاز", icon: Calculator },
    { text: "راهنمای ایمنی کار", icon: Lightbulb },
    { text: "فرمت گزارش‌نویسی", icon: FileText },
    { text: "مقررات ساختمانی", icon: FileText },
]

export const initialMessages: Message[] = [
    {
        id: 1,
        type: "bot",
        content: "سلام! من دستیار هوشمند سیورا هستم. چگونه می‌توانم به شما کمک کنم؟",
        time: "14:30",
    },
    {
        id: 2,
        type: "user",
        content: "چگونه می‌توانم گزارش پیشرفت پروژه تهیه کنم؟",
        time: "14:32",
    },
    {
        id: 3,
        type: "bot",
        content:
            "برای تهیه گزارش پیشرفت پروژه می‌توانید از بخش 'گزارش‌ها' استفاده کنید. مراحل زیر را دنبال کنید:\n\n1. به بخش گزارش‌ها بروید\n2. گزارش روزانه یا هفتگی را انتخاب کنید\n3. پروژه مورد نظر را انتخاب کنید\n4. اطلاعات پیشرفت را وارد کنید\n\nآیا نیاز به راهنمایی بیشتری دارید؟",
        time: "14:32",
    },
];

export const assistantFeatures = [
    {
        title: "محاسبات فنی",
        description: "محاسبه مصالح، هزینه و زمان پروژه",
        icon: Calculator,
        colorBg: "bg-blue-50",
        colorText: "text-blue-900",
        iconColor: "text-blue-600",
    },
    {
        title: "راهنمایی تخصصی",
        description: "مشاوره فنی و حل مسائل ساختمانی",
        icon: Lightbulb,
        colorBg: "bg-green-50",
        colorText: "text-green-900",
        iconColor: "text-green-600",
    },
    {
        title: "مستندات",
        description: "راهنمای استفاده از سیستم و فرم‌ها",
        icon: FileText,
        colorBg: "bg-orange-50",
        colorText: "text-orange-900",
        iconColor: "text-orange-600",
    },
];