import RecentProjects from "./RecentProjects/RecentProjects";
import InventoryStatus from "./InventoryStatus";

const QuickActions = () => {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
            <RecentProjects />
            {/* <InventoryStatus /> */}
        </div>
    );
}

export default QuickActions;