import { toPersianNumber } from "@/lib/ToPersianNumber";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
      <div className="flex justify-center flex-1 gap-2 order-1 sm:order-1">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${
              currentPage === i + 1
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {toPersianNumber(i + 1)}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage(1)}
        className="px-3 py-1 rounded-md text-xs bg-orange-100/50 text-orange-700 hover:bg-orange-100 transition cursor-pointer w-full sm:w-auto order-2 sm:order-2"
      >
        مشاهده همه
      </button>
    </div>
  );
};
