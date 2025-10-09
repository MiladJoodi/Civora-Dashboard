import { Badge } from "@/components/ui/badge";
import { HelpCircle, MessageCircle } from "lucide-react";

type ChatTypeBadgeProps = {
    chatType: string;
}

const ChatTypeBadge = ({ chatType }: ChatTypeBadgeProps) => {

    const getChatTypeIcon = (type: string) => {
        return type === "ai-chat" ?
            <MessageCircle className="w-3 h-3" /> :
            <HelpCircle className="w-3 h-3" />;
    };

    return (
        <Badge
            variant="outline"
            className="hidden md:flex text-xs px-2 py-0 border-gray-300/60 bg-white/80 items-center gap-1"
        >
            {getChatTypeIcon(chatType)}
            {chatType === "ai-chat" ? "چت هوشمند" : "میز کمک"}
        </Badge>
    );
}

export default ChatTypeBadge;