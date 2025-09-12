import { stats } from "@/components/Dashboard/data"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { StatsGrid } from "@/components/shared/StatsGrid/StatsGrid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, FileText, MessageSquare, Building, Bell, Home } from "lucide-react"
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
