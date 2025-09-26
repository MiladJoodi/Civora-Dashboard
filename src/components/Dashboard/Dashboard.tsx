import { stats } from "@/components/Dashboard/data"
import { StatsGrid } from "@/components/shared/StatsGrid/StatsGrid"
import Header from "./Header/Header"
import QuickActions from "./QuickActions/QuickActions"

export default function Dashboard() {

    return (
        <div className="space-y-6">
            <Header />
            <StatsGrid stats={stats} />
            <QuickActions />
        </div>
    )
}
