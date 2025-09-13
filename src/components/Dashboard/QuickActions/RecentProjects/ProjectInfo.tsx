import Link from "next/link";

interface ProjectInfoProps {
    id: number;
    name: string;
    status: string;
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({ id, name, status }) => {
    const getStatusClasses = (status: string) => {
        switch (status) {
            case "در حال اجرا":
                return "bg-green-100 text-green-700";
            case "طراحی":
                return "bg-yellow-100 text-yellow-700";
            case "تکمیل":
                return "bg-blue-100 text-blue-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="flex flex-row justify-between sm:items-center sm:gap-2">
            <Link
                href={`/projects/${id}`}
                className="relative text-gray-900 font-medium 
             after:absolute after:-bottom-0.5 after:right-0 after:w-0 after:h-[1px] after:bg-gray-400 
             after:transition-all after:duration-600 hover:after:w-full"
            >
                {name}
            </Link>

            <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium select-none ${getStatusClasses(
                    status
                )}`}
            >
                {status}
            </span>
        </div>
    );
};
