import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactTabInfo = () => {
    return (
        <div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <h3 className="text-base md:text-xl font-bold text-gray-800 mb-5">اطلاعات تماس</h3>
                <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-4 p-3 md:p-4 bg-orange-50/30 rounded-xl border border-orange-100 transition-all duration-300 hover:shadow-md hover:border-orange-200">
                        <div className="p-3 bg-orange-100 rounded-xl">
                            <MapPin className="text-orange-600 h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-orange-700/80">آدرس</p>
                            <p className="font-medium text-gray-800 text-sm md:text-base">تهران، شهرک غرب، فاز ۶، بلوار فرحزادی</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 md:p-4 bg-orange-50/30 rounded-xl border border-orange-100 transition-all duration-300 hover:shadow-md hover:border-orange-200">
                        <div className="p-3 bg-orange-100 rounded-xl">
                            <Mail className="text-orange-600 h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-orange-700/80">ایمیل</p>
                            <p className="font-medium text-gray-800 text-sm md:text-base">info@example.com</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 md:p-4 bg-orange-50/30 rounded-xl border border-orange-100 transition-all duration-300 hover:shadow-md hover:border-orange-200">
                        <div className="p-3 bg-orange-100 rounded-xl">
                            <Phone className="text-orange-600 h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-orange-700/80">تلفن</p>
                            <p className="font-medium text-gray-800 text-sm md:text-base">۰۲۱-۸۸۷۶۵۴۳۲</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-orange-100 to-amber-50 p-5 md:p-6 rounded-2xl border border-orange-200 shadow-sm">
                <h3 className="text-base md:text-xl font-bold text-orange-800 mb-3">نیاز به مشاوره تخصصی دارید؟</h3>
                <p className="mb-5 text-orange-700/80 text-sm md:text-base">
                    کارشناسان ما آماده پاسخگویی به سوالات شما درباره این پروژه هستند.
                </p>
                <Button className="w-full bg-white text-orange-700 hover:bg-orange-50 border border-orange-200 rounded-xl py-2.5 md:py-3 font-medium flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-md hover:border-orange-300">
                    <MessageCircle className="h-5 w-5" />
                    درخواست مشاوره رایگان
                </Button>
            </div>
        </div>
    );
}

export default ContactTabInfo;