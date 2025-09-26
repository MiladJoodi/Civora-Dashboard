"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { recentChats } from "./data";
import { Activity, TrendingUp, Clock, User, MessageCircle, HelpCircle, Sparkles, ArrowLeft, CheckCircle, Clock4, AlertCircle } from "lucide-react";
import { toPersianNumber } from "@/lib/ToPersianNumber";
import { useEffect, useState } from "react";

const RecentActivitiesCard = () => {

    const [lineLoaded, setLineLoaded] = useState(false);

  useEffect(() => {
    // وقتی کامپوننت mount شد، width فعال میشه
    const timer = setTimeout(() => setLineLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);


    // تابع برای گرفتن آیکون وضعیت
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "answered":
                return <CheckCircle className="w-3 h-3" />;
            case "pending":
                return <Clock4 className="w-3 h-3" />;
            case "in-progress":
                return <AlertCircle className="w-3 h-3" />;
            default:
                return <Clock className="w-3 h-3" />;
        }
    };

    // تابع برای گرفتن آیکون نوع چت
    const getChatTypeIcon = (type: string) => {
        return type === "ai-chat" ?
            <MessageCircle className="w-3 h-3" /> :
            <HelpCircle className="w-3 h-3" />;
    };

    return (
        <Card className="lg:col-span-2 relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500">

            {/* افکت گرادیانت پس‌زمینه */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-transparent to-blue-50/10" />

            {/* خط دکوراتیو بالای کارت */}
            <div
        className={`absolute top-0 right-0 h-1 bg-gradient-to-l from-orange-400 via-orange-300 to-transparent transition-all duration-1000 ease-out`}
        style={{ width: lineLoaded ? "100%" : "0%" }}
      />
            <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 border border-orange-200/50 shadow-sm">
                                <Activity className="w-6 h-6 text-orange-500" />
                            </div>
                            {/* نقطه پالس انیمیشن */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <CardTitle className="text-lg sm:text-xl font-bold">
                                فعالیت‌های اخیر
                            </CardTitle>
                            <CardDescription className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                آخرین گفتگوها و درخواست‌های کمک
                            </CardDescription>
                        </div>
                    </div>

                    {/* آمار زنده */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg border border-gray-200/50 backdrop-blur-sm">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-xs font-medium text-gray-700">۲۴ فعالیت امروز</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="relative z-10 pt-0">
                <div className="space-y-3">
                    {recentChats.map((chat) => (
                        <div
                            key={chat.id}
                            className="group relative p-4 rounded-xl border border-gray-200/60 bg-white/50 hover:bg-white hover:border-orange-200/80 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.01] backdrop-blur-sm"
                        >
                            {/* افکت hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-50/0 via-orange-100/0 to-orange-50/0 group-hover:from-orange-50/30 group-hover:via-orange-100/20 group-hover:to-orange-50/30 transition-all duration-500 rounded-xl" />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        {/* آواتار کاربر */}
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-200/50 flex items-center justify-center">
                                                <User className="w-4 h-4 text-blue-600" />
                                            </div>
                                            {/* وضعیت آنلاین/آفلاین */}
                                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${chat.status === "answered" ? "bg-green-400" :
                                                    chat.status === "pending" ? "bg-yellow-400" :
                                                        "bg-blue-400"
                                                }`} />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-gray-900 text-sm">{chat.user}</span>
                                                <Badge
                                                    variant="outline"
                                                    className="hidden md:flex text-xs px-2 py-0 border-gray-300/60 bg-white/80 items-center gap-1"
                                                >
                                                    {getChatTypeIcon(chat.type)}
                                                    {chat.type === "ai-chat" ? "چت هوشمند" : "میز کمک"}
                                                </Badge>
                                            </div>
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {toPersianNumber(chat.time)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* وضعیت با آیکون */}
                                    <Badge
  className={`
    px-3 py-1.5 text-xs font-medium border-0 shadow-sm
    flex items-center gap-1.5 transition-all duration-300
    group-hover:scale-105
    ${chat.status === "answered"
      ? "bg-green-50 text-green-700 border border-green-200/50"
      : chat.status === "pending"
        ? "bg-yellow-50 text-yellow-700 border border-yellow-200/50"
        : "bg-blue-50 text-blue-700 border border-blue-200/50"}
  `}
>
  {getStatusIcon(chat.status)}
  <span className="hidden sm:inline">
    {chat.status === "answered"
      ? "پاسخ داده شده"
      : chat.status === "pending"
        ? "در انتظار"
        : "در حال بررسی"}
  </span>
</Badge>
                                </div>

                                {/* متن پیام */}
                                <p className="text-xs sm:text-sm text-gray-700 leading-6 mb-3 pr-2 border-r-2 border-orange-200/30 group-hover:border-orange-300/50 transition-colors duration-300">
                                    {chat.message}
                                </p>

                                {/* اقدامات سریع */}
                                <div className="flex items-center justify-between pt-2 border-t border-gray-100/50">
                                    <div className="flex items-center gap-2">
                                        <button className="text-xs text-gray-500 hover:text-orange-600 transition-colors duration-200 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-orange-50 cursor-pointer">
                                            <MessageCircle className="w-3 h-3" />
                                            پاسخ
                                        </button>
                                        <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 cursor-pointer">
                                            <Clock className="w-3 h-3" />
                                            یادآوری
                                        </button>
                                    </div>

                                    <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200 flex items-center gap-1 group/btn cursor-pointer">
                                        مشاهده جزئیات
                                        <ArrowLeft className="w-3 h-3 group-hover/btn:-translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* فوتر کارت */}
                <div className="flex flex-col md:flex-row gap-2 items-center justify-between mt-6 pt-4 border-t border-gray-200/50">
                    <span className="hidden sm:flex text-sm text-gray-500 items-center gap-1">
                        <Sparkles className="w-3 h-3 text-orange-400" />
                        به روز شده در لحظه
                    </span>
                    <button className="w-full sm:w-auto text-sm text-orange-600 hover:text-orange-700 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all duration-200 cursor-pointer">
                        مشاهده همه فعالیت‌ها
                        <ArrowLeft className="w-3 h-3" />
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}

export default RecentActivitiesCard;