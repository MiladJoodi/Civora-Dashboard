"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toPersianNumber } from "@/lib/ToPersianNumber";
import { Building, Box } from "lucide-react";
import { inventoryData } from "./data";


interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
            <div className="flex justify-center flex-1 gap-2 order-1 sm:order-1">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${currentPage === i + 1
                                ? "bg-orange-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        {toPersianNumber(i + 1)}
                    </button>
                ))}
            </div>

            <button
                onClick={() => setCurrentPage(1)}
                className="px-3 py-2 sm:py-1 rounded-md text-sm bg-orange-100/50 text-orange-700 hover:bg-orange-100 transition cursor-pointer w-full sm:w-auto order-2 sm:order-2"
            >
                مشاهده همه
            </button>
        </div>
    );
};

const InventoryStatus = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // تعداد آیتم‌ها در هر صفحه

    const totalPages = Math.ceil(inventoryData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = inventoryData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-orange-100 flex items-center justify-center">
                        <Building className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <CardTitle className="text-base sm:text-lg">وضعیت انبار</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">موجودی و سفارشات جاری</CardDescription>
                    </div>
                </div>

            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {currentItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Box className="w-5 h-5 text-gray-600" />
                                <div>
                                    <p className="font-medium text-gray-900">{item.item}</p>
                                    <p className="text-sm text-gray-600">{toPersianNumber(item.stock)}</p>
                                </div>
                            </div>
                            <span
                                className={`px-2 py-1 text-xs rounded-full ${item.status === "موجود"
                                        ? "bg-green-100 text-green-800"
                                        : item.status === "کم موجود"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-blue-100 text-blue-800"
                                    }`}
                            >
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
            </CardContent>
        </Card>
    );
};

export default InventoryStatus;
