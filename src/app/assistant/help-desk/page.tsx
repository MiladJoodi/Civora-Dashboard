"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, Plus, Clock, CheckCircle, AlertTriangle, User } from "lucide-react"
import { useState } from "react"

export default function HelpDeskPage() {
  const [tickets, setTickets] = useState([
    {
      id: "T-001",
      title: "مشکل در دسترسی به فایل‌های پروژه",
      description: "نمی‌توانم به فایل‌های پروژه برج سیورا دسترسی پیدا کنم",
      priority: "high",
      status: "open",
      category: "فنی",
      assignee: "تیم پشتیبانی",
      createdAt: "1403/07/15 - 14:30",
      updatedAt: "1403/07/15 - 15:45",
    },
    {
      id: "T-002",
      title: "خطا در سیستم ثبت حضور و غیاب",
      description: "هنگام ثبت حضور پیام خطا نمایش داده می‌شود",
      priority: "medium",
      status: "in-progress",
      category: "سیستم",
      assignee: "احمد محمدی",
      createdAt: "1403/07/14 - 09:15",
      updatedAt: "1403/07/15 - 10:20",
    },
    {
      id: "T-003",
      title: "درخواست دسترسی به گزارش‌های مالی",
      description: "نیاز به دسترسی برای مشاهده گزارش‌های مالی پروژه",
      priority: "low",
      status: "resolved",
      category: "دسترسی",
      assignee: "مریم کریمی",
      createdAt: "1403/07/13 - 11:00",
      updatedAt: "1403/07/14 - 16:30",
    },
  ])

  const [showNewTicket, setShowNewTicket] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "باز"
      case "in-progress":
        return "در حال بررسی"
      case "resolved":
        return "حل شده"
      default:
        return "نامشخص"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "بالا"
      case "medium":
        return "متوسط"
      case "low":
        return "پایین"
      default:
        return "نامشخص"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">میز کمک</h1>
          <p className="text-gray-600 mt-2">ارسال درخواست کمک و پیگیری تیکت‌ها</p>
        </div>
        <Button onClick={() => setShowNewTicket(!showNewTicket)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          تیکت جدید
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">تیکت‌های باز</CardTitle>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{tickets.filter((t) => t.status === "open").length}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">در حال بررسی</CardTitle>
            <Clock className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {tickets.filter((t) => t.status === "in-progress").length}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">حل شده</CardTitle>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {tickets.filter((t) => t.status === "resolved").length}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">کل تیکت‌ها</CardTitle>
            <HelpCircle className="w-5 h-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{tickets.length}</div>
          </CardContent>
        </Card>
      </div>

      {showNewTicket && (
        <Card>
          <CardHeader>
            <CardTitle>ایجاد تیکت جدید</CardTitle>
            <CardDescription>درخواست کمک یا گزارش مشکل</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">عنوان</label>
                <Input placeholder="عنوان مشکل یا درخواست" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">دسته‌بندی</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب دسته‌بندی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">فنی</SelectItem>
                    <SelectItem value="system">سیستم</SelectItem>
                    <SelectItem value="access">دسترسی</SelectItem>
                    <SelectItem value="other">سایر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">اولویت</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب اولویت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">بالا</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="low">پایین</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1 block">توضیحات</label>
                <Textarea placeholder="توضیح کاملی از مشکل یا درخواست خود ارائه دهید..." rows={4} />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <Button>ارسال تیکت</Button>
                <Button variant="outline" onClick={() => setShowNewTicket(false)}>
                  انصراف
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>تیکت‌های من</CardTitle>
          <CardDescription>لیست درخواست‌ها و وضعیت آن‌ها</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900">#{ticket.id}</span>
                      <h3 className="font-medium text-gray-900">{ticket.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {ticket.assignee}
                      </span>
                      <span>ایجاد: {ticket.createdAt}</span>
                      <span>بروزرسانی: {ticket.updatedAt}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getStatusColor(ticket.status)}>{getStatusText(ticket.status)}</Badge>
                    <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                      {getPriorityText(ticket.priority)}
                    </Badge>
                    <Badge variant="outline">{ticket.category}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
