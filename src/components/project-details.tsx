"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, Search } from "lucide-react";
import { FiFolderMinus } from "react-icons/fi";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { GlobalHeader } from "./shared/GlobalHeader/GlobalHeader";

const projectData = [
  {
    id: 1,
    title: "اجرای ستون‌های طبقه اول",
    status: "تحویل شد",
    statusColor: "bg-green-100 text-green-800",
    budget: "۳۰۰ کیسه",
    contractor: "سیمان تیپ ۲",
    cost: "۱",
  },
  {
    id: 2,
    title: "سکانت فلزی رپ پایگاه",
    status: "تحویل شد",
    statusColor: "bg-green-100 text-green-800",
    budget: "۲۵۰ شاخه",
    contractor: "میلگرد ۱۸",
    cost: "۲",
  },
  {
    id: 3,
    title: "سیستم آبرسانی طبقات فوقانی",
    status: "تحویل شد",
    statusColor: "bg-green-100 text-green-800",
    budget: "۱۰۰ متر",
    contractor: "لوله پلی‌اتیلن ابتدع",
    cost: "۳",
  },
  {
    id: 4,
    title: "پاکسازی دیوارهای نمای شمالی",
    status: "تحویل شد",
    statusColor: "bg-green-100 text-green-800",
    budget: "۳۰ لیتر",
    contractor: "رنگ اکریلیک نما",
    cost: "۴",
  },
  {
    id: 5,
    title: "نصب تجهیزات توسعه مطبوع",
    status: "تحویل شد",
    statusColor: "bg-gray-100 text-gray-800",
    budget: "۳۰۰ کیسه",
    contractor: "پیچ و مهره فولادی",
    cost: "۵",
  },
  {
    id: 6,
    title: "ورودی برق اصلی ساختمان",
    status: "تحویل شد",
    statusColor: "bg-green-100 text-green-800",
    budget: "۵۰۰ عدد",
    contractor: "پنل برق سه فاز",
    cost: "۶",
  },
  {
    id: 7,
    title: "نصب کابلی در سرویس‌ها",
    status: "تحویل شد",
    statusColor: "bg-green-100 text-green-800",
    budget: "۳۰ عدد",
    contractor: "چسب کاشی",
    cost: "۷",
  },
  {
    id: 8,
    title: "نصب درواقع‌های طبقه دوم",
    status: "تحویل شد",
    statusColor: "bg-gray-100 text-gray-800",
    budget: "۴۰ کیسه",
    contractor: "گلید و پریز",
    cost: "۸",
  },
  {
    id: 9,
    title: "علایق پشت‌سرام",
    status: "تحویل شد",
    statusColor: "bg-green-100 text-green-800",
    budget: "۷۰ عدد",
    contractor: "علایق رطوبتی",
    cost: "۹",
  },
  {
    id: 10,
    title: "گمسازی راهروهای طبقات",
    status: "تحویل شد",
    statusColor: "bg-gray-100 text-gray-800",
    budget: "۱۰۰ متر",
    contractor: "کفپوش PVC",
    cost: "۱۰",
  },
];

export function ProjectDetails() {
  return (
    <div>
      {/* Project Header */}
      <GlobalHeader />

      <Card className="rounded-none shadow-none border-t-transparent">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-center space-x-reverse">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <FiFolderMinus className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  درخواست خرید فاز دوم مجتمع مسکونی باران
                </h1>
              </div>

              {/* Status */}
              <div className="flex mt-8 gap-8">
                <div className="flex flex-col gap-4 text-gray-600">
                  {" "}
                  {/* فاصله بین ردیف‌ها بیشتر شد */}
                  <span>وضعیت فعلی پروژه:</span>
                  <span>تاریخ درخواست :</span>
                  <span>تاریخ تحویل :</span>
                </div>

                <div className="flex flex-col gap-4 font-medium">
                  {" "}
                  {/* فاصله بین ردیف‌ها بیشتر شد */}
                  <Badge className="bg-green-100 text-green-800">
                    در حال انجام
                  </Badge>
                  <span>۲۵ فروردین ۱۴۰۳، ۵ خرداد ۱۴۰۴</span>
                  <span>۲۵ فروردین ۱۴۰۳، ۵ خرداد ۱۴۰۴</span>
                </div>
              </div>
              {/* Status */}
            </div>
          </div>
        </CardHeader>

        <div className="px-6">
          <Separator />
        </div>

        {/* Search */}
          <div className="flex items-center gap-4 px-6">

            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="جستجو کنید" className="w-64 pr-10 text-right focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0" />
            </div>

              {/* Separator */}
  <div className="w-px h-6 bg-gray-300"></div>

            <Button className="bg-[#db8339] hover:bg-orange-600 text-white cursor-pointer">
              <Plus className="h-4 w-4 ml-2" />
              درخواست جدید
            </Button>
          </div>

        {/* Data Table */}
        <CardContent className="px-6">
          <div className="overflow-hidden rounded-t-lg border border-gray-200">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-t-0 border-l-0 border-b border-gray-200">
                    ردیف
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-t-0 border-l-0 border-r border-b border-gray-200">
                    موارد درخواست
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-t-0 border-l-0 border-r border-b border-gray-200">
                    مقدار
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-t-0 border-l-0 border-r border-b border-gray-200">
                    مورد مصرف
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-t-0 border-l-0  border-b border-gray-200">
                    تحویل شد
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td
                      className={`flex items-center gap-2 px-4 py-2.5 whitespace-nowrap text-sm text-gray-900 overflow-hidden border-l-0 border-gray-200 ${
                        index === projectData.length - 1
                          ? "border-b-0"
                          : "border-b"
                      }`}
                    >
                      <input
  type="checkbox"
  className="w-4 h-4 rounded border-gray-400 cursor-pointer text-white accent-orange-500"
/>


                      {item.cost}
                    </td>
                    <td
                      className={`px-4 py-2.5 whitespace-nowrap text-sm text-gray-900 border-r border-l-0 border-gray-200 ${
                        index === projectData.length - 1
                          ? "border-b-0"
                          : "border-b"
                      }`}
                    >
                      {item.contractor}
                    </td>
                    <td
                      className={`px-4 py-2.5 whitespace-nowrap text-sm text-gray-900 border-r border-l-0 border-gray-200 ${
                        index === projectData.length - 1
                          ? "border-b-0"
                          : "border-b"
                      }`}
                    >
                      {item.budget}
                    </td>
                    <td
                      className={`px-4 py-2.5 whitespace-nowrap text-sm text-gray-900 border-r border-l-0 border-gray-200 ${
                        index === projectData.length - 1
                          ? "border-b-0"
                          : "border-b"
                      }`}
                    >
                      {item.title}
                    </td>
                    <td
                      className={`px-4 py-2.5 whitespace-nowrap border-l-0 border-r ${
                        index === projectData.length - 1
                          ? "border-b-0"
                          : "border-b"
                      } border-gray-200`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ml-2 ${
                            item.status === "تحویل شد"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        ></div>
                        <Badge className={item.statusColor}>
                          
                          {item.status}
                        </Badge>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
