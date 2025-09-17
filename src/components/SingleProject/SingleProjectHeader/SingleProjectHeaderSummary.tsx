import { Sparkles, MapPin, TreePine, Shield, Wifi } from "lucide-react";

type SingleProjectHeaderSummaryProps = {
    projectName: string
}

const SingleProjectHeaderSummary = ({ projectName }: SingleProjectHeaderSummaryProps) => {
    return (
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-base md:text-lg">
                <Sparkles className="h-5 w-5 text-amber-500" />
                خلاصه پروژه
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {projectName} با هدف ایجاد فضایی مدرن و کارآمد در حوزه ساختمان‌های مسکونی و تجاری طراحی شده است. این پروژه شامل مجموعه‌ای از امکانات پیشرفته، فضاهای سبز و طراحی مهندسی دقیق است که مطابق با استانداردهای روز دنیا پیاده‌سازی شده است.
            </p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                    <div className="bg-gray-100 p-2 rounded-lg">
                        <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-800 text-sm md:text-base">موقعیت مکانی</h4>
                        <p className="text-xs md:text-sm text-gray-600">دسترسی عالی به مراکز تجاری و حمل و نقل عمومی</p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <div className="bg-gray-100 p-2 rounded-lg">
                        <TreePine className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-800 text-sm md:text-base">فضای سبز</h4>
                        <p className="text-xs md:text-sm text-gray-600">طراحی شده با ۴۰٪ فضای سبز و پارک‌های محلی</p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <div className="bg-gray-100 p-2 rounded-lg">
                        <Shield className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-800 text-sm md:text-base">امنیت</h4>
                        <p className="text-xs md:text-sm text-gray-600">سیستم نظارتی پیشرفته و کنترل تردد ۲۴ ساعته</p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <div className="bg-gray-100 p-2 rounded-lg">
                        <Wifi className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-800 text-sm md:text-base">امکانات هوشمند</h4>
                        <p className="text-xs md:text-sm text-gray-600">مجهز به سیستم خانه هوشمند و اینترنت پرسرعت</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
                    اهداف کلیدی پروژه:
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 sm:space-y-1.5 text-xs sm:text-sm">
                    <li>ایجاد محیطی پایدار با مصرف بهینه انرژی</li>
                    <li>استفاده از مصالح ساختمانی با کیفیت و دوستدار محیط زیست</li>
                    <li>تأمین نیازهای ساکنین با طراحی کاربرمحور و انعطاف‌پذیر</li>
                    <li>ارائه خدمات رفاهی و تفریحی متنوع برای تمامی گروه‌های سنی</li>
                </ul>
            </div>

        </div>
    );
}

export default SingleProjectHeaderSummary;