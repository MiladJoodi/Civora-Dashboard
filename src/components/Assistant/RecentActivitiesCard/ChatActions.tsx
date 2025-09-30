import { ArrowLeft, Clock, MessageCircle } from "lucide-react";

const ChatActions = () => {
    return (
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
    );
}

export default ChatActions;