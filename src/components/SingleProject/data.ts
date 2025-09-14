// /data/data.ts
export interface Project {
  id: number;
  name: string;
  progress: number;
  status: string;
  mainImage: string;
  galleryImages: string[];
}

export const recentProjects: Project[] = [
  {
    id: 1,
    name: "پروژه برج سیورا",
    progress: 75,
    status: "در حال اجرا",
    mainImage: "/images/projects/project1-main.jpg",
    galleryImages: [
      "/images/projects/project1-1.jpg",
      "/images/projects/project1-2.jpg",
      "/images/projects/project1-3.jpg",
      "/images/projects/project1-4.jpg",
    ],
  },
  {
    id: 2,
    name: "مجتمع مسکونی آریا",
    progress: 45,
    status: "طراحی",
    mainImage: "/images/projects/project2-main.jpg",
    galleryImages: [
      "/images/projects/project2-1.jpg",
      "/images/projects/project2-2.jpg",
      "/images/projects/project2-3.jpg",
      "/images/projects/project2-4.jpg",
    ],
  },
  {
    id: 3,
    name: "پروژه تجاری پارس",
    progress: 90,
    status: "تکمیل",
    mainImage: "/images/projects/project3-main.jpg",
    galleryImages: [
      "/images/projects/project3-1.jpg",
      "/images/projects/project3-2.jpg",
      "/images/projects/project3-3.jpg",
      "/images/projects/project3-4.jpg",
    ],
  },
  {
    id: 4,
    name: "پروژه ویلاهای شمال",
    progress: 60,
    status: "در حال اجرا",
    mainImage: "/images/projects/project4-main.jpg",
    galleryImages: [
      "/images/projects/project4-1.jpg",
      "/images/projects/project4-2.jpg",
      "/images/projects/project4-3.jpg",
      "/images/projects/project4-4.jpg",
    ],
  },
  {
    id: 5,
    name: "مرکز خرید ستاره",
    progress: 30,
    status: "طراحی",
    mainImage: "/images/projects/project5-main.jpg",
    galleryImages: [
      "/images/projects/project5-1.jpg",
      "/images/projects/project5-2.jpg",
      "/images/projects/project5-3.jpg",
      "/images/projects/project5-4.jpg",
    ],
  },

];
