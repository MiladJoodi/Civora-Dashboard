"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, User, Lightbulb, FileText, Calculator } from "lucide-react"
import { useState } from "react"
import AiChatHeader from "@/components/Assistant/Ai-Chat/AiChatHeader/AiChatHeader"
import { assistantFeatures, initialMessages, quickSuggestions } from "@/components/Assistant/Ai-Chat/data"
import ChatMessages from "@/components/Assistant/Ai-Chat/ChatMessages"
import ChatInput from "@/components/Assistant/Ai-Chat/ChatInput"
import QuickSuggestions from "@/components/Assistant/Ai-Chat/QuickSuggestions"
import AssistantFeatures from "@/components/Assistant/Ai-Chat/AssistantFeatures"

export default function AiChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)


  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        type: "user" as const,
        content: newMessage,
        time: new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, userMessage])
      setNewMessage("")
      setIsTyping(true)

      // Simulate bot response with typing indicator
      setTimeout(() => {
        setIsTyping(false)
        const botResponse = {
          id: messages.length + 2,
          type: "bot" as const,
          content: "متشکرم از سوال شما. در حال پردازش پاسخ هستم...",
          time: new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1500)
    }
  }

  return (
    <div className="space-y-6">
      <AiChatHeader />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardContent>
            <ChatMessages messages={messages} />
            {isTyping && (
              <div className="flex items-center gap-2 px-4 py-2 text-gray-500 text-sm">
                <Bot className="h-4 w-4" />
                <span>در حال تایپ</span>
                <span className="flex gap-1">
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gray-400 inline-block" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gray-400 inline-block" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gray-400 inline-block" />
                </span>
              </div>
            )}
            <ChatInput value={newMessage} onChange={setNewMessage} onSend={handleSendMessage} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>پیشنهادات سریع</CardTitle>
          </CardHeader>
          <CardContent>
            <QuickSuggestions suggestions={quickSuggestions} onSelect={setNewMessage} />
          </CardContent>
        </Card>
      </div>

      <AssistantFeatures features={assistantFeatures} />

    </div>
  )
}
