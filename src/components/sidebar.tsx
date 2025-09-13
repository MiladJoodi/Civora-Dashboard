"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Home,
  MessageSquare,
  Users,
  FileText,
  Settings,
  BarChart3,
  Briefcase,
  Building,
  Bell,
  ChevronDown,
  ChevronUp,
  User,
  PanelRightOpen,
} from "lucide-react"

const menuItems = [
  { id: "home", label: "صفحه اصلی", icon: Home, route: "/", submenus: [] },
  {
    id: "assistant",
    label: "دستیار",
    icon: MessageSquare,
    route: "/assistant",
    submenus: [
      { id: "ai-chat", label: "چت هوشمند", route: "/assistant/ai-chat" },
      { id: "help-desk", label: "میز کمک", route: "/assistant/help-desk" },
    ],
  },
  {
    id: "team-chat",
    label: "چت تیمی",
    icon: Users,
    route: "/team-chat",
    submenus: [
      { id: "channels", label: "کانال‌ها", route: "/team-chat/channels" },
      { id: "direct-messages", label: "پیام‌های مستقیم", route: "/team-chat/direct" },
    ],
  },
  {
    id: "contracts",
    label: "قرارداد ها",
    icon: FileText,
    route: "/contracts",
    submenus: [
      { id: "active-contracts", label: "قراردادهای فعال", route: "/contracts/active" },
      { id: "pending-contracts", label: "قراردادهای در انتظار", route: "/contracts/pending" },
      { id: "completed-contracts", label: "قراردادهای تکمیل شده", route: "/contracts/completed" },
    ],
  },
  {
    id: "operations",
    label: "عملیات",
    icon: Settings,
    route: "/operations",
    submenus: [
      { id: "daily-operations", label: "عملیات روزانه", route: "/operations/daily" },
      { id: "maintenance", label: "نگهداری", route: "/operations/maintenance" },
    ],
  },
  {
    id: "technical-office",
    label: "دفتر فنی پروژه",
    icon: Briefcase,
    route: "/technical-office",
    submenus: [
      { id: "project-management", label: "مدیریت پروژه", route: "/technical-office/projects" },
      { id: "technical-docs", label: "اسناد فنی", route: "/technical-office/docs" },
      { id: "quality-control", label: "کنترل کیفیت", route: "/technical-office/quality" },
    ],
  },
  {
    id: "reports",
    label: "گزارش روزانه",
    icon: BarChart3,
    route: "/reports",
    submenus: [
      { id: "daily-reports", label: "گزارش‌های روزانه", route: "/reports/daily" },
      { id: "weekly-reports", label: "گزارش‌های هفتگی", route: "/reports/weekly" },
      { id: "monthly-reports", label: "گزارش‌های ماهانه", route: "/reports/monthly" },
    ],
  },
  {
    id: "news",
    label: "اخبار",
    icon: Bell,
    route: "/news",
    submenus: [
      { id: "company-news", label: "اخبار شرکت", route: "/news/company" },
      { id: "industry-news", label: "اخبار صنعت", route: "/news/industry" },
    ],
  },
  {
    id: "warehouse",
    label: "مخزن و انبار",
    icon: Building,
    route: "/warehouse",
    submenus: [
      { id: "inventory", label: "موجودی انبار", route: "/warehouse/inventory" },
      { id: "orders", label: "سفارشات", route: "/warehouse/orders" },
      { id: "suppliers", label: "تامین کنندگان", route: "/warehouse/suppliers" },
    ],
  },
  {
    id: "settings",
    label: "تنظیمات",
    icon: Settings,
    route: "/settings",
    submenus: [
      { id: "profile", label: "پروفایل کاربری", route: "/settings/profile" },
      { id: "system", label: "تنظیمات سیستم", route: "/settings/system" },
      { id: "permissions", label: "مجوزها", route: "/settings/permissions" },
    ],
  },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const currentMenu = menuItems.find((item) => {
      return item.submenus.some((submenu) => pathname === submenu.route || pathname.startsWith(submenu.route + "/"))
    })

    if (currentMenu && !expandedMenus.includes(currentMenu.id)) {
      setExpandedMenus((prev) => [...prev, currentMenu.id])
    }
  }, [pathname])

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus((prev) => (prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]))
  }

  const handleNavigation = (route: string) => {
    router.push(route)
  }

  const isActive = (route: string) => {
    return pathname === route || pathname.startsWith(route + "/")
  }

  return (
    <div
  style={{ backgroundColor: '#fefdf9' }}
  className={`border-l border-gray-200 transition-all duration-300 ${collapsed ? "w-16" : "w-64"} flex flex-col`}
>
      {/* Logo and Toggle */}
      <div className="px-4 py-2 flex items-center justify-between">
        {!collapsed && <div className="flex items-center">
      <img 
        src="/logo.png" 
        alt="Civora Logo" 
        className="h-4 w-auto"
      />
    </div>}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-1 cursor-pointer">
          <PanelRightOpen className={`!h-5 !w-5 text-gray-300 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-8 p-2 space-y-1 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const Icon = item.icon
          const hasSubmenus = item.submenus.length > 0
          const isExpanded = expandedMenus.includes(item.id)
          const isMenuActive = isActive(item.route)

          return (
            <div key={item.id} className="space-y-1">
              <Button
                variant="ghost"
                className={`w-full justify-start rounded-none text-right h-10 cursor-pointer ${
                  isMenuActive ? "bg-orange-100/50 text-[#da8439] hover:bg-orange-100" : "text-gray-700 hover:bg-gray-100"
                } ${collapsed ? "px-2" : "px-3"}`}
                onClick={() => {
                  if (hasSubmenus && !collapsed) {
                    toggleSubmenu(item.id)
                  } else {
                    handleNavigation(item.route)
                  }
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Icon className={`h-4 w-4 ${collapsed ? "" : "ml-3"}`} />
                    {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </div>
                  {hasSubmenus && !collapsed && (
                    <div className="mr-2">
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </div>
                  )}
                </div>
              </Button>

              {hasSubmenus && isExpanded && !collapsed && (
                <div className="mr-4 space-y-1">
                  {item.submenus.map((submenu) => (
                    <Button
                      key={submenu.id}
                      variant="ghost"
                      className={`w-full justify-start text-right h-8 text-xs cursor-pointer ${
                        isActive(submenu.route)
                          ? "text-[#da8439]"
                          : "text-gray-600 hover:bg-gray-50"
                      } px-6`}
                      onClick={() => handleNavigation(submenu.route)}
                    >
                      <span>{submenu.label}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 space-x-3 space-x-reverse">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">حمید علی محمدی</p>
              <p className="text-xs text-gray-500 truncate">johncornor@gmail.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
