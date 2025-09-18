import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";
import { toPersianNumber } from "@/lib/ToPersianNumber";

type ContactTabFormProps = {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    isSending: boolean;
    handleSend: (e: React.FormEvent<HTMLFormElement>) => void;
};


const ContactTabForm = ({ name, setName, email, setEmail, message, setMessage, isSending, handleSend }: ContactTabFormProps) => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 min-w-0">
            <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                    <MessageCircle className="text-orange-500 h-6 w-6" />
                </div>
                ارسال پیام
            </h2>

            <form onSubmit={handleSend} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        نام و نام خانوادگی
                    </label>
                    <Input
                        id="name"
                        placeholder="نام خود را وارد کنید"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="text-sm rounded-xl py-2.5 md:py-3 px-4 transition-all focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        آدرس ایمیل
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="ایمیل خود را وارد کنید"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="text-sm rounded-xl py-2.5 md:py-3 px-4 transition-all focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        متن پیام
                    </label>
                    <Textarea
                        id="message"
                        placeholder={`متن پیام خود را اینجا تایپ کنید... (حداکثر ${toPersianNumber(500)} کاراکتر)`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="text-sm resize-none min-h-[120px] md:min-h-[140px] text-gray-700 rounded-xl border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        maxLength={500}
                        required
                    />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-3">
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span className={message.length > 450 ? 'text-orange-500 font-medium' : ''}>
                            {toPersianNumber(message.length)}/{toPersianNumber(500)} کاراکتر
                        </span>
                        {message.length > 450 && (
                            <span className="text-orange-500">نزدیک به حد مجاز!</span>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={!message.trim() || !name.trim() || !email.trim() || isSending}
                        className="rounded-xl px-5 py-2.5 sm:px-7 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                    >
                        {isSending ? (
                            <>
                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                در حال ارسال...
                            </>
                        ) : (
                            <>
                                <Send className="h-5 w-5" />
                                ارسال پیام
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ContactTabForm;