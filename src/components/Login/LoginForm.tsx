"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/store/auth-store"
import { demoUsers, roleLabels } from "./login-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { LogIn, Loader2, Eye, EyeOff } from "lucide-react"
import type { Role } from "@/store/auth-store"

export function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [attempted, setAttempted] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setAttempted(true)

    if (!email || !password || !role) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 600))

    const demoUser = demoUsers.find((u) => u.role === role)
    if (demoUser) {
      login({ ...demoUser, email })
      router.push("/")
    }

    setIsLoading(false)
  }

  const fillDemoUser = (selectedRole: Role) => {
    const user = demoUsers.find((u) => u.role === selectedRole)
    if (user) {
      setEmail(user.email)
      setPassword("demo1234")
      setRole(selectedRole)
      setAttempted(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-0 shadow-xl">
      {/* Logo area */}
      <CardHeader className="items-center text-center pb-2">
        <div className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg">
          <span className="text-xl sm:text-2xl font-bold text-white">C</span>
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
          سیوُرا
        </CardTitle>
        <CardDescription className="text-gray-500 text-sm">
          سیستم مدیریت پروژه‌های ساختمانی
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              ایمیل
            </label>
            <Input
              id="email"
              type="email"
              placeholder="example@civora.ir"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
              className={cn(
                "text-left h-10 sm:h-11",
                attempted && !email && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
              )}
            />
            {attempted && !email && (
              <span className="text-xs text-red-500">ایمیل الزامی است</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              رمز عبور
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="رمز عبور خود را وارد کنید"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  "h-10 sm:h-11 pl-10",
                  attempted && !password && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
            {attempted && !password && (
              <span className="text-xs text-red-500">رمز عبور الزامی است</span>
            )}
          </div>

          {/* Role selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">نقش کاربری</label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger
                className={cn(
                  "w-full h-10 sm:h-11",
                  attempted && !role && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                )}
              >
                <SelectValue placeholder="نقش خود را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">{roleLabels.admin}</SelectItem>
                <SelectItem value="manager">{roleLabels.manager}</SelectItem>
                <SelectItem value="engineer">{roleLabels.engineer}</SelectItem>
                <SelectItem value="viewer">{roleLabels.viewer}</SelectItem>
              </SelectContent>
            </Select>
            {attempted && !role && (
              <span className="text-xs text-red-500">انتخاب نقش الزامی است</span>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 h-10 sm:h-11 w-full bg-gradient-to-l from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600 hover:to-amber-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                در حال ورود...
              </>
            ) : (
              <>
                <LogIn className="size-4" />
                ورود به سیستم
              </>
            )}
          </Button>

          {/* Quick Demo Users */}
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-3">ورود سریع با حساب آزمایشی</p>
            <div className="grid grid-cols-2 gap-2">
              {demoUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => fillDemoUser(user.role)}
                  className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 transition-colors text-right"
                >
                  <span className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-700 shrink-0">
                    {user.avatar}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">{user.name}</p>
                    <p className="text-[10px] text-gray-400">{roleLabels[user.role]}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
