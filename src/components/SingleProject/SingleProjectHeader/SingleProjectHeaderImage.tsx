import { Expand } from "lucide-react";

type SingleProjectHeaderImageProps = {
    projectMainImage: string;
    projectName: string;
    openLightbox: (index: number) => void
}

const SingleProjectHeaderImage = ({ projectMainImage, projectName, openLightbox }: SingleProjectHeaderImageProps) => {
    return (
        <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            <img
                src={projectMainImage}
                alt={projectName}
                className="w-full h-44 sm:h-60 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <button
                onClick={() => openLightbox(0)}
                className="absolute top-4 right-4 p-2 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 backdrop-blur-sm cursor-pointer"
            >
                <Expand size={22} />
            </button>
        </div>
    );
}

export default SingleProjectHeaderImage;