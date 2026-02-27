"use client";

import { Button } from "@/components/ui/button";

interface Suggestion {
    text: string;
    icon: any;
}

interface QuickSuggestionsProps {
    suggestions: Suggestion[];
    onSelect: (text: string) => void;
}

const QuickSuggestions: React.FC<QuickSuggestionsProps> = ({ suggestions, onSelect }) => {
    return (
        <div className="space-y-2">
            {suggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                    <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start text-right bg-transparent"
                        onClick={() => onSelect(suggestion.text)}
                    >
                        <Icon className="w-4 h-4 ml-2" />
                        {suggestion.text}
                    </Button>
                );
            })}
        </div>
    );
};

export default QuickSuggestions;
