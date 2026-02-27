"use client"

import { useState, useMemo } from "react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, Search, Circle } from "lucide-react"
import { directContacts, sampleMessages, type DirectContact, type ChatMessage } from "@/data/mock/chat"
import { toPersianNumber } from "@/lib/ToPersianNumber"

export function DirectMessagesView() {
  const [selectedContact, setSelectedContact] = useState<DirectContact>(directContacts[0])
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return directContacts
    return directContacts.filter(
      (c) =>
        c.name.includes(searchQuery) ||
        c.role.includes(searchQuery)
    )
  }, [searchQuery])

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
        title="پیام‌های مستقیم"
        description="گفتگوی مستقیم با اعضای تیم"
        Icon={MessageSquare}
      />

      <div className="flex flex-col lg:flex-row gap-4 min-h-[600px]">
        {/* Contact List Sidebar */}
        <div className="lg:w-72 xl:w-80 shrink-0">
          {/* Mobile: horizontal scrollable contact list */}
          <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {directContacts.slice(0, 15).map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border whitespace-nowrap text-sm transition-all shrink-0 ${
                  selectedContact.id === contact.id
                    ? "bg-orange-50 border-orange-300 text-orange-700"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-xs">
                    {contact.avatar}
                  </div>
                  <Circle
                    className={`absolute -bottom-0.5 -left-0.5 h-2.5 w-2.5 ${
                      contact.online ? "text-green-500 fill-green-500" : "text-gray-300 fill-gray-300"
                    }`}
                  />
                </div>
                <span className="font-medium">{contact.name}</span>
                {contact.unread > 0 && (
                  <Badge className="bg-orange-500 text-white text-[10px] px-1.5 py-0 rounded-full">
                    {toPersianNumber(contact.unread)}
                  </Badge>
                )}
              </button>
            ))}
          </div>

          {/* Desktop: vertical sidebar */}
          <Card className="hidden lg:flex flex-col h-full">
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجوی مخاطب..."
                  className="pr-9 text-sm"
                />
              </div>
            </div>
            <CardContent className="p-2 flex-1 overflow-y-auto space-y-0.5">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    selectedContact.id === contact.id
                      ? "bg-orange-50 border border-orange-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-sm">
                      {contact.avatar}
                    </div>
                    <Circle
                      className={`absolute -bottom-0.5 -left-0.5 h-3 w-3 ${
                        contact.online ? "text-green-500 fill-green-500" : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  </div>
                  <div className="flex-1 text-right min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 truncate">{contact.name}</span>
                      {contact.unread > 0 && (
                        <Badge className="bg-orange-500 text-white text-[10px] px-1.5 py-0 rounded-full shrink-0">
                          {toPersianNumber(contact.unread)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate">{contact.role}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{contact.lastMessage}</p>
                  </div>
                </button>
              ))}
              {filteredContacts.length === 0 && (
                <div className="text-center text-sm text-gray-400 py-8">
                  مخاطبی یافت نشد
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col min-h-0">
          {/* Contact Header */}
          <div className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-gray-100">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-sm">
                {selectedContact.avatar}
              </div>
              <Circle
                className={`absolute -bottom-0.5 -left-0.5 h-3.5 w-3.5 ${
                  selectedContact.online ? "text-green-500 fill-green-500" : "text-gray-300 fill-gray-300"
                }`}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">{selectedContact.name}</h3>
              <p className="text-xs text-gray-400">
                {selectedContact.role}
                <span className="mx-1.5">·</span>
                <span className={selectedContact.online ? "text-green-500" : "text-gray-400"}>
                  {selectedContact.online ? "آنلاین" : "آفلاین"}
                </span>
              </p>
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
              placeholder={`پیام به ${selectedContact.name}...`}
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
