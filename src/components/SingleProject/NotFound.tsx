"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">

            <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">

                <div
                    className="w-64 sm:w-96 mx-auto"
                >
                    <img
                        src="/404.gif"
                        alt="404"
                        className="w-full h-auto"
                    />
                </div>

                <p className="text-gray-700 text-lg sm:text-xl mb-6">
                    متاسفانه صفحه‌ای که دنبال آن هستید پیدا نشد.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-orange-100 text-orange-700 hover:bg-orange-200 font-medium transition"
                >
                    بازگشت به صفحه اصلی
                    <ArrowLeft className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
