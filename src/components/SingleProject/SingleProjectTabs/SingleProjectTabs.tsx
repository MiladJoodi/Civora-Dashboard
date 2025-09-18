import { toPersianNumber } from "@/lib/ToPersianNumber";
import { Camera, FileText, MessageCircle } from "lucide-react";

type SingleProjectTabsProps = {
    setActiveTab: (tab: string) => void
    activeTab: string;
    projectGalleryImagesLength: number;
}

const SingleProjectTabs = ({ setActiveTab, activeTab, projectGalleryImagesLength }: SingleProjectTabsProps) => {
    return (
        <div className="rounded-2xl shadow-sm border border-gray-100 p-2 mb-10 sticky top-4 md:top-20 z-30 backdrop-blur-sm bg-white/90">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <button
                    onClick={() => setActiveTab("details")}
                    className={`px-3 py-2 md:px-5 md:py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer text-sm md:text-base ${activeTab === "details"
                        ? "bg-orange-400 text-white shadow-md"
                        : "text-gray-600 hover:text-orange-500 hover:bg-orange-50/50"
                        }`}
                >
                    <FileText className="h-4 w-4 md:h-5 md:w-5" />
                    جزئیات
                </button>
                <button
                    onClick={() => setActiveTab("gallery")}
                    className={`px-3 py-2 md:px-5 md:py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer text-sm md:text-base ${activeTab === "gallery"
                        ? "bg-orange-400 text-white shadow-md"
                        : "text-gray-600 hover:text-orange-500 hover:bg-orange-50/50"
                        }`}
                >
                    <Camera className="h-4 w-4 md:h-5 md:w-5" />
                    گالری ({toPersianNumber(projectGalleryImagesLength)})
                </button>
                <button
                    onClick={() => setActiveTab("contact")}
                    className={`px-3 py-2 md:px-5 md:py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer text-sm md:text-base ${activeTab === "contact"
                        ? "bg-orange-400 text-white shadow-md"
                        : "text-gray-600 hover:text-orange-500 hover:bg-orange-50/50"
                        }`}
                >
                    <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                    تماس
                </button>
            </div>
        </div>
    );
}

export default SingleProjectTabs;