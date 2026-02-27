"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
    value: string;
    onChange: (val: string) => void;
    onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend }) => {
    return (
        <div className="flex items-center gap-2">
            <Input
                placeholder="پیام خود را بنویسید..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && onSend()}
                className="flex-1"
            />
            <Button onClick={onSend} className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                ارسال
            </Button>
        </div>
    );
};

export default ChatInput;
