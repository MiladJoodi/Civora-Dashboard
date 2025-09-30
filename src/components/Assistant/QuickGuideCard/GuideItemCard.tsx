import { Clock, HelpCircle, MessageCircle } from "lucide-react";

const iconsMap: Record<string, React.ElementType> = {
    Clock,
    HelpCircle,
    MessageCircle,
};

interface GuideItemCardProps {
    title: string;
    description: string;
    icon: string;
    color: string;
    iconBg: string;
    iconColor: string;
}

const GuideItemCard: React.FC<GuideItemCardProps> = ({
    title,
    description,
    icon,
    color,
    iconBg,
    iconColor,
}) => {
    const Icon = iconsMap[icon];

    if (!Icon) {
        console.warn(`❌ Icon "${icon}" not found in iconsMap`);
        return null;
    }

    return (
        <div
            className={`group/item relative px-3 py-6 rounded-xl border border-gray-200/40 hover:border-${color}-300/50 hover:shadow-md transition-all duration-300 cursor-pointer`}
        >
            <div className="flex items-start gap-3">
                <div
                    className={`p-2 rounded-lg ${iconBg} ${iconColor} transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-12`}
                >
                    <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
                    <p className="text-gray-700 leading-5 text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default GuideItemCard;
