import { AlertCircle, CheckCircle, Clock, Clock4 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ChatStatusBadgeProps = {
    chatStatus: string;
}

const ChatStatusBadge = ({ chatStatus }: ChatStatusBadgeProps) => {
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
    return (
        <Badge
            className={`
    px-3 py-1.5 text-xs font-medium border-0 shadow-sm
    flex items-center gap-1.5 transition-all duration-300
    group-hover:scale-105
    ${chatStatus === "answered"
                    ? "bg-green-50 text-green-700 border border-green-200/50"
                    : chatStatus === "pending"
                        ? "bg-yellow-50 text-yellow-700 border border-yellow-200/50"
                        : "bg-blue-50 text-blue-700 border border-blue-200/50"}
  `}
        >
            {getStatusIcon(chatStatus)}
            <span className="hidden sm:inline">
                {chatStatus === "answered"
                    ? "پاسخ داده شده"
                    : chatStatus === "pending"
                        ? "در انتظار"
                        : "در حال بررسی"}
            </span>
        </Badge>
    );
}

export default ChatStatusBadge;