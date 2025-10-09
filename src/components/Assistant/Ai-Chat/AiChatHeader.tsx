"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader/PageHeader";
import { Bot, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const AiChatHeader = () => {
  const [selectedModel, setSelectedModel] = useState("GPT-5 (پیشنهادی)");

  const models = [
    "GPT-5 (پیشنهادی)",
    "GPT-4 Turbo",
    "GPT-3.5 Legacy",
    "Custom Fine-Tuned",
  ];

  return (
    <div className="flex items-center justify-between">
      <PageHeader
        title="چت هوشمند"
        description="گفتگو با دستیار هوشمند"
        Icon={Bot}
      />

      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-xl border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100 transition-all cursor-pointer"
          >
            <span className="text-xs">{selectedModel}</span>
            <ChevronDown className="w-4 h-4 opacity-70" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-46">
          <DropdownMenuLabel>انتخاب مدل هوش مصنوعی</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {models.map((model) => (
            <DropdownMenuItem
            dir="ltr"
              key={model}
              onClick={() => setSelectedModel(model)}
              className={`cursor-pointer ${
                selectedModel === model
                  ? "bg-orange-100 text-orange-700"
                  : ""
              }`}
            >
              {model}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AiChatHeader;
