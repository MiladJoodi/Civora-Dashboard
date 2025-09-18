import { toPersianNumber } from "@/lib/ToPersianNumber";

const ProjectTechnicalDetails = () => {
    return (
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
                جدول زمانی پروژه
            </h3>
            <div className="relative">
                <div className="absolute left-0 top-4 bottom-4 w-1 bg-orange-100 ml-3 sm:ml-4"></div>
                <div className="space-y-4 sm:space-y-6 md:space-y-8 relative">
                    {[
                        { phase: "فاز اول: مطالعات و طراحی", progress: 100, date: "1402/05/10 - 1402/07/20" },
                        { phase: "فاز دوم: عملیات خاکی و اسکلت", progress: 100, date: "1402/07/21 - 1402/11/15" },
                        { phase: "فاز سوم: تاسیسات و نازک کاری", progress: 85, date: "1402/11/16 - 1403/04/10" },
                        { phase: "فاز چهارم: تکمیل و تحویل", progress: 30, date: "1403/04/11 - 1403/08/01" }
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100 flex-1">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                    <h4 className="font-medium text-gray-800 text-sm sm:text-base">{item.phase}</h4>
                                    <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">
                                        {toPersianNumber(item.date)}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                                    <div
                                        className="bg-blue-500 h-2 sm:h-2.5 rounded-full transition-all duration-1000"
                                        style={{ width: `${item.progress}%` }}
                                    />
                                </div>
                                <div className="text-xs text-gray-500 mt-2 text-left">
                                    {toPersianNumber(item.progress)}% تکمیل شده
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProjectTechnicalDetails;