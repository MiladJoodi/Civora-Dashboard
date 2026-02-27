"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/shared/Sidebar/Sidebar"
import { GlobalHeader } from "@/components/shared/GlobalHeader/GlobalHeader"
import Footer from "@/components/shared/Footer/Footer"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <GlobalHeader />
        <main className="bg-white flex-1 overflow-y-auto p-3">
          <div className="container mx-auto animate-fade-in-up">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
