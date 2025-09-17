import type React from "react"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/shared/Sidebar/Sidebar"
import Footer from "@/components/shared/Footer/Footer"
import { GlobalHeader } from "@/components/shared/GlobalHeader/GlobalHeader"


const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "Civora - سیستم مدیریت پروژه",
  description: "سیستم مدیریت پروژه‌های ساختمانی",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.className} font-sans antialiased`}>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar سمت راست */}
          <Sidebar />

          {/* بخش اصلی سمت چپ */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <GlobalHeader />
            <main className="bg-white flex-1 overflow-y-auto">
              {children}
            <Footer />
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
