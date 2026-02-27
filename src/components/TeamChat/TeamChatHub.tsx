"use client"

import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { StatsGrid } from "@/components/shared/StatsGrid/StatsGrid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Hash, Users, ArrowLeft, Circle, Mail } from "lucide-react"
import { channels, directContacts } from "@/data/mock/chat"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import Link from "next/link"

const onlineCount = directContacts.filter((c) => c.online).length
const totalUnread = channels.reduce((sum, ch) => sum + ch.unread, 0) + directContacts.reduce((sum, c) => sum + c.unread, 0)

const stats = [
  { title: "کانال‌ها", value: channels.length, icon: Hash, color: "text-blue-500" },
  { title: "اعضای آنلاین", value: onlineCount, icon: Users, color: "text-green-500" },
  { title: "پیام‌های خوانده نشده", value: totalUnread, icon: Mail, color: "text-orange-500" },
  { title: "مخاطبان مستقیم", value: directContacts.length, icon: MessageSquare, color: "text-purple-500" },
]

const quickLinks = [
  { title: "کانال‌ها", description: "مشاهده و مدیریت کانال‌های گفتگو", href: "/team-chat/channels", icon: Hash },
  { title: "پیام‌های مستقیم", description: "گفتگوی مستقیم با اعضای تیم", href: "/team-chat/direct", icon: MessageSquare },
]

export function TeamChatHub() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="چت تیمی"
        description="ارتباط و هماهنگی با اعضای تیم پروژه"
        Icon={MessageSquare}
      />

      <StatsGrid stats={stats} />

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link key={link.href} href={link.href}>
              <Card className="hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer h-full">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="rounded-xl bg-orange-50 p-3 shrink-0">
                    <Icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{link.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{link.description}</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-400 shrink-0 mr-auto" />
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Recent Channels */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">کانال‌های اخیر</CardTitle>
          <Link href="/team-chat/channels" className="text-sm text-orange-600 hover:text-orange-700 transition-colors">
            مشاهده همه
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {channels.slice(0, 6).map((channel) => (
              <Link key={channel.id} href="/team-chat/channels">
                <div className="flex flex-col gap-2 p-4 rounded-lg border border-gray-100 hover:bg-orange-50/50 hover:border-orange-200 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="rounded-lg bg-orange-100 p-1.5 shrink-0">
                        <Hash className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="font-semibold text-gray-900 text-sm truncate">{channel.name}</span>
                    </div>
                    {channel.unread > 0 && (
                      <Badge className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                        {toPersianNumber(channel.unread)}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{channel.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {toPersianNumber(channel.members)} عضو
                    </span>
                    <span>{channel.lastMessageTime}</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate border-t border-gray-50 pt-2">{channel.lastMessage}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Direct Contacts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">مخاطبان اخیر</CardTitle>
          <Link href="/team-chat/direct" className="text-sm text-orange-600 hover:text-orange-700 transition-colors">
            مشاهده همه
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {directContacts.slice(0, 6).map((contact) => (
              <Link key={contact.id} href="/team-chat/direct">
                <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:bg-orange-50/50 hover:border-orange-200 transition-all cursor-pointer">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-sm">
                      {contact.avatar}
                    </div>
                    <Circle
                      className={`absolute -bottom-0.5 -left-0.5 h-3.5 w-3.5 ${
                        contact.online ? "text-green-500 fill-green-500" : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 text-sm truncate">{contact.name}</span>
                      {contact.unread > 0 && (
                        <Badge className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                          {toPersianNumber(contact.unread)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{contact.role}</p>
                    <p className="text-xs text-gray-500 truncate mt-1">{contact.lastMessage}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
