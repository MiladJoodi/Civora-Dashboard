"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { recentChats } from "../data";
import { Activity, TrendingUp, Clock, User, MessageCircle, HelpCircle, Sparkles, ArrowLeft, CheckCircle, Clock4, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import RecentChatItem from "./RecentChatItem";
import { Button } from "@/components/ui/button";
import RecentActivitiesCardFooter from "./RecentActivitiesCardFooter";

const RecentActivitiesCard = () => {

    const [lineLoaded, setLineLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLineLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

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
                        <span className="text-xs font-medium text-gray-700">فعالیت‌های امروز</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="relative z-10 pt-0">
                <div className="space-y-3">
                    {recentChats.map((chat) => (
                        <RecentChatItem key={chat.id} chat={chat} />
                    ))}
                </div>

                {/* فوتر کارت */}
                <RecentActivitiesCardFooter />

            </CardContent>
        </Card>
    );
}

export default RecentActivitiesCard;