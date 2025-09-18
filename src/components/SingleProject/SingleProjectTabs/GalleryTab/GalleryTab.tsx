import { Images, Expand } from "lucide-react";
import { toPersianNumber } from "@/lib/ToPersianNumber";

type GalleryTabProps = {
    images: string[];
    openLightbox: (index: number) => void;
};

const GalleryTab = ({ images, openLightbox }: GalleryTabProps) => {
    return (
        <div className="animate-in fade-in duration-500 mb-16">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Images className="text-blue-500 h-6 w-6" />
                </div>
                <h2 className="text-lg md:text-2xl font-bold text-gray-800">گالری تصاویر</h2>
                <span className="text-xs md:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {toPersianNumber(images.length)} تصویر
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer transition-all duration-500 hover:shadow-xl"
                        onClick={() => openLightbox(idx)}
                    >
                        <img
                            src={img}
                            alt={`تصویر ${idx + 1}`}
                            className="w-full h-32 sm:h-44 md:h-60 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <Expand size={28} className="mx-auto mb-2" />
                                <span className="text-sm font-medium">برای مشاهده بزرگتر کلیک کنید</span>
                            </div>
                        </div>
                        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                            {toPersianNumber(idx + 1)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GalleryTab;