import { ArrowLeft, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const RecentActivitiesCardFooter = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const handleRefresh = () => {
    setIsUpdating(true)
    setTimeout(() => {
      setIsUpdating(false)
      setLastUpdated(new Date())
    }, 2000)
  }

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center justify-between mt-6 pt-4 border-t border-gray-200/50">
      
      {/* به‌روز شدن پویا */}
      <button 
        onClick={handleRefresh} 
        className="hidden sm:flex text-sm text-gray-600 items-center gap-2 cursor-pointer
                   transition-colors duration-200 hover:bg-blue-50 rounded-xl px-2 py-1"
      >
        <RotateCw className={`w-4 h-4 text-orange-400 transition-transform ${isUpdating ? "animate-spin" : ""}`} />
        <span className="transition-all duration-200">
          {isUpdating ? "در حال به‌روزرسانی..." : lastUpdated ? `آخرین به‌روزرسانی: ${lastUpdated.toLocaleTimeString("fa-IR")}` : "به‌روز شده در لحظه"}
        </span>
      </button>

      <Button className="group w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-sm text-orange-600 hover:text-orange-700 font-normal transition-all duration-200 cursor-pointer">
        مشاهده همه فعالیت‌ها
        <ArrowLeft className="w-3 h-3 transform transition-transform duration-200 group-hover:-translate-x-1" />
      </Button>
    </div>
  )
}

export default RecentActivitiesCardFooter
