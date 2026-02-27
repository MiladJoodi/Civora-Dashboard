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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { generateId, randomJalaliDate } from "@/lib/mock-helpers"
import { Contract, contractTypeLabels } from "@/data/mock/contracts"
import { Loader2 } from "lucide-react"

interface CreateContractDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: (contract: Contract) => void
}

export function CreateContractDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateContractDialogProps) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [contractor, setContractor] = useState("")
  const [projectName, setProjectName] = useState("")
  const [value, setValue] = useState("")
  const [type, setType] = useState<Contract["type"]>("construction")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")

  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) newErrors.title = "عنوان قرارداد الزامی است"
    if (!contractor.trim()) newErrors.contractor = "نام پیمانکار الزامی است"
    if (!value.trim() || isNaN(Number(value)) || Number(value) <= 0)
      newErrors.value = "ارزش قرارداد باید عدد مثبت باشد"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function resetForm() {
    setTitle("")
    setContractor("")
    setProjectName("")
    setValue("")
    setType("construction")
    setStartDate("")
    setEndDate("")
    setDescription("")
    setErrors({})
  }

  async function handleSubmit() {
    if (!validate()) return

    setLoading(true)

    // Simulate async delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    const newContract: Contract = {
      id: generateId(),
      title: title.trim(),
      contractor: contractor.trim(),
      projectName: projectName.trim() || "پروژه جدید",
      value: Number(value),
      startDate: startDate.trim() || randomJalaliDate(1403, 1404),
      endDate: endDate.trim() || randomJalaliDate(1404, 1405),
      status: "pending",
      progress: 0,
      type,
      attachments: 0,
      lastUpdate: randomJalaliDate(1403, 1404),
      description: description.trim() || "بدون توضیحات",
    }

    onCreated(newContract)
    toast.success("قرارداد جدید با موفقیت ایجاد شد")
    resetForm()
    setLoading(false)
    onOpenChange(false)
  }

  function handleClose(isOpen: boolean) {
    if (!isOpen) {
      resetForm()
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            ایجاد قرارداد جدید
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            اطلاعات قرارداد جدید را وارد کنید
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Row 1: Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              عنوان قرارداد <span className="text-red-500">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: قرارداد اسکلت فلزی"
              className={errors.title ? "border-red-400" : ""}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Row 2: Contractor + Project (2-col on desktop) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                پیمانکار <span className="text-red-500">*</span>
              </label>
              <Input
                value={contractor}
                onChange={(e) => setContractor(e.target.value)}
                placeholder="نام شرکت پیمانکار"
                className={errors.contractor ? "border-red-400" : ""}
              />
              {errors.contractor && (
                <p className="text-xs text-red-500">{errors.contractor}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                پروژه
              </label>
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="نام پروژه"
              />
            </div>
          </div>

          {/* Row 3: Value + Type */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                ارزش قرارداد (ریال) <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="مبلغ به ریال"
                className={errors.value ? "border-red-400" : ""}
                min={0}
              />
              {errors.value && (
                <p className="text-xs text-red-500">{errors.value}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                نوع قرارداد
              </label>
              <Select
                value={type}
                onValueChange={(val) => setType(val as Contract["type"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="انتخاب نوع" />
                </SelectTrigger>
                <SelectContent>
                  {(
                    Object.entries(contractTypeLabels) as [
                      Contract["type"],
                      string,
                    ][]
                  ).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 4: Start + End dates */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                تاریخ شروع
              </label>
              <Input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="مثال: 1403/06/15"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                تاریخ پایان
              </label>
              <Input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="مثال: 1404/06/15"
              />
            </div>
          </div>

          {/* Row 5: Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              توضیحات
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="توضیحات قرارداد را وارد کنید..."
              rows={3}
            />
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
                در حال ایجاد...
              </>
            ) : (
              "ایجاد قرارداد"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
