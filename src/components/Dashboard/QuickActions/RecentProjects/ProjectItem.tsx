import { toPersianNumber } from "@/lib/ToPersianNumber";
import { AnimatedProgressBar } from "./AnimatedProgressBar";

interface Project {
  name: string;
  progress: number;
  status: string;
}

interface ProjectItemProps {
  index: number;
  project: Project;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ index, project }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-4">

      <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-100 text-orange-700 font-bold text-xs sm:text-sm flex-shrink-0">
        {toPersianNumber(index + 1)}
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-lg gap-2 sm:gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <p className="font-medium text-gray-900">{project.name}</p>
            <p className="text-sm text-gray-600">{project.status}</p>
          </div>

          <div className="w-full sm:w-40">
            <AnimatedProgressBar
              progress={project.progress}
              color="#da8439"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
