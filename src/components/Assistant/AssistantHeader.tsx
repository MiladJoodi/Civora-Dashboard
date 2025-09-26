import { Shield, Cpu, Zap } from "lucide-react";
import PageHeader from "../shared/PageHeader/PageHeader";
import { Badge } from "../ui/badge";

const AssistantHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <PageHeader
                title="مرکز دستیاری"
                description="دستیار هوشمند و سیستم پشتیبانی"
                Icon={Cpu}
            />
            <div className="flex flex-col sm:flex-row items-center gap-1">
                <Badge variant="secondary" className="flex items-center gap-1 bg-orange-50 text-orange-700 border-orange-200 px-3 py-1.5">
                    <Zap className="w-3 h-3 text-orange-500" />
                    سیستم فعال
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 bg-orange-50 text-orange-700 border-orange-200 px-3 py-1.5">
                    <Shield className="w-3 h-3  text-orange-500 " />
                    وضعیت پایدار
                </Badge>
            </div>
        </div>
    );
}

export default AssistantHeader;