import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
    title: string;
    description?: string;
    Icon?: LucideIcon;
    iconClassName?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, Icon, iconClassName }) => {
    return (
        <div className="flex items-center space-x-4">
            {Icon && <Icon className={`w-7 h-7 text-gray-700 ${iconClassName}`} />}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                {description && <p className="text-gray-600 mt-1">{description}</p>}
            </div>
        </div>
    );
};

export default PageHeader;
