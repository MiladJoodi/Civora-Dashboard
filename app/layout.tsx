import type React from "react"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"


const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  display: "swap",
  weight: ["400", "500", "700"],
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
            {/* <Header /> */}
            <main className="bg-white flex-1 overflow-y-auto px-6 py-3">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
