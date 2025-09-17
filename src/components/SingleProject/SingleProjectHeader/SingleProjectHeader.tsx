import SingleProjectHeaderTitle from "./SingleProjectHeaderTitle";
import SingleProjectHeaderBadge from "./SingleProjectHeaderBadge";
import SingleProjectHeaderInfo from "./SingleProjectHeaderInfo";
import SingleProjectHeaderSummary from "./SingleProjectHeaderSummary";
import SingleProjectHeaderImage from "./SingleProjectHeaderImage";
import SingleProjectHeaderStats from "./SingleProjectHeaderStats";

type SingleProjectHeaderProps = {
    projectName: string
    projectMainImage: string
    setIsFavorite: (value: boolean) => void
    isFavorite: boolean
    openLightbox: (index: number) => void
}

const SingleProjectHeader = ({ projectName, projectMainImage, setIsFavorite, isFavorite, openLightbox }: SingleProjectHeaderProps) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
            <div className="flex-1">
                <div className="mb-8">
                    <SingleProjectHeaderTitle
                        projectName={projectName}
                        setIsFavorite={setIsFavorite}
                        isFavorite={isFavorite}
                    />
                    <SingleProjectHeaderBadge />
                    <p className="text-gray-600 max-w-3xl leading-relaxed text-sm md:text-base">
                        <span className="font-semibold text-blue-500">{projectName}</span> یک طرح مدرن و پیشرفته در حوزه ساخت‌وساز با استانداردهای بین‌المللی و طراحی منحصر به فرد است.
                    </p>
                </div>

                <SingleProjectHeaderInfo />
                <SingleProjectHeaderSummary projectName={projectName} />
            </div>

            <div className="lg:w-2/5">
                <div className="sticky top-16 md:top-24">
                    <SingleProjectHeaderImage
                        projectMainImage={projectMainImage}
                        projectName={projectName}
                        openLightbox={openLightbox}
                    />
                    <SingleProjectHeaderStats />
                </div>
            </div>
        </div>
    );
}

export default SingleProjectHeader;
