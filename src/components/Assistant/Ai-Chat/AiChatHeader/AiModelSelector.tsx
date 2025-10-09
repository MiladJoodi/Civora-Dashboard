"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { models } from "../data";

interface AiModelSelectorProps {
    selectedModel: string;
    setSelectedModel: (model: string) => void;
}

const AiModelSelector: React.FC<AiModelSelectorProps> = ({
    selectedModel,
    setSelectedModel,
}) => {
    return (
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
                        className={`cursor-pointer ${selectedModel === model ? "bg-orange-100 text-orange-700" : ""
                            }`}
                    >
                        {model}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AiModelSelector;
