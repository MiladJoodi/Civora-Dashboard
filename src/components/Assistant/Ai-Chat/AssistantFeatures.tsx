"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
  icon: any;
  colorBg: string;
  colorText: string;
  iconColor: string;
}

interface AssistantFeaturesProps {
  features: Feature[];
}

const AssistantFeatures: React.FC<AssistantFeaturesProps> = ({ features }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>قابلیت‌های دستیار هوشمند</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className={`p-4 rounded-lg ${feature.colorBg}`}>
                <Icon className={`w-6 h-6 mb-2 ${feature.iconColor}`} />
                <h3 className={`font-medium mb-1 ${feature.colorText}`}>{feature.title}</h3>
                <p className={`text-sm ${feature.colorText.replace("-900", "-700")}`}>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssistantFeatures;
