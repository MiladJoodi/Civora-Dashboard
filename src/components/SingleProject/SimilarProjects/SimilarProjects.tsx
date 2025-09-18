"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Project as DataProject } from "@/components/SingleProject/data";


interface SimilarProjectsProps {
    currentProjectId: number;
    projects: DataProject[];
    limit?: number;
  }

const SimilarProjects: React.FC<SimilarProjectsProps> = ({ currentProjectId, projects, limit = 3 }) => {
  const router = useRouter();

  const filteredProjects = projects
    .filter(p => p.id !== currentProjectId)
    .slice(0, limit);

  if (filteredProjects.length === 0) return null;

  return (
    <div className="mb-16">
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">پروژه های مشابه</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative h-36 md:h-48 overflow-hidden">
              <img
                src={project.mainImage}
                alt={project.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                {project.status === "completed" ? "تکمیل شده" : "در حال اجرا"}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">{project.name}</h4>
              <p className="text-gray-600 text-xs md:text-sm mb-4 line-clamp-2">
                پروژه ای مدرن با طراحی منحصر به فرد و امکانات پیشرفته
              </p>
              <Button
                variant="outline"
                className="w-full rounded-xl cursor-pointer"
                onClick={() => router.push(`/projects/${project.id}`)}
              >
                مشاهده جزئیات
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProjects;
