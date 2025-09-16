import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
    title: string;
    description?: string;
    Icon?: LucideIcon;
    iconClassName?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, Icon, iconClassName }) => {
    return (
        <div className="flex items-start sm:items-center gap-2 sm:gap-4">
            {Icon && <Icon className={`w-6 h-6 sm:w-7 sm:h-7 text-gray-700 ${iconClassName}`} />}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
                {description && <p className="text-gray-600 text-sm sm:text-base mt-1">{description}</p>}
            </div>
        </div>
    );
};

export default PageHeader;
