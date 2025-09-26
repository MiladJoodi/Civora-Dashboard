import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Bot, HelpCircle, Users, Clock, TrendingUp, Cpu, Zap, Shield } from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import AssistantHeader from "@/components/Assistant/AssistantHeader"
import { StatsGrid } from "@/components/shared/StatsGrid/StatsGrid"

export default function AssistantPage() {
  const assistantStats = [
    { title: "گفتگوهای امروز", value: "24", icon: MessageSquare, color: "text-blue-600" },
    { title: "درخواست‌های کمک", value: "8", icon: HelpCircle, color: "text-orange-600" },
    { title: "کاربران فعال", value: "12", icon: Users, color: "text-green-600" },
    { title: "میانگین پاسخ", value: "2 دقیقه", icon: Clock, color: "text-purple-600" },
  ]

  const recentChats = [
    {
      id: 1,
      user: "احمد محمدی",
      message: "چگونه می‌توانم گزارش پیشرفت پروژه تهیه کنم؟",
      time: "10 دقیقه پیش",
      status: "answered",
      type: "ai-chat",
    },
    {
      id: 2,
      user: "فاطمه احمدی",
      message: "مشکل در دسترسی به فایل‌های پروژه",
      time: "25 دقیقه پیش",
      status: "pending",
      type: "help-desk",
    },
    {
      id: 3,
      user: "علی رضایی",
      message: "راهنمایی برای محاسبه مصالح مورد نیاز",
      time: "1 ساعت پیش",
      status: "answered",
      type: "ai-chat",
    },
    {
      id: 4,
      user: "مریم کریمی",
      message: "خطا در سیستم ثبت حضور و غیاب",
      time: "2 ساعت پیش",
      status: "in-progress",
      type: "help-desk",
    },
  ]

  const quickActions = [
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

  return (
    <div className=" space-y-6 px-3 container mx-auto">
      
      <AssistantHeader />

      <StatsGrid stats={assistantStats} />


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickActions.map((action, index) => (
          <Link key={index} href={action.href}>
            <Card className={`cursor-pointer transition-all ${action.color}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                  {action.title}
                </CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">شروع کنید</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>


    </div>
  )
}
