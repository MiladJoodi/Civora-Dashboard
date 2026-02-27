"use client"

import { useState } from "react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Hash, Send, Users } from "lucide-react"
import { channels, sampleMessages, type Channel, type ChatMessage } from "@/data/mock/chat"
import { toPersianNumber } from "@/lib/ToPersianNumber"

export function ChannelsView() {
  const [selectedChannel, setSelectedChannel] = useState<Channel>(channels[0])
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSend = () => {
    if (!newMessage.trim()) return
    const msg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: "شما",
      avatar: "م",
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    }
    setMessages((prev) => [...prev, msg])
    setNewMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="کانال‌ها"
        description="کانال‌های گفتگوی تیم پروژه"
        Icon={Hash}
      />

      <div className="flex flex-col lg:flex-row gap-4 min-h-[600px]">
        {/* Channel List - horizontal scroll on mobile, sidebar on desktop */}
        <div className="lg:w-72 xl:w-80 shrink-0">
          {/* Mobile: horizontal scrollable list */}
          <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border whitespace-nowrap text-sm transition-all shrink-0 ${
                  selectedChannel.id === channel.id
                    ? "bg-orange-50 border-orange-300 text-orange-700"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Hash className="h-3.5 w-3.5 shrink-0" />
                <span className="font-medium">{channel.name}</span>
                {channel.unread > 0 && (
                  <Badge className="bg-orange-500 text-white text-[10px] px-1.5 py-0 rounded-full">
                    {toPersianNumber(channel.unread)}
                  </Badge>
                )}
              </button>
            ))}
          </div>

          {/* Desktop: vertical sidebar list */}
          <Card className="hidden lg:block h-full">
            <CardContent className="p-2 space-y-1">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    selectedChannel.id === channel.id
                      ? "bg-orange-50 border border-orange-200 text-orange-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Hash className="h-4 w-4 shrink-0 text-gray-400" />
                    <div className="text-right min-w-0">
                      <p className="font-medium truncate">{channel.name}</p>
                      <p className="text-xs text-gray-400 truncate">{channel.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {channel.unread > 0 && (
                      <Badge className="bg-orange-500 text-white text-[10px] px-1.5 py-0 rounded-full">
                        {toPersianNumber(channel.unread)}
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col min-h-0">
          {/* Channel Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-orange-100 p-1.5">
                <Hash className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{selectedChannel.name}</h3>
                <p className="text-xs text-gray-400">{selectedChannel.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Users className="h-3.5 w-3.5" />
              <span>{toPersianNumber(selectedChannel.members)} عضو</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isOwn ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    msg.isOwn
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {msg.avatar}
                </div>
                <div className={`max-w-[75%] ${msg.isOwn ? "items-end" : "items-start"} flex flex-col`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-700">{msg.sender}</span>
                    <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                  </div>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.isOwn
                        ? "bg-orange-500 text-white rounded-tl-sm"
                        : "bg-gray-100 text-gray-800 rounded-tr-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex items-center gap-2 px-4 sm:px-6 py-3 border-t border-gray-100">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="پیام خود را بنویسید..."
              className="flex-1 text-sm"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="bg-orange-500 hover:bg-orange-600 shrink-0"
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
