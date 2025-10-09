import ActivitiesSection from "@/components/Assistant/Assistant/ActivitiesSection"
import AssistantHeader from "@/components/Assistant/Assistant/AssistantHeader"
import { assistantStats } from "@/components/Assistant/Assistant/data"
import QuickActionsGrid from "@/components/Assistant/Assistant/QuickActionsGrid"
import { StatsGrid } from "@/components/shared/StatsGrid/StatsGrid"

export default function AssistantPage() {


  return (
    <div className="space-y-6 px-3 container mx-auto">
      <AssistantHeader />
      <StatsGrid stats={assistantStats} />
      <QuickActionsGrid />
      <ActivitiesSection />
    </div>
  )
}
