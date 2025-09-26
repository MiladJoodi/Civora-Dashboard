import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, MessageCircle, HelpCircle, Clock, ArrowLeft, Sparkles, Activity, Users, TrendingUp } from "lucide-react"
import FAQsAccordion from "./FAQAccordion";

const QuickGuideCard = () => {
    const guideItems = [
        {
            title: "چت هوشمند",
            description: "برای سوالات فنی و راهنمایی سریع از دستیار هوشمند استفاده کنید",
            icon: MessageCircle,
            color: "blue",
            gradient: "from-blue-50 to-blue-100/30",
            iconBg: "bg-blue-500/10",
            iconColor: "text-blue-600"
        },
        {
            title: "میز کمک",
            description: "برای مشکلات فنی و درخواست پشتیبانی تخصصی",
            icon: HelpCircle,
            color: "orange",
            gradient: "from-orange-50 to-orange-100/30",
            iconBg: "bg-orange-500/10",
            iconColor: "text-orange-600"
        },
        {
            title: "پاسخ سریع",
            description: "میانگین زمان پاسخ کمتر از ۵ دقیقه",
            icon: Clock,
            color: "green",
            gradient: "from-green-50 to-green-100/30",
            iconBg: "bg-green-500/10",
            iconColor: "text-green-600"
        }
    ];

    return (
        <Card className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-500 group">

            {/* افکت نور */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 via-purple-100/5 to-orange-100/10" />

            {/* خط طلایی */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" />

            <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 border border-orange-200/50 shadow-sm">
                        <Sparkles className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <CardTitle className="text-lg sm:text-xl font-bold">
                            چگونه شروع کنیم؟
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            انتخاب بهترین روش برای نیاز شما
                        </CardDescription>
                    </div>
                </div>

            </CardHeader>

            <CardContent className="relative z-10 pt-0">
                <div className="space-y-3">
                    {guideItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className={`group/item relative p-3 rounded-xl border border-gray-200/40 ${item.gradient} hover:border-${item.color}-300/50 hover:shadow-md transition-all duration-300 cursor-pointer`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${item.iconBg} ${item.iconColor} transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-12`}>
                                        <Icon className="w-4 h-4" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className={`font-semibold text-gray-900 text-sm`}>
                                                {item.title}
                                            </h4>
                                            <ArrowLeft className={`w-3 h-3 text-${item.color}-600 opacity-0 group-hover/item:opacity-100 transition-all duration-300`} />
                                        </div>
                                        <p className={`text-gray-700 leading-5 text-sm`}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* دکمه شفاف */}
                                <button className={`w-full mt-2 py-1.5 rounded-md bg-${item.color}-500/5 hover:bg-${item.color}-500/10 border border-${item.color}-200/30 text-${item.color}-700 text-xs font-medium transition-all duration-300 opacity-0 group-hover/item:opacity-100 cursor-pointer`}>
                                    انتخاب این گزینه
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* نکته پایانی */}
                <div className="mt-4 p-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200/30">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">نکته مهم</p>
                            <p className="text-sm text-gray-600">می‌توانید همزمان از سرویس استفاده کنید</p>
                        </div>
                    </div>
                </div>

                {/* سوالات متداول */}
                <FAQsAccordion />

            </CardContent>
        </Card>
    );
}

export default QuickGuideCard;