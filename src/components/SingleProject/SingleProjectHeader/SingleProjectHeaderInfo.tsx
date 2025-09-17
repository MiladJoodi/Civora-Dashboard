import { toPersianNumber } from "@/lib/ToPersianNumber";
import { Calendar, MapPin, Users } from "lucide-react";

const SingleProjectHeaderInfo = () => {
    return (
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm md:text-base text-neutral-700">
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-neutral-500 stroke-[1.5]" />
                <span>
                    شروع: <span className="font-medium">شهریور {toPersianNumber(1402)}</span>
                </span>
            </div>

            <div className="h-4 w-px bg-neutral-300 mx-2 hidden md:block" />

            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-neutral-500 stroke-[1.5]" />
                <span>تهران، شهرک غرب</span>
            </div>

            <div className="h-4 w-px bg-neutral-300 mx-2 hidden md:block" />

            <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-neutral-500 stroke-[1.5]" />
                <span>
                    تیم: <span className="font-medium">۵ نفر</span>
                </span>
            </div>
        </div>
    );
}

export default SingleProjectHeaderInfo;