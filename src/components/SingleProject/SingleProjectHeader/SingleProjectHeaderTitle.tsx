import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Building2, Star } from "lucide-react";

type SingleProjectHeaderTitleProps = {
    projectName: string
    setIsFavorite: (value: boolean) => void;
    isFavorite: boolean
}

const SingleProjectHeaderTitle = ({ projectName, setIsFavorite, isFavorite }: SingleProjectHeaderTitleProps) => {
    return (
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-orange-300 to-orange-700 rounded-xl text-white">
                <Building2 className="h-8 w-8" />
            </div>
            {projectName}

            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="p-1.5 md:p-2 text-amber-400 hover:text-amber-500 transition-colors cursor-pointer"
                    >
                        <Star
                            className="h-7 w-7"
                            fill={isFavorite ? "currentColor" : "none"}
                        />
                    </button>
                </TooltipTrigger>
                <TooltipContent className="bg-orange-100/50 text-[#da8439] border border-orange-300 shadow-md">
                    افزودن به علاقه‌مندی ها
                </TooltipContent>
            </Tooltip>

        </h1>
    );
}

export default SingleProjectHeaderTitle;