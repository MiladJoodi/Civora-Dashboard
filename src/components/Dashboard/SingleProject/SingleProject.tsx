"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProjectInfo } from "@/components/Dashboard/QuickActions/RecentProjects/ProjectInfo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Send,
  Images,
  FileText,
  MessageCircle,
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Expand,
  Heart,
  Share,
  Phone,
  Mail,
  Clock,
  Award,
  CheckCircle,
  BarChart3,
  Building2,
  Sparkles,
  Star,
  Camera,
  TreePine,
  Shield,
  Wifi
} from "lucide-react";
import { recentProjects } from "@/components/Dashboard/SingleProject/data";
import { toPersianNumber } from "@/lib/ToPersianNumber";

const SingleProject: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [project, setProject] = useState<typeof recentProjects[0] | null>(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const headerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const found = recentProjects.find((p) => p.id === id);
    setProject(found || null);

    const timer = setTimeout(() => {
      if (found) {
        setProject(found);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      alert(`پیام شما با موفقیت ارسال شد!\nنام: ${name}\nایمیل: ${email}\nپیام: ${message}`);
      setMessage("");
      setName("");
      setEmail("");
      setIsSending(false);
    }, 1000);
  };

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const goToPrev = useCallback(() => {
    setLightboxIndex(prev => (prev > 0 ? prev - 1 : project!.galleryImages.length - 1));
  }, [project]);

  const goToNext = useCallback(() => {
    setLightboxIndex(prev => (prev < project!.galleryImages.length - 1 ? prev + 1 : 0));
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, goToPrev, goToNext]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="animate-pulse text-7xl mb-6">🏗️</div>
        <p className="text-2xl font-light mb-6">پروژه یافت نشد</p>
        <Button
          className="rounded-full px-6 py-3 gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
          بازگشت به صفحه قبل
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
      {/* پیشرفت اسکرول */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* افکت های پس زمینه */}
      {/* <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"></div> */}

      {/* Lightbox برای نمایش تمام صفحه تصاویر */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-in fade-in duration-300">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white p-2 rounded-full bg-black/50 hover:bg-white/20 transition-all duration-300 z-10"
          >
            <X size={30} />
          </button>

          <button
            onClick={goToPrev}
            className="absolute left-6 text-white p-3 rounded-full bg-black/50 hover:bg-white/20 transition-all duration-300 z-10"
          >
            <ChevronLeft size={36} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-6 text-white p-3 rounded-full bg-black/50 hover:bg-white/20 transition-all duration-300 z-10"
          >
            <ChevronRight size={36} />
          </button>

          <div className="relative max-w-5xl max-h-full w-full h-full flex items-center justify-center p-10">
            <img
              src={project.galleryImages[lightboxIndex]}
              alt={`تصویر ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg transform transition-transform duration-500"
            />
          </div>

          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <div className="flex gap-2 p-2 bg-black/50 rounded-lg backdrop-blur-sm">
              {project.galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === lightboxIndex ? 'bg-orange-500 scale-110' : 'bg-white/50 hover:bg-white/80'
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="absolute top-6 left-6 flex gap-3">
            <button className="text-white p-2.5 rounded-full bg-black/50 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
              <Download size={24} />
            </button>
            <button
              className={`p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm ${isFavorite ? 'bg-rose-500/20 text-rose-400' : 'bg-black/50 text-white hover:bg-white/20'
                }`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button className="text-white p-2.5 rounded-full bg-black/50 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
              <Share size={24} />
            </button>
          </div>

          <div className="absolute bottom-6 right-6 text-white text-sm bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {lightboxIndex + 1} / {project.galleryImages.length}
          </div>
        </div>
      )}

      <div className="container max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* دکمه بازگشت */}
        <Button
          variant="ghost"
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-all duration-300 rounded-full px-4 py-2 hover:bg-blue-50/50 backdrop-blur-sm cursor-pointer mr-auto"
          onClick={() => router.back()}
        >
          بازگشت
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* هدر پروژه */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row gap-8 mb-16 animate-in slide-in-from-top duration-700"
        >
          <div className="flex-1">
            <div className="mb-8">
              
              
              

              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-orange-300 to-orange-700 rounded-xl text-white">
                  <Building2 className="h-8 w-8" />
                </div>
                {project.name}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 text-amber-400 hover:text-amber-500 transition-colors cursor-pointer"
                >
                  <Star
                    className="h-7 w-7"
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
              </h1>

<div className="flex flex-wrap items-center gap-3 mb-4 select-none">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  پروژه برتر
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  تضمین کیفیت
                </span>
              </div>


              <p className="text-gray-600 max-w-3xl leading-relaxed">
                <span className="font-semibold text-blue-500">{project.name}</span> یک طرح مدرن و پیشرفته در حوزه ساخت‌وساز با استانداردهای بین‌المللی و طراحی منحصر به فرد است.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                <Calendar className="h-5 w-5 text-orange-300" />
                <span className="text-gray-700">شروع: <span className="font-medium">شهریور {toPersianNumber(1402)}</span></span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                <MapPin className="h-5 w-5 text-orange-300" />
                <span className="text-gray-700">تهران، شهرک غرب</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                <Users className="h-5 w-5 text-orange-300" />
                <span className="text-gray-700">تیم: <span className="font-medium">۵ نفر</span></span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
    <Sparkles className="h-5 w-5 text-amber-500" />
    خلاصه پروژه
  </h3>
  <p className="text-gray-600 leading-relaxed">
    {project.name} با هدف ایجاد فضایی مدرن و کارآمد در حوزه ساختمان‌های مسکونی و تجاری طراحی شده است. این پروژه شامل مجموعه‌ای از امکانات پیشرفته، فضاهای سبز و طراحی مهندسی دقیق است که مطابق با استانداردهای روز دنیا پیاده‌سازی شده است.
  </p>
  
  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex items-start gap-2">
      <div className="bg-gray-100 p-2 rounded-lg">
        <MapPin className="h-5 w-5 text-gray-400" />
      </div>
      <div>
        <h4 className="font-medium text-gray-800">موقعیت مکانی</h4>
        <p className="text-sm text-gray-600">دسترسی عالی به مراکز تجاری و حمل و نقل عمومی</p>
      </div>
    </div>
    
    <div className="flex items-start gap-2">
      <div className="bg-gray-100 p-2 rounded-lg">
        <TreePine className="h-5 w-5 text-gray-400" />
      </div>
      <div>
        <h4 className="font-medium text-gray-800">فضای سبز</h4>
        <p className="text-sm text-gray-600">طراحی شده با ۴۰٪ فضای سبز و پارک‌های محلی</p>
      </div>
    </div>
    
    <div className="flex items-start gap-2">
      <div className="bg-gray-100 p-2 rounded-lg">
        <Shield className="h-5 w-5 text-gray-400" />
      </div>
      <div>
        <h4 className="font-medium text-gray-800">امنیت</h4>
        <p className="text-sm text-gray-600">سیستم نظارتی پیشرفته و کنترل تردد ۲۴ ساعته</p>
      </div>
    </div>
    
    <div className="flex items-start gap-2">
      <div className="bg-gray-100 p-2 rounded-lg">
        <Wifi className="h-5 w-5 text-gray-400" />
      </div>
      <div>
        <h4 className="font-medium text-gray-800">امکانات هوشمند</h4>
        <p className="text-sm text-gray-600">مجهز به سیستم خانه هوشمند و اینترنت پرسرعت</p>
      </div>
    </div>
  </div>
  
  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
    <h4 className="font-medium text-gray-800 mb-2">اهداف کلیدی پروژه:</h4>
    <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
      <li>ایجاد محیطی پایدار با مصرف بهینه انرژی</li>
      <li>استفاده از مصالح ساختمانی با کیفیت و دوستدار محیط زیست</li>
      <li>تأمین نیازهای ساکنین با طراحی کاربرمحور و انعطاف‌پذیر</li>
      <li>ارائه خدمات رفاهی و تفریحی متنوع برای تمامی گروه‌های سنی</li>
    </ul>
  </div>
</div>
          </div>

          <div className="lg:w-2/5">
            <div className="sticky top-24">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img
                  src={project.mainImage}
                  alt={project.name}
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <button
                  onClick={() => openLightbox(0)}
                  className="absolute top-4 right-4 p-2 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 backdrop-blur-sm"
                >
                  <Expand size={22} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-20">
                  <span className="font-medium text-lg">تصویر اصلی پروژه</span>
                  <p className="text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">برای مشاهده در اندازه بزرگتر کلیک کنید</p>
                </div>
              </div>



              {/* آمار و ارقام پروژه */}
              <div className="grid grid-cols-2 gap-4 mt-18">
  <div className="bg-white p-4 rounded-xl border border-gray-100 text-center group hover:border-blue-200 transition-all duration-300">
    <div className="bg-blue-50 p-2 rounded-lg inline-flex mb-2 group-hover:bg-blue-100 transition-colors">
      <BarChart3 className="h-6 w-6 text-blue-500" />
    </div>
    <div className="text-xl font-semibold text-gray-800">۲۴۰۰</div>
    <div className="text-xs text-gray-400 mt-1">متر مربع</div>
  </div>
  
  <div className="bg-white p-4 rounded-xl border border-gray-100 text-center group hover:border-green-200 transition-all duration-300">
    <div className="bg-green-50 p-2 rounded-lg inline-flex mb-2 group-hover:bg-green-100 transition-colors">
      <Clock className="h-6 w-6 text-green-500" />
    </div>
    <div className="text-xl font-semibold text-gray-800">۸۵٪</div>
    <div className="text-xs text-gray-400 mt-1">پیشرفت</div>
  </div>
  
  <div className="bg-white p-4 rounded-xl border border-gray-100 text-center group hover:border-purple-200 transition-all duration-300">
    <div className="bg-purple-50 p-2 rounded-lg inline-flex mb-2 group-hover:bg-purple-100 transition-colors">
      <Building2 className="h-6 w-6 text-purple-500" />
    </div>
    <div className="text-xl font-semibold text-gray-800">۱۸</div>
    <div className="text-xs text-gray-400 mt-1">طبقه</div>
  </div>
  
  <div className="bg-white p-4 rounded-xl border border-gray-100 text-center group hover:border-amber-200 transition-all duration-300">
    <div className="bg-amber-50 p-2 rounded-lg inline-flex mb-2 group-hover:bg-amber-100 transition-colors">
      <CheckCircle className="h-6 w-6 text-amber-500" />
    </div>
    <div className="text-xl font-semibold text-gray-800">۴۵</div>
    <div className="text-xs text-gray-400 mt-1">واحد</div>
  </div>
</div>



            </div>
          </div>
        </div>

        {/* تب های ناوبری */}
        <div className="rounded-2xl shadow-sm border border-gray-100 p-2 mb-10 sticky top-20 z-30 backdrop-blur-sm bg-white/90">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer ${activeTab === "details"
                ? "bg-orange-400 text-white shadow-md"
                : "text-gray-600 hover:text-orange-500 hover:bg-blue-50/50"
                }`}
            >
              <FileText className="h-5 w-5" />
              جزئیات
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer ${activeTab === "gallery"
                ? "bg-orange-400 text-white shadow-md"
                : "text-gray-600 hover:text-orange-500 hover:bg-blue-50/50"
                }`}
            >
              <Camera className="h-5 w-5" />
              گالری ({toPersianNumber(project.galleryImages.length)})
              
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer ${activeTab === "contact"
                ? "bg-orange-400 text-white shadow-md"
                : "text-gray-600 hover:text-orange-500 hover:bg-blue-50/50"
                }`}
            >
              <MessageCircle className="h-5 w-5" />
              تماس
            </button>
          </div>
        </div>

        {/* محتوای تب جزئیات */}
        {activeTab === "details" && (
          <div
            ref={detailsRef}
            className="animate-in fade-in duration-500 mb-16"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="text-blue-500 h-6 w-6" />
                </div>
                توضیحات کامل پروژه
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">ویژگی‌های پروژه</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md">
                      <div className="p-2 bg-orange-100 rounded-lg mt-0.5">
                        <span className="text-orange-500 font-medium">۱</span>
                      </div>
                      <span className="text-gray-700">طراحی داخلی مدرن و لوکس با متریال درجه یک</span>
                    </li>
                    <li className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md">
                      <div className="p-2 bg-orange-100 rounded-lg mt-0.5">
                        <span className="text-orange-500 font-medium">۲</span>
                      </div>
                      <span className="text-gray-700">سیستم هوشمند مدیریت ساختمان (BMS)</span>
                    </li>
                    <li className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md">
                      <div className="p-2 bg-orange-100 rounded-lg mt-0.5">
                        <span className="text-orange-500 font-medium">۳</span>
                      </div>
                      <span className="text-gray-700">آسانسورهای پرسرعت و های-تک</span>
                    </li>
                    <li className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md">
                      <div className="p-2 bg-orange-100 rounded-lg mt-0.5">
                        <span className="text-orange-500 font-medium">۴</span>
                      </div>
                      <span className="text-gray-700">امکانات رفاهی کامل (سالن ورزشی، استخر، لابی مجلل)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">جزئیات فنی</h3>
                  <p className="text-gray-600 leading-relaxed text-justify mb-6">
                    این پروژه با رویکردی کاملاً حرفه‌ای و مطابق با آخرین استانداردهای معماری طراحی شده است.
                    تمامی بخش‌ها از طراحی داخلی گرفته تا سازه و محوطه‌سازی، با دقت و هماهنگی انجام شده‌اند.
                    امکانات رفاهی شامل فضای ورزشی، سالن اجتماعات، پارکینگ اختصاصی و فضاهای سبز مدرن است.
                  </p>

                  <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
                    <h4 className="font-medium text-orange-700 mb-3 text-lg">مشخصات فنی</h4>
                    <ul className="text-orange-600 space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        اسکلت بتنی با مقاومت بالا
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        عایق‌کاری حرارتی و صوتی پیشرفته
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        سیستم اعلام و اطفاء حریق
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        پنل خورشیدی برای تأمین بخشی از انرژی
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* جدول زمانی پروژه */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">جدول زمانی پروژه</h3>
              <div className="relative">
                <div className="absolute left-0 top-4 bottom-4 w-1 bg-orange-100 ml-4"></div>
                <div className="space-y-8 relative">
                  {[
                    { phase: "فاز اول: مطالعات و طراحی", progress: 100, date: "1402/05/10 - 1402/07/20" },
                    { phase: "فاز دوم: عملیات خاکی و اسکلت", progress: 100, date: "1402/07/21 - 1402/11/15" },
                    { phase: "فاز سوم: تاسیسات و نازک کاری", progress: 85, date: "1402/11/16 - 1403/04/10" },
                    { phase: "فاز چهارم: تکمیل و تحویل", progress: 30, date: "1403/04/11 - 1403/08/01" },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-500 border-4 border-white shadow-md flex items-center justify-center z-10">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-800">{item.phase}</h4>
                          <span className="text-sm text-gray-500">{toPersianNumber(item.date)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 text-left">{toPersianNumber(item.progress)}% تکمیل شده</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* محتوای تب گالری */}
        {activeTab === "gallery" && (
          <div className="animate-in fade-in duration-500 mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Images className="text-blue-500 h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">گالری تصاویر</h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {toPersianNumber(project.galleryImages.length)} تصویر
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {project.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer transition-all duration-500 hover:shadow-xl"
                  onClick={() => openLightbox(idx)}
                >
                  <img
                    src={img}
                    alt={`تصویر ${idx + 1}`}
                    className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-700"
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
        )}

        {/* محتوای تب تماس */}
        {activeTab === "contact" && (
          <div className="animate-in fade-in duration-500 mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              {/* فرم تماس */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageCircle className="text-blue-500 h-6 w-6" />
                  </div>
                  ارسال پیام
                </h2>

                <form onSubmit={handleSend} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      نام و نام خانوادگی
                    </label>
                    <Input
                      id="name"
                      placeholder="نام خود را وارد کنید"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="rounded-xl py-3 px-4 transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      آدرس ایمیل
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ایمیل خود را وارد کنید"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rounded-xl py-3 px-4 transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      متن پیام
                    </label>
                    <Textarea
                      id="message"
                      placeholder="متن پیام خود را اینجا تایپ کنید... (حداکثر 500 کاراکتر)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="resize-none min-h-[140px] text-gray-700 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      maxLength={500}
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-3">
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span className={message.length > 450 ? 'text-orange-500 font-medium' : ''}>
                        {message.length}/500 کاراکتر
                      </span>
                      {message.length > 450 && (
                        <span className="text-orange-500">نزدیک به حد مجاز!</span>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={!message.trim() || !name.trim() || !email.trim() || isSending}
                      className="rounded-xl px-7 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSending ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          در حال ارسال...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          ارسال پیام
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              {/* اطلاعات تماس */}
              <div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-5">اطلاعات تماس</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <MapPin className="text-blue-500 h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">آدرس</p>
                        <p className="font-medium text-gray-800">تهران، شهرک غرب، فاز ۶، بلوار فرحزادی</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md">
                      <div className="p-3 bg-green-100 rounded-xl">
                        <Mail className="text-green-500 h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">ایمیل</p>
                        <p className="font-medium text-gray-800">info@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md">
                      <div className="p-3 bg-orange-100 rounded-xl">
                        <Phone className="text-orange-500 h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">تلفن</p>
                        <p className="font-medium text-gray-800">۰۲۱-۸۸۷۶۵۴۳۲</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
                  <h3 className="text-xl font-bold mb-3">نیاز به مشاوره تخصصی دارید؟</h3>
                  <p className="mb-5 opacity-90">کارشناسان ما آماده پاسخگویی به سوالات شما درباره این پروژه هستند.</p>
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 rounded-xl py-3 font-medium flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    درخواست مشاوره رایگان
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* بخش پروژه های مرتبط */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">پروژه های مشابه</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentProjects.filter(p => p.id !== project.id).slice(0, 3).map(project => (
              <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.mainImage}
                    alt={project.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    {project.status === 'completed' ? 'تکمیل شده' : 'در حال اجرا'}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{project.name}</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">پروژه ای مدرن با طراحی منحصر به فرد و امکانات پیشرفته</p>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl cursor-pointer"
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    مشاهده جزئیات
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* فوتر */}
      {/* <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">درباره ما</h4>
              <p className="text-gray-400 text-sm">ما با بیش از ۱۵ سال تجربه در زمینه ساخت و ساز، پروژه های متعددی را با بالاترین استانداردها به پایان رسانده ایم.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">لینک های سریع</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">پروژه ها</a></li>
                <li><a href="#" className="hover:text-white transition-colors">خدمات</a></li>
                <li><a href="#" className="hover:text-white transition-colors">درباره ما</a></li>
                <li><a href="#" className="hover:text-white transition-colors">تماس با ما</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">تماس با ما</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>۰۲۱-۸۸۷۶۵۴۳۲</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@example.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>تهران، شهرک غرب</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">خبرنامه</h4>
              <p className="text-gray-400 text-sm mb-3">برای دریافت最新ترین پروژه ها و اخبار در خبرنامه ما عضو شوید.</p>
              <div className="flex">
                <Input
                  placeholder="ایمیل خود را وارد کنید"
                  className="rounded-l-none rounded-r-xl bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Button className="rounded-l-xl rounded-r-none bg-blue-500 hover:bg-blue-600">
                  ارسال
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>© ۱۴۰۲ کلیه حقوق این سایت محفوظ است.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default SingleProject;