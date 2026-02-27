"use client";
import { Bot, User } from "lucide-react";
import type { Message } from "./data";

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="h-96 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.type === "user"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-200 text-gray-900"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {message.type === "bot" ? <Bot className="w-4 h-4 text-blue-600" /> : <User className="w-4 h-4" />}
              <span className="text-xs opacity-75">{message.time}</span>
            </div>
            <p className="text-sm whitespace-pre-line">{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
