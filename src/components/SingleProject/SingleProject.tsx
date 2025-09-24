"use client";

import { useState, useEffect, useCallback } from "react";
import { recentProjects } from "@/components/SingleProject/data";
import { ProjectHeaderSkeleton } from "./SingleProjectSkeleton";
import NotFound from "./NotFound";
import ProgressBar from "./ProgressBar";
import Lightbox from "./Lightbox/Lightbox";
import BackButton from "./BackButton";
import SingleProjectHeader from "./SingleProjectHeader/SingleProjectHeader";
import SingleProjectTabs from "./SingleProjectTabs/SingleProjectTabs";
import DetailsTab from "./SingleProjectTabs/DetailsTab/DetailsTab";
import GalleryTab from "./SingleProjectTabs/GalleryTab/GalleryTab";
import ContactTab from "./SingleProjectTabs/ContactTab/ContactTab";
import SimilarProjects from "./SimilarProjects/SimilarProjects";

interface SingleProjectProps {
  id: number;
}

const SingleProject: React.FC<SingleProjectProps> = ({ id }) => {

  const [project, setProject] = useState<typeof recentProjects[0] | null>(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const found = recentProjects.find((p) => p.id === id);
    setProject(found || null);

    const timer = setTimeout(() => {
      setLoading(false) //
    }, 3000);

    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    const container = document.querySelector("main") as HTMLElement | null;

    const computeProgress = () => {
      if (container) {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;
        const percent = scrollHeight > 0 ? Math.min((scrollTop / scrollHeight) * 100, 100) : 0;
        setScrollProgress(percent);
      } else {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
        setScrollProgress(percent);
      }
    };

    // Initialize on mount
    computeProgress();

    const target: any = container || window;
    target.addEventListener("scroll", computeProgress, { passive: true });
    return () => target.removeEventListener("scroll", computeProgress);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      alert(`پیام شما با موفقیت ارسال شد!\nنام: ${name}\nایمیل: ${email}\nپیام: ${message}`);
      setMessage("");
      setName("");
      setEmail("");
      setIsSending(false);
    }, 1000);
  };

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const goToPrev = useCallback(() => {
    setLightboxIndex(prev => (prev > 0 ? prev - 1 : project!.galleryImages.length - 1));
  }, [project]);

  const goToNext = useCallback(() => {
    setLightboxIndex(prev => (prev < project!.galleryImages.length - 1 ? prev + 1 : 0));
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, goToPrev, goToNext]);

  if (loading) {
    return <ProjectHeaderSkeleton />
  }

  if (!project) {
    return (
      <NotFound />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
      <ProgressBar />

      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-orange-200/10 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl"></div>

      {lightboxOpen && (
        <Lightbox
          closeLightbox={closeLightbox}
          goToPrev={goToPrev}
          goToNext={goToNext}
          project={project}
          lightboxIndex={lightboxIndex}
          setLightboxIndex={setLightboxIndex}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
        />
      )}

      <div className="container max-w-6xl mx-auto px-4 py-8 relative z-10">

        <BackButton />

        <SingleProjectHeader projectName={project.name}
          projectMainImage={project.mainImage}
          setIsFavorite={setIsFavorite}
          isFavorite={isFavorite}
          openLightbox={openLightbox}
        />

        <SingleProjectTabs setActiveTab={setActiveTab}
          activeTab={activeTab}
          projectGalleryImagesLength={project.galleryImages.length} />

        {activeTab === "details" && <DetailsTab />}

        {activeTab === "gallery" && (
          <GalleryTab
            images={project.galleryImages}
            openLightbox={openLightbox}
          />
        )}

        {activeTab === "contact" && (
          <ContactTab
            handleSend={handleSend}
            isSending={isSending}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            message={message}
            setMessage={setMessage}
          />
        )}

        <SimilarProjects
          currentProjectId={project.id}
          projects={recentProjects}
          limit={3}
        />

      </div>

    </div>
  );
};

export default SingleProject;