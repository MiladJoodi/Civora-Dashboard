"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { generateId, getInitials } from "@/lib/mock-helpers"
import { TeamMember } from "@/data/mock/users"
import { Loader2 } from "lucide-react"

const roles = [
  "مهندس عمران", "مهندس معمار", "سرکارگر", "اپراتور جرثقیل",
  "تکنسین برق", "جوشکار", "نقشه‌بردار", "حسابدار",
  "مسئول ایمنی", "مدیر پروژه", "ناظر", "کارگر ساده",
  "راننده", "انباردار", "مهندس مکانیک",
]

const departments = [
  "مهندسی", "عملیات", "انبار", "مالی",
  "ایمنی", "دفتر فنی", "مدیریت", "نگهداری",
]

interface CreateMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: (member: TeamMember) => void
}

export function CreateMemberDialog({ open, onOpenChange, onCreated }: CreateMemberDialogProps) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")
  const [department, setDepartment] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = "نام الزامی است"
    if (!email.trim() || !email.includes("@")) newErrors.email = "ایمیل معتبر وارد کنید"
    if (!role) newErrors.role = "نقش الزامی است"
    if (!department) newErrors.department = "بخش الزامی است"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function resetForm() {
    setName("")
    setEmail("")
    setPhone("")
    setRole("")
    setDepartment("")
    setErrors({})
  }

  async function handleSubmit() {
    if (!validate()) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))

    const newMember: TeamMember = {
      id: generateId(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || "۰۹۱۲۰۰۰۰۰۰۰",
      role,
      department,
      status: "active",
      joinDate: "۱۴۰۴/۱۲/۰۸",
      avatar: getInitials(name.trim()),
    }

    onCreated(newMember)
    toast.success(`"${name.trim()}" با موفقیت به تیم اضافه شد`)
    resetForm()
    setLoading(false)
    onOpenChange(false)
  }

  function handleClose(isOpen: boolean) {
    if (!isOpen) resetForm()
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">افزودن عضو جدید</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            اطلاعات عضو جدید تیم را وارد کنید
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              نام و نام خانوادگی <span className="text-red-500">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: محمد احمدی"
              className={errors.name ? "border-red-400" : ""}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                ایمیل <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                dir="ltr"
                className={`text-left ${errors.email ? "border-red-400" : ""}`}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">تلفن</label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="۰۹۱۲۰۰۰۰۰۰۰"
                dir="ltr"
                className="text-left"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                نقش <span className="text-red-500">*</span>
              </label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className={`w-full ${errors.role ? "border-red-400" : ""}`}>
                  <SelectValue placeholder="انتخاب نقش" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                بخش <span className="text-red-500">*</span>
              </label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className={`w-full ${errors.department ? "border-red-400" : ""}`}>
                  <SelectValue placeholder="انتخاب بخش" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:gap-3 mt-2">
          <Button
            variant="outline"
            onClick={() => handleClose(false)}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            انصراف
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                در حال افزودن...
              </>
            ) : (
              "افزودن عضو"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
