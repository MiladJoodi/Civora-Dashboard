import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";
import { faqs } from "./data";
import { Button } from "@/components/ui/button";

const FAQsAccordion = () => {


    return (
        <div className="flex flex-col">
            <Accordion
                type="single"
                collapsible
                className="mt-2 space-y-2 flex-1"
            >
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        value={`faq-${index}`}
                        className={`rounded-lg bg-gray-50 border-gray-200 ${index !== faqs.length - 1 ? "border-b" : ""
                            }`}
                    >
                        <AccordionTrigger className="flex items-center text-right font-normal justify-between gap-2 p-3 text-gray-700 text-sm hover:bg-gray-100 transition cursor-pointer">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="p-3 font-medium text-gray-600 text-sm">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <Button className="mt-2 w-full flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition cursor-pointer">
                مشاهده همه سوالات متداول
                <ArrowLeft className="w-3 h-3" />
            </Button>
        </div>
    );
};

export default FAQsAccordion;
