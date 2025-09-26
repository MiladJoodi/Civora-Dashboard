import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-700 mt-8 py-12 relative overflow-hidden">
            <div className="container max-w-6xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* بخش درباره ما */}
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold mb-4 text-orange-500">
                            درباره ما
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            ما با بیش از ۱۵ سال تجربه در زمینه ساخت و ساز، پروژه‌های متعددی را با بالاترین استانداردها به پایان رسانده‌ایم.
                        </p>
                        <div className="flex space-x-4"> {/* فاصله ثابت بین همه آیکون‌ها */}
                            {/* GitHub */}
                            <a
                                href="https://github.com/MiladJoodi/Civora-Dashboard"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-100 hover:shadow-md flex items-center justify-center transition-all duration-300"
                            >
                                <FaGithub className="text-gray-800 text-xl" />
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/in/joodi/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-100 hover:shadow-md flex items-center justify-center transition-all duration-300"
                            >
                                <FaLinkedin className="text-blue-600 text-xl" />
                            </a>

                            {/* Instagram */}
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-100 hover:shadow-md flex items-center justify-center transition-all duration-300"
                            >
                                <FaInstagram className="text-pink-500 text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* لینک های سریع */}
                    <div>
                        <h4 className="text-xl font-bold mb-4 text-orange-500">
                            لینک‌های سریع
                        </h4>
                        <ul className="space-y-3">
                            {['پروژه‌ها', 'خدمات', 'درباره ما', 'تماس با ما'].map((item, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-amber-500 transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-2 h-2 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* تماس با ما */}
                    <div>
                        <h4 className="text-xl font-bold mb-4 text-orange-500">
                            تماس با ما
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-gray-600">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shadow-sm">
                                    <Phone className="h-4 w-4 text-amber-500" />
                                </div>
                                <span>۰۲۱-۸۸۷۶۵۴۳۲</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-600">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shadow-sm">
                                    <Mail className="h-4 w-4 text-amber-500" />
                                </div>
                                <span>info@Civora.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-600">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shadow-sm">
                                    <MapPin className="h-4 w-4 text-amber-500" />
                                </div>
                                <span>تهران، شهرک غرب</span>
                            </li>
                        </ul>
                    </div>

                    {/* خبرنامه */}
                    <div>
                        <h4 className="text-xl font-bold mb-4 text-orange-500">
                            خبرنامه
                        </h4>
                        <p className="text-gray-600 text-sm mb-4">
                            برای دریافت آخرین پروژه‌ها و اخبار در خبرنامه ما عضو شوید.
                        </p>
                        <div className="flex flex-col space-y-3">
                            <Input
                                placeholder="ایمیل خود را وارد کنید"
                                className="rounded-xl bg-gray-100 border-gray-200 text-gray-700 placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400"
                            />
                            <Button className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 py-3 text-white shadow-md cursor-pointer">
                                ارسال
                            </Button>
                        </div>
                    </div>
                </div>

                {/* خط جداکننده و کپی رایت */}
                <div className="border-t border-gray-200 mt-10 pt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        کلیه حقوق این سایت محفوظ است. | طراحی و توسعه با ❤️
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;