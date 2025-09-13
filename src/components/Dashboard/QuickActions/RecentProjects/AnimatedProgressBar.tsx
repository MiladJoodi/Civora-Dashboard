"use client"

import { useEffect, useState } from "react"
import { toPersianNumber } from "@/lib/ToPersianNumber"

interface AnimatedProgressBarProps {
  progress: number
  color?: string
  className?: string
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  progress,
  color = "#da8439",
  className,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setCurrentProgress(progress), 100);
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className={`text-right ${className}`}>
      <p className="text-sm text-center font-medium text-gray-900">
        {toPersianNumber(currentProgress)}%
      </p>

      <div dir="ltr" className="relative w-full sm:w-40 h-3 mt-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="relative h-full rounded-full transition-all duration-1000 ease-out overflow-hidden"
          style={{ width: `${currentProgress}%`, backgroundColor: color }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="wave-mask" />
          </div>
        </div>
      </div>
    </div>
  )
}
