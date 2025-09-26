import AssistantHeader from "@/components/Assistant/AssistantHeader"
import { StatsGrid } from "@/components/shared/StatsGrid/StatsGrid"
import { assistantStats } from "@/components/Assistant/data"
import QuickActionsGrid from "@/components/Assistant/QuickActionsGrid"
import ActivitiesSection from "@/components/Assistant/ActivitiesSection"

export default function AssistantPage() {


  return (
    <div className=" space-y-6 px-3 container mx-auto">
      <AssistantHeader />
      <StatsGrid stats={assistantStats} />
      <QuickActionsGrid />
      <ActivitiesSection />
    </div>
  )
}
