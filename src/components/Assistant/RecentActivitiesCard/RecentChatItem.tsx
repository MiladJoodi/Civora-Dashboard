import { User, Clock } from "lucide-react";
import { toPersianNumber } from "@/lib/ToPersianNumber";
import ChatActions from "./ChatActions";
import ChatStatusBadge from "./ChatStatusBadge";
import ChatTypeBadge from "./ChatTypeBadge";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RecentChatItemProps {
    chat: {
        id: number;
        user: string;
        avatar: string;
        message: string;
        time: string;
        type: string;
        status: string;
    };
}

const RecentChatItem = ({ chat }: RecentChatItemProps) => {
    return (
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

                            <Avatar className="w-13 h-13 border-2 border-blue-200/50 bg-gradient-to-br from-blue-100 to-blue-50">
                                <AvatarImage src={chat.avatar} alt={chat.user} />
                                <AvatarFallback>{chat.user[0]}</AvatarFallback>
                            </Avatar>

                            {/* وضعیت آنلاین/آفلاین */}
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${chat.status === "answered" ? "bg-green-400" :
                                chat.status === "pending" ? "bg-yellow-400" :
                                    "bg-blue-400"
                                }`} />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-gray-900 text-sm">{chat.user}</span>
                                <ChatTypeBadge chatType={chat.type} />
                            </div>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {toPersianNumber(chat.time)}
                            </span>
                        </div>
                    </div>

                    {/* وضعیت با آیکون */}
                    <ChatStatusBadge chatStatus={chat.status} />
                </div>

                {/* متن پیام */}
                <p className="text-xs sm:text-sm text-gray-700 leading-6 mb-3 pr-2 border-r-2 border-orange-200/30 group-hover:border-orange-300/50 transition-colors duration-300">
                    {chat.message}
                </p>

                {/* اقدامات سریع */}
                <ChatActions />
            </div>
        </div>
    );
};

export default RecentChatItem;
