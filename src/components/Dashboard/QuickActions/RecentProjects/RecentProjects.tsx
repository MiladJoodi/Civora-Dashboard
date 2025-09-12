"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { recentProjects } from "./data";
import { ProjectItem } from "./ProjectItem";
import { Pagination } from "./Pagination";
import { ProjectsHeader } from "./ProjectsHeader";

const PAGE_SIZE = 5;

const RecentProjects = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("همه");

    const filteredProjects = filter === "همه" ? recentProjects : recentProjects.filter(p => p.status === filter);
    const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const currentProjects = filteredProjects.slice(startIndex, startIndex + PAGE_SIZE);

    return (
        <Card>
            <ProjectsHeader filter={filter} setFilter={setFilter} />
            <CardContent>
                <div className="space-y-4">
                    {currentProjects.map((project, index) => (
                        <ProjectItem
                            key={index}
                            index={startIndex + index}
                            project={project}
                        />
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </CardContent>
        </Card>
    );
};

export default RecentProjects;
