import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";


export const ProjectHeaderSkeleton = () => {
    return (
        <div className="flex flex-col lg:flex-row container max-w-6xl mx-auto px-4 py-8 relative z-10 gap-8 mb-16">
            {/* بخش چپ */}
            <div className="flex-1">
                <div className="mb-8">
                    {/* تیتر */}
                    <div className="flex items-center gap-3 mb-4">
                        <Skeleton circle width={40} height={40} />
                        <Skeleton width={180} height={32} />
                        <Skeleton circle width={28} height={28} />
                    </div>

                    {/* برچسب‌ها */}
                    <div className="flex gap-3 mb-4">
                        <Skeleton width={90} height={24} borderRadius={9999} />
                        <Skeleton width={110} height={24} borderRadius={9999} />
                    </div>

                    {/* توضیحات کوتاه */}
                    <div className="space-y-2">
                        <Skeleton width="75%" height={18} />
                        <Skeleton width="65%" height={18} />
                    </div>
                </div>

                {/* اطلاعات پروژه (تاریخ، مکان، تیم) */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"
                        >
                            <Skeleton circle width={20} height={20} />
                            <Skeleton width={100} height={18} />
                        </div>
                    ))}
                </div>

                {/* باکس خلاصه پروژه */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <Skeleton width={140} height={22} />
                    <div className="space-y-2">
                        <Skeleton width="100%" height={16} />
                        <Skeleton width="85%" height={16} />
                        <Skeleton width="70%" height={16} />
                    </div>

                    {/* ویژگی‌ها */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <Skeleton circle width={32} height={32} />
                                <div className="space-y-2">
                                    <Skeleton width={100} height={16} />
                                    <Skeleton width={130} height={14} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* بخش راست (تصویر و آمار) */}
            <div className="lg:w-2/5 space-y-6">
                {/* تصویر اصلی */}
                <Skeleton height={320} borderRadius={16} />

                {/* آمار پروژه */}
                <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white p-4 rounded-xl border border-gray-100 text-center"
                        >
                            <Skeleton circle width={32} height={32} className="mx-auto mb-2" />
                            <Skeleton width={60} height={20} className="mx-auto" />
                            <Skeleton width={50} height={14} className="mx-auto mt-1" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
