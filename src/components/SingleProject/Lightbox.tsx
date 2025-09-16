import { ChevronLeft, ChevronRight, Download, Heart, Share, X, Maximize, Minimize, RotateCw } from "lucide-react";
import { Project } from "./data";
import { toPersianNumber } from "@/lib/ToPersianNumber";
import { useState, useEffect } from "react";

interface LightboxProps {
    closeLightbox: () => void;
    goToPrev: () => void;
    goToNext: () => void;
    project: Project;
    lightboxIndex: number;
    setLightboxIndex: (index: number) => void;
    isFavorite: boolean;
    setIsFavorite: (isFavorite: boolean) => void;
}

const Lightbox = ({ closeLightbox, goToPrev, goToNext, project, lightboxIndex, setLightboxIndex, isFavorite, setIsFavorite }: LightboxProps) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') goToPrev();
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'f' || e.key === 'F') toggleFullscreen();
            if (e.key === ' ') setIsZoomed(!isZoomed);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isZoomed]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = project.galleryImages[lightboxIndex];
        link.download = `project-image-${lightboxIndex + 1}.jpg`;
        link.click();
    };

    const shareImage = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: project.name,
                    text: `تصویر ${lightboxIndex + 1} از پروژه ${project.name}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('اشتراک گذاری لغو شد');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('لینک در کلیپ بورد کپی شد!');
        }
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-in fade-in duration-300">
            {/* دکمه های کنترلی اصلی */}
            <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-white p-3 rounded-full bg-black/50 hover:bg-orange-500/80 transition-all duration-300 z-10 cursor-pointer backdrop-blur-md border border-white/10 hover:scale-110 group"
            >
                <X size={28} className="group-hover:rotate-90 transition-transform" />
            </button>

            <button
                onClick={goToNext}
                className="absolute left-6 text-white p-2 rounded-full bg-black/50 hover:bg-orange-500/80 transition-all duration-300 z-10 cursor-pointer backdrop-blur-md border border-white/10 hover:scale-110 group"
            >
                <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
            onClick={goToPrev}
                
                className="absolute right-6 text-white p-2 rounded-full bg-black/50 hover:bg-orange-500/80 transition-all duration-300 z-10 cursor-pointer backdrop-blur-md border border-white/10 hover:scale-110 group"
            >
                <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* تصویر مرکزی */}
            <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center p-6">
                <div className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
                    {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        </div>
                    )}
                    <img
                        src={project.galleryImages[lightboxIndex]}
                        alt={`تصویر ${lightboxIndex + 1} از ${project.name}`}
                        className={`max-w-full max-h-full object-contain rounded-xl transform transition-all duration-500 ${isZoomed ? 'scale-150' : 'scale-100'
                            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onClick={() => setIsZoomed(!isZoomed)}
                        onLoad={handleImageLoad}
                    />
                </div>
            </div>

            {/* ناوبری پایین */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <div className="flex gap-2 p-3 bg-black/50 rounded-xl backdrop-blur-md border border-white/10">
                    {project.galleryImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setLightboxIndex(idx)}
                            className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${idx === lightboxIndex
                                    ? 'bg-orange-500 scale-125 shadow-lg shadow-orange-500/50'
                                    : 'bg-white/50 hover:bg-white/80'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* ابزارهای کنترلی بالا */}
            <div className="absolute top-6 left-6 flex gap-3">
                <button
                    onClick={downloadImage}
                    className="text-white p-3 rounded-full bg-black/50 hover:bg-orange-500/80 transition-all duration-300 backdrop-blur-md border border-white/10 hover:scale-110 group cursor-pointer"
                    title="دانلود تصویر"
                >
                    <Download size={24} className="group-hover:translate-y-0.5 transition-transform" />
                </button>
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-full transition-all duration-300 backdrop-blur-md border hover:scale-110 group cursor-pointer ${isFavorite
                            ? 'bg-rose-500/30 text-rose-400 border-rose-400/30'
                            : 'bg-black/50 text-white border-white/10 hover:bg-rose-500/30'
                        }`}
                    title={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                >
                    <Heart
                        size={24}
                        fill={isFavorite ? "currentColor" : "none"}
                        className="group-hover:scale-110 transition-transform"
                    />
                </button>
                <button
                    onClick={shareImage}
                    className="text-white p-3 rounded-full bg-black/50 hover:bg-orange-500/80 transition-all duration-300 backdrop-blur-md border border-white/10 hover:scale-110 group cursor-pointer"
                    title="اشتراک گذاری"
                >
                    <Share size={24} className="group-hover:scale-110 transition-transform" />
                </button>
                <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="text-white p-3 rounded-full bg-black/50 hover:bg-orange-500/80 transition-all duration-300 backdrop-blur-md border border-white/10 hover:scale-110 group cursor-pointer"
                    title={isZoomed ? "کوچک‌نمایی" : "بزرگ‌نمایی"}
                >
                    {isZoomed ? <Minimize size={24} /> : <Maximize size={24} />}
                </button>
                <button
                    onClick={toggleFullscreen}
                    className="text-white p-3 rounded-full bg-black/50 hover:bg-orange-500/80 transition-all duration-300 backdrop-blur-md border border-white/10 hover:scale-110 group cursor-pointer"
                    title={isFullscreen ? "خروج از حالت تمام صفحه" : "حالت تمام صفحه"}
                >
                    <RotateCw size={24} className="group-hover:rotate-180 transition-transform" />
                </button>
            </div>

            {/* اطلاعات تصویر */}
            <div className="absolute bottom-6 right-6 text-white text-sm bg-black/50 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                <span className="font-medium">{toPersianNumber(lightboxIndex + 1)}</span>
                <span className="mx-2 opacity-70">|</span>
                <span className="opacity-90">{toPersianNumber(project.galleryImages.length)}</span>
            </div>

            {/* نام پروژه */}
            <div className="hidden lg:block absolute top-6 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold bg-black/50 px-6 py-2 rounded-xl backdrop-blur-md border border-white/10">
                {project.name}
            </div>

            {/* راهنما */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/70 text-sm bg-black/30 px-4 py-2 rounded-lg backdrop-blur-md border border-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                برای بزرگ‌نمایی کلیک کنید • Esc برای خروج
            </div>
        </div>
    );
}

export default Lightbox;