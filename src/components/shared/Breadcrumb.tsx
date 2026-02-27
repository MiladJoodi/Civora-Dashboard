"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { routeLabels } from "@/lib/constants"

export function Breadcrumb() {
  const pathname = usePathname()

  if (pathname === "/" || pathname === "/login") return null

  const segments = pathname.split("/").filter(Boolean)

  const crumbs = segments.map((segment, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/")
    const label = routeLabels[segment] ?? segment
    const isLast = index === segments.length - 1

    return { path, label, isLast }
  })

  return (
    <nav className="flex items-center gap-1 text-sm text-gray-600 font-medium overflow-x-auto whitespace-nowrap">
      <Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors shrink-0">
        {routeLabels[""]}
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.path} className="flex items-center gap-1 shrink-0">
          <ChevronLeft className="h-3.5 w-3.5 text-gray-300 rotate-180" />
          {crumb.isLast ? (
            <span className="text-gray-800">{crumb.label}</span>
          ) : (
            <Link href={crumb.path} className="text-gray-400 hover:text-orange-500 transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
