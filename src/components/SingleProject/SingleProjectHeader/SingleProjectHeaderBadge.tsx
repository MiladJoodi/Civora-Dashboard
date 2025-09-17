import { Award, CheckCircle } from "lucide-react";

const SingleProjectHeaderBadge = () => {
    return (
        <div className="flex flex-wrap items-center gap-2.5 md:gap-3 mb-4 select-none">
            <span className="px-2.5 py-1 bg-blue-100 text-blue-600 rounded-full text-xs md:text-sm flex items-center gap-1">
                <Award className="h-4 w-4" />
                پروژه برتر
            </span>
            <span className="px-2.5 py-1 bg-green-100 text-green-600 rounded-full text-xs md:text-sm flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                تضمین کیفیت
            </span>
        </div>
    );
}

export default SingleProjectHeaderBadge;