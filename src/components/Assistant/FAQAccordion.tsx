import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";

const FAQsAccordion = () => {
    const faqs = [
        {
            question: "چطور می‌توانم یک چت جدید شروع کنم؟",
            answer: "روی دکمه 'شروع چت' کلیک کنید."
        },
        {
            question: "میانگین زمان پاسخ چقدر است؟",
            answer: "حدود ۲ تا ۵ دقیقه."
        },
        {
            question: "چگونه می‌توانم گزارش فعالیت‌ها را مشاهده کنم؟",
            answer: "به بخش 'فعالیت‌های اخیر' مراجعه کنید."
        },
        {
            question: "آیا می‌توانم چندین سرویس را همزمان استفاده کنم؟",
            answer: "بله، همزمان از چند سرویس می‌توانید استفاده کنید."
        }
    ];

    return (
        <div className="flex flex-col">
            <Accordion
                type="single"
                collapsible
                defaultValue="faq-0"
                className="mt-2 space-y-2 flex-1"
            >
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        value={`faq-${index}`}
                        className={`rounded-lg bg-gray-50 border-gray-200 ${index !== faqs.length - 1 ? "border-b" : ""
                            }`}
                    >
                        <AccordionTrigger className="flex items-center font-normal justify-between gap-2 p-3 text-gray-700 text-sm hover:bg-gray-100 transition cursor-pointer">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="p-3 font-medium text-gray-600 text-sm">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <button className="mt-2 w-full flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition cursor-pointer">
                مشاهده همه سوالات متداول
                <ArrowLeft className="w-3 h-3" />
            </button>
        </div>
    );
};

export default FAQsAccordion;
