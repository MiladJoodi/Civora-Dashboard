import { toPersianNumber } from "@/lib/ToPersianNumber";

const ProjectFeatures = () => {
    return (
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
                <h3 className="text-sm md:text-lg font-semibold text-gray-700 mb-3 md:mb-4 pb-2 border-b border-gray-200">
                    ویژگی‌های پروژه
                </h3>
                <ul className="space-y-3 md:space-y-4">
                    {[
                        "طراحی داخلی مدرن و لوکس با متریال درجه یک",
                        "سیستم هوشمند مدیریت ساختمان (BMS)",
                        "آسانسورهای پرسرعت و های-تک",
                        "امکانات رفاهی کامل (سالن ورزشی، استخر، لابی مجلل)"
                    ].map((text, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-4 p-3 md:p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md"
                        >
                            <div className="p-2 bg-orange-100 rounded-lg mt-0.5">
                                <span className="text-orange-500 font-medium">
                                    {toPersianNumber(index + 1)}
                                </span>
                            </div>
                            <span className="text-gray-700 text-sm md:text-base">{text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-sm md:text-lg font-semibold text-gray-700 mb-3 md:mb-4 pb-2 border-b border-gray-200">
                    جزئیات فنی
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base text-justify mb-5 md:mb-6">
                    این پروژه با رویکردی کاملاً حرفه‌ای و مطابق با آخرین استانداردهای معماری طراحی شده است.
                    تمامی بخش‌ها از طراحی داخلی گرفته تا سازه و محوطه‌سازی، با دقت و هماهنگی انجام شده‌اند.
                    امکانات رفاهی شامل فضای ورزشی، سالن اجتماعات، پارکینگ اختصاصی و فضاهای سبز مدرن است.
                </p>

                <div className="bg-orange-50 p-4 md:p-5 rounded-2xl border border-orange-100">
                    <h4 className="font-medium text-orange-700 mb-3 text-sm md:text-lg">
                        مشخصات فنی
                    </h4>
                    <ul className="text-orange-600 space-y-2">
                        {[
                            "اسکلت بتنی با مقاومت بالا",
                            "عایق‌کاری حرارتی و صوتی پیشرفته",
                            "سیستم اعلام و اطفاء حریق",
                            "پنل خورشیدی برای تأمین بخشی از انرژی"
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className="flex items-center gap-2 text-sm md:text-base"
                            >
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProjectFeatures;