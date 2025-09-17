import { CheckCircle, Building2, BarChart3, Clock } from "lucide-react";

const stats = [
    {
        icon: <BarChart3 className="h-5 w-5 text-neutral-500 stroke-[1.5]" />,
        value: "۲۴۰۰",
        label: "متر مربع",
    },
    {
        icon: <Clock className="h-5 w-5 text-neutral-500 stroke-[1.5]" />,
        value: "۸۵٪",
        label: "پیشرفت",
    },
    {
        icon: <Building2 className="h-5 w-5 text-neutral-500 stroke-[1.5]" />,
        value: "۱۸",
        label: "طبقه",
    },
    {
        icon: <CheckCircle className="h-5 w-5 text-neutral-500 stroke-[1.5]" />,
        value: "۴۵",
        label: "واحد",
    },
];

const SingleProjectHeaderStats = () => {
    return (
        <div className="grid grid-cols-2 gap-3 md:gap-4 mt-18">
            {stats.map((item, idx) => (
                <div
                    key={idx}
                    className="bg-white p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors text-center"
                >
                    <div className="mb-3 flex justify-center">{item.icon}</div>
                    <div className="text-xl font-semibold text-neutral-800">{item.value}</div>
                    <div className="text-xs text-neutral-500 mt-1">{item.label}</div>
                </div>
            ))}
        </div>
    );
}

export default SingleProjectHeaderStats;