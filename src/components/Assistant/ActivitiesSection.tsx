import RecentActivitiesCard from "./RecentActivitiesCard"
import QuickGuideCard from "./QuickGuideCard"

const ActivitiesSection = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RecentActivitiesCard />
            <QuickGuideCard />
        </div>
    );
}

export default ActivitiesSection;