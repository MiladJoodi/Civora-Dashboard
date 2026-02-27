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
import { suppliers, priorityLabels } from "@/data/mock/warehouse"

interface CreateOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateOrderDialog({ open, onOpenChange }: CreateOrderDialogProps) {
  const [items, setItems] = useState("")
  const [supplier, setSupplier] = useState("")
  const [priority, setPriority] = useState("")
  const [totalAmount, setTotalAmount] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")

  const handleSubmit = () => {
    if (!items.trim() || !supplier) {
      toast.error("لطفا فیلدهای ضروری را پر کنید")
      return
    }

    toast.success("سفارش با موفقیت ثبت شد")
    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setItems("")
    setSupplier("")
    setPriority("")
    setTotalAmount("")
    setDeliveryDate("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ثبت سفارش جدید</DialogTitle>
          <DialogDescription>
            اطلاعات سفارش جدید را وارد کنید.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Items */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              اقلام سفارش <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="مثال: سیمان تیپ ۲، میلگرد ۱۴"
              value={items}
              onChange={(e) => setItems(e.target.value)}
            />
            <p className="text-xs text-gray-400">نام اقلام را با کاما (،) جدا کنید</p>
          </div>

          {/* Supplier */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              تامین‌کننده <span className="text-red-500">*</span>
            </label>
            <Select value={supplier} onValueChange={setSupplier}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="انتخاب تامین‌کننده" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((s) => (
                  <SelectItem key={s.id} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">اولویت</label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="انتخاب اولویت" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(priorityLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Total Amount */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">مبلغ کل (ریال)</label>
            <Input
              type="number"
              placeholder="0"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>

          {/* Delivery Date */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">تاریخ تحویل</label>
            <Input
              placeholder="مثال: ۱۴۰۴/۰۳/۱۵"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={() => {
              resetForm()
              onOpenChange(false)
            }}
            className="w-full sm:w-auto"
          >
            انصراف
          </Button>
          <Button
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white"
          >
            ثبت سفارش
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
