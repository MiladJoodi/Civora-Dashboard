import { FileText } from "lucide-react";
import { toPersianNumber } from "@/lib/ToPersianNumber";
import ProjectFeatures from "./ProjectFeatures";
import ProjectTechnicalDetails from "./ProjectTechnicalDetails";

const DetailsTab = () => {
    return (
        <div className="animate-in fade-in duration-500 mb-16">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <FileText className="text-orange-500 h-6 w-6" />
                    </div>
                    توضیحات کامل پروژه
                </h2>

                <ProjectFeatures />
            </div>

            <ProjectTechnicalDetails />

        </div>
    );
}

export default DetailsTab;