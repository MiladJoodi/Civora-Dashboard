import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader/PageHeader";
import { Bot } from "lucide-react";
import AiModelSelector from "./AiModelSelector";
import { models } from "../data";

const AiChatHeader = () => {
  const [selectedModel, setSelectedModel] = useState("GPT-5 (پیشنهادی)");

  return (
    <div className="flex items-center justify-between">
      <PageHeader
        title="چت هوشمند"
        description="گفتگو با دستیار هوشمند"
        Icon={Bot}
      />
      <AiModelSelector
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
    </div>
  );
};

export default AiChatHeader;
