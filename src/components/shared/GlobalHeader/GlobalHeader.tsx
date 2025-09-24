"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, MessageSquare, ChevronLeft } from "lucide-react";
import { TbMessage2 } from "react-icons/tb";

export function GlobalHeader() {
  return (
    <header className="bg-white border border-gray-200 px-6 py-3 rounded-t-lg">
      <div className="flex items-center justify-between">
        {/* Right side - Logo and Navigation */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* <div className="font-bold text-xl text-gray-800">Civora</div> */}

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 font-semibold mr-10 sm:mr-0">
            <span className="text-gray-400">دفتر فنی پروژه</span>
            <ChevronLeft className="h-4 w-4 rotate-180" />
            <span>درخواست خرید</span>
          </nav>
        </div>

        {/* Left side - Search and Icons */}
        <div className="flex items-center space-x-4 space-x-reverse">

          {/* Notification Icons */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 border border-gray-200 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer shadow-sm"
          >
            <Bell className="!h-5 !w-5 text-gray-600" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="p-2 mr-2 border border-gray-200 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer shadow-sm"
          >
            <TbMessage2 className="!h-5 !w-5 text-gray-600" />
          </Button>

        </div>
      </div>
    </header>
  );
}
