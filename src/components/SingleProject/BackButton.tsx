"use client"

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {

    const router = useRouter();

    return (
        <Button
            variant="ghost"
            className="mb-8 flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-all duration-300 rounded-full px-2.5 py-1.5 md:px-4 hover:bg-blue-50/50 backdrop-blur-sm cursor-pointer mr-auto"
            onClick={() => router.back()}
        >
            بازگشت
            <ArrowLeft className="h-5 w-5" />
        </Button>
    );
}

export default BackButton;