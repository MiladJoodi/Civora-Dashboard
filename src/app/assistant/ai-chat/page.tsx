"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, User, Lightbulb, FileText, Calculator } from "lucide-react"
import { useState } from "react"

export default function AiChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "سلام! من دستیار هوشمند سیورا هستم. چگونه می‌توانم به شما کمک کنم؟",
      time: "14:30",
    },
    {
      id: 2,
      type: "user",
      content: "چگونه می‌توانم گزارش پیشرفت پروژه تهیه کنم؟",
      time: "14:32",
    },
    {
      id: 3,
      type: "bot",
      content:
        "برای تهیه گزارش پیشرفت پروژه می‌توانید از بخش 'گزارش‌ها' استفاده کنید. مراحل زیر را دنبال کنید:\n\n1. به بخش گزارش‌ها بروید\n2. گزارش روزانه یا هفتگی را انتخاب کنید\n3. پروژه مورد نظر را انتخاب کنید\n4. اطلاعات پیشرفت را وارد کنید\n\nآیا نیاز به راهنمایی بیشتری دارید؟",
      time: "14:32",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const quickSuggestions = [
    { text: "محاسبه مصالح مورد نیاز", icon: Calculator },
    { text: "راهنمای ایمنی کار", icon: Lightbulb },
    { text: "فرمت گزارش‌نویسی", icon: FileText },
    { text: "مقررات ساختمانی", icon: FileText },
  ]

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

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: "bot" as const,
          content: "متشکرم از سوال شما. در حال پردازش پاسخ هستم...",
          time: new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">چت هوشمند</h1>
          <p className="text-gray-600 mt-2">گفتگو با دستیار هوشمند برای راهنمایی سریع</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Bot className="w-3 h-3" />
          آنلاین
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600" />
              دستیار هوشمند سیورا
            </CardTitle>
            <CardDescription>پاسخ‌های سریع و دقیق برای سوالات شما</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200 text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.type === "bot" ? (
                        <Bot className="w-4 h-4 text-blue-600" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span className="text-xs opacity-75">{message.time}</span>
                    </div>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="پیام خود را بنویسید..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                ارسال
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>پیشنهادات سریع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-right bg-transparent"
                  onClick={() => setNewMessage(suggestion.text)}
                >
                  <suggestion.icon className="w-4 h-4 ml-2" />
                  {suggestion.text}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قابلیت‌های دستیار هوشمند</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <Calculator className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-medium text-blue-900 mb-1">محاسبات فنی</h3>
              <p className="text-sm text-blue-700">محاسبه مصالح، هزینه و زمان پروژه</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <Lightbulb className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-medium text-green-900 mb-1">راهنمایی تخصصی</h3>
              <p className="text-sm text-green-700">مشاوره فنی و حل مسائل ساختمانی</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600 mb-2" />
              <h3 className="font-medium text-orange-900 mb-1">مستندات</h3>
              <p className="text-sm text-orange-700">راهنمای استفاده از سیستم و فرم‌ها</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
