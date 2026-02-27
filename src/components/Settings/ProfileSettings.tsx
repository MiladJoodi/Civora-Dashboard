"use client"

import { useState, useEffect } from "react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/store/auth-store"
import { toast } from "sonner"
import { User, Save, Loader2 } from "lucide-react"

const avatarOptions = ["م", "ا", "س", "ح", "ر", "ن", "ف", "ک"]
const avatarColors = [
  "bg-orange-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-teal-500",
  "bg-pink-500",
  "bg-indigo-500",
]

export function ProfileSettings() {
  const { user, login } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState("")
  const [selectedColor, setSelectedColor] = useState("bg-orange-500")
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(true)
  const [smsNotif, setSmsNotif] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setSelectedAvatar(user.avatar)
    }
  }, [user])

  async function handleSave() {
    if (!name.trim()) {
      toast.error("نام نمی‌تواند خالی باشد")
      return
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("ایمیل معتبر وارد کنید")
      return
    }

    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))

    if (user) {
      login({
        ...user,
        name: name.trim(),
        email: email.trim(),
        avatar: selectedAvatar,
      })
    }

    toast.success("تغییرات پروفایل با موفقیت ذخیره شد")
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="پروفایل کاربری"
        description="ویرایش اطلاعات شخصی و تنظیمات اعلان‌ها"
        Icon={User}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Avatar Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">تصویر پروفایل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div
                className={`h-24 w-24 rounded-full ${selectedColor} flex items-center justify-center text-white text-3xl font-bold`}
              >
                {selectedAvatar || name.charAt(0) || "م"}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">انتخاب حرف</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {avatarOptions.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedAvatar(letter)}
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      selectedAvatar === letter
                        ? "bg-orange-500 text-white ring-2 ring-orange-300 ring-offset-2"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">انتخاب رنگ</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {avatarColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`h-8 w-8 rounded-full ${color} transition-all ${
                      selectedColor === color
                        ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
                        : "hover:scale-105"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Info + Notifications */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">اطلاعات شخصی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    نام و نام خانوادگی
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="نام خود را وارد کنید"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">ایمیل</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    dir="ltr"
                    className="text-left"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">نقش</label>
                  <Input
                    value={user?.role === "admin" ? "مدیر سیستم" : user?.role === "manager" ? "مدیر پروژه" : user?.role === "engineer" ? "مهندس" : "ناظر"}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">شناسه کاربری</label>
                  <Input
                    value={user?.id ?? ""}
                    disabled
                    dir="ltr"
                    className="text-left bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">تنظیمات اعلان‌ها</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">اعلان‌های ایمیلی</p>
                  <p className="text-xs text-gray-500">دریافت ایمیل برای فعالیت‌های مهم</p>
                </div>
                <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">اعلان‌های پوش</p>
                  <p className="text-xs text-gray-500">دریافت اعلان در مرورگر</p>
                </div>
                <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">اعلان‌های پیامکی</p>
                  <p className="text-xs text-gray-500">دریافت پیامک برای هشدارهای فوری</p>
                </div>
                <Switch checked={smsNotif} onCheckedChange={setSmsNotif} />
              </div>
            </CardContent>
          </Card>

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
                  ذخیره تغییرات
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
