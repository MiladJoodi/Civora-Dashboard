import type React from "react"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/store/auth-store"
import { DashboardShell } from "@/components/shared/DashboardShell"
import { Toaster } from "sonner"

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
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
      <body className={`${vazirmatn.variable} font-sans antialiased`}>
        <AuthProvider>
          <DashboardShell>
            {children}
          </DashboardShell>
          <Toaster position="top-left" dir="rtl" richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  )
}
