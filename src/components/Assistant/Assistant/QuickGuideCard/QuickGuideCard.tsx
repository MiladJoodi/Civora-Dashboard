import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Clock, ArrowLeft, Sparkles } from "lucide-react"
import FAQsAccordion from "./FAQAccordion/FAQAccordion";
import { guideItems } from "./data";
import GuideItemCard from "./GuideItemCard";

const QuickGuideCard = () => {

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
                    {guideItems.map((item, index) => (
                        <GuideItemCard
                            key={index}
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                            color={item.color}
                            iconBg={item.iconBg}
                            iconColor={item.iconColor}
                        />
                    ))}
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