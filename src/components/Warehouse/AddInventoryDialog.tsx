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
import { categoryLabels } from "@/data/mock/warehouse"

interface AddInventoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddInventoryDialog({ open, onOpenChange }: AddInventoryDialogProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState("")
  const [unit, setUnit] = useState("")
  const [minStock, setMinStock] = useState("")
  const [maxStock, setMaxStock] = useState("")
  const [location, setLocation] = useState("")
  const [unitPrice, setUnitPrice] = useState("")

  const handleSubmit = () => {
    if (!name.trim() || !category || !unit.trim()) {
      toast.error("لطفا فیلدهای ضروری را پر کنید")
      return
    }

    toast.success(`کالای "${name}" با موفقیت اضافه شد`)
    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setName("")
    setCategory("")
    setStock("")
    setUnit("")
    setMinStock("")
    setMaxStock("")
    setLocation("")
    setUnitPrice("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>افزودن کالای جدید</DialogTitle>
          <DialogDescription>
            اطلاعات کالای جدید را وارد کنید.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              نام کالا <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="مثال: سیمان تیپ ۲"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              دسته‌بندی <span className="text-red-500">*</span>
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="انتخاب دسته‌بندی" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stock and Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">موجودی اولیه</label>
              <Input
                type="number"
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                واحد <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="مثال: تن، عدد، متر"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
          </div>

          {/* Min / Max Stock */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">حداقل موجودی</label>
              <Input
                type="number"
                placeholder="0"
                value={minStock}
                onChange={(e) => setMinStock(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">حداکثر موجودی</label>
              <Input
                type="number"
                placeholder="0"
                value={maxStock}
                onChange={(e) => setMaxStock(e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">موقعیت</label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="انتخاب محل نگهداری" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="انبار A">انبار A</SelectItem>
                <SelectItem value="انبار B">انبار B</SelectItem>
                <SelectItem value="انبار C">انبار C</SelectItem>
                <SelectItem value="محوطه">محوطه</SelectItem>
                <SelectItem value="سوله شمالی">سوله شمالی</SelectItem>
                <SelectItem value="سوله جنوبی">سوله جنوبی</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Unit Price */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">قیمت واحد (ریال)</label>
            <Input
              type="number"
              placeholder="0"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
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
            افزودن کالا
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
