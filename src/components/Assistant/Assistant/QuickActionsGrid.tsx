import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { quickActions } from "./data";

const QuickActionsGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                    <Card className={`cursor-pointer transition-all ${action.color}`}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                                {action.title}
                            </CardTitle>
                            <CardDescription>{action.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full group cursor-pointer bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 transition-colors">
                                <span className="relative z-10 flex items-center gap-2">
                                    شروع کنید
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                </span>
                            </Button>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}

export default QuickActionsGrid;