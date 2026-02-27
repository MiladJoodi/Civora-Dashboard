"use client"

import { useState } from "react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Monitor, Save, Loader2, Palette, Globe, Calendar, Bell, Database } from "lucide-react"

export function SystemSettings() {
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("light")
  const [language, setLanguage] = useState("fa")
  const [dateFormat, setDateFormat] = useState("jalali")
  const [compactMode, setCompactMode] = useState(false)
  const [animations, setAnimations] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState("30")
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    toast.success("تنظیمات سیستم با موفقیت ذخیره شد")
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="تنظیمات سیستم"
        description="مدیریت تم، زبان و تنظیمات نمایش سیستم"
        Icon={Monitor}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-purple-500" />
              <CardTitle className="text-base">ظاهر و نمایش</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">تم رابط کاربری</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "light" as const, label: "روشن", preview: "bg-white border-2" },
                  { value: "dark" as const, label: "تاریک", preview: "bg-gray-800 border-2" },
                  { value: "auto" as const, label: "خودکار", preview: "bg-gradient-to-l from-gray-800 to-white border-2" },
                ].map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    className={`flex flex-col items-center gap-2 rounded-lg p-3 transition-all ${
                      theme === t.value
                        ? "ring-2 ring-orange-500 ring-offset-2"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className={`h-12 w-full rounded-md ${t.preview} ${
                      theme === t.value ? "border-orange-300" : "border-gray-200"
                    }`} />
                    <span className="text-xs font-medium text-gray-700">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">حالت فشرده</p>
                <p className="text-xs text-gray-500">کاهش فاصله بین عناصر</p>
              </div>
              <Switch checked={compactMode} onCheckedChange={setCompactMode} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">انیمیشن‌ها</p>
                <p className="text-xs text-gray-500">فعال/غیرفعال کردن انیمیشن‌های رابط</p>
              </div>
              <Switch checked={animations} onCheckedChange={setAnimations} />
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-base">زبان و منطقه</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">زبان رابط کاربری</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fa">فارسی</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربیة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">فرمت تاریخ</label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jalali">شمسی (جلالی)</SelectItem>
                  <SelectItem value="gregorian">میلادی</SelectItem>
                  <SelectItem value="hijri">هجری قمری</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3">
              <Calendar className="h-4 w-4 text-blue-500 shrink-0" />
              <p className="text-xs text-blue-700">
                تقویم فعلی: شمسی (هجری خورشیدی) — منطقه زمانی: ایران (UTC+3:30)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-base">اعلان‌ها و هشدارها</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">صدای اعلان</p>
                <p className="text-xs text-gray-500">پخش صدا هنگام دریافت اعلان</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">اعلان‌های دسکتاپ</p>
                <p className="text-xs text-gray-500">نمایش اعلان در دسکتاپ</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">خلاصه روزانه</p>
                <p className="text-xs text-gray-500">ارسال خلاصه فعالیت‌ها هر روز</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Data & Performance */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-green-500" />
              <CardTitle className="text-base">داده‌ها و عملکرد</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">بروزرسانی خودکار</p>
                <p className="text-xs text-gray-500">بروزرسانی خودکار داده‌های داشبورد</p>
              </div>
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            </div>

            {autoRefresh && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">فاصله بروزرسانی</label>
                <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">هر ۱۵ ثانیه</SelectItem>
                    <SelectItem value="30">هر ۳۰ ثانیه</SelectItem>
                    <SelectItem value="60">هر ۱ دقیقه</SelectItem>
                    <SelectItem value="300">هر ۵ دقیقه</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">ذخیره‌سازی محلی</p>
                <p className="text-xs text-gray-500">کش داده‌ها برای عملکرد بهتر</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Button
              variant="outline"
              className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => {
                toast.success("کش محلی با موفقیت پاک شد")
              }}
            >
              پاک‌سازی کش محلی
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8"
        >
          {saving ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              در حال ذخیره...
            </>
          ) : (
            <>
              <Save className="ml-2 h-4 w-4" />
              ذخیره تنظیمات
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
