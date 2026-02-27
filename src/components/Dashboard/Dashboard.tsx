import { stats } from "@/components/Dashboard/data"
import { StatsGrid } from "@/components/shared/StatsGrid/StatsGrid"
import Header from "./Header/Header"
import QuickActions from "./QuickActions/QuickActions"
import RevenueChart from "./Charts/RevenueChart"
import ProjectStatusChart from "./Charts/ProjectStatusChart"
import ActivityFeed from "./ActivityFeed/ActivityFeed"
import TransactionTable from "./TransactionTable/TransactionTable"

export default function Dashboard() {

    return (
        <div className="space-y-6">
            <Header />
            <StatsGrid stats={stats} />
            <QuickActions />

            {/* Charts row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <RevenueChart />
                <ProjectStatusChart />
            </div>

            {/* Activity feed + Transaction table */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                <div className="order-2 lg:order-1">
                    <TransactionTable />
                </div>
                <div className="order-1 lg:order-2">
                    <ActivityFeed />
                </div>
            </div>
        </div>
    )
}
