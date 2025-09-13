"use client";

import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface ProjectsHeaderProps {
  filter: string;
  setFilter: (status: string) => void;
}

const statusColors: Record<string, string> = {
  "در حال اجرا": "bg-green-100 text-green-700",
  "طراحی": "bg-yellow-100 text-yellow-700",
  "تکمیل": "bg-blue-100 text-blue-700",
  "همه": "bg-orange-100 text-gray-700"
};

export const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({ filter, setFilter }) => {
  return (
    <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="flex gap-2">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        <div className="flex flex-col gap-1">
          <CardTitle>پروژه‌های جدید</CardTitle>
          <CardDescription>آخرین فعالیت‌های پروژه‌ها</CardDescription>
        </div>
      </div>

      {/* فیلتر پروژه‌ها */}
      <div className="flex gap-2 mt-2 sm:mt-0">
        {["همه", "در حال اجرا", "طراحی", "تکمیل"].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition cursor-pointer ${
              filter === status ? statusColors[status] : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </CardHeader>
  );
};
