import ContactTabForm from "./ContactTabForm";
import ContactTabInfo from "./ContactTabInfo";

type ContactTabProps = {
    handleSend: (e: React.FormEvent<HTMLFormElement>) => void;
    isSending: boolean;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const ContactTab = ({ handleSend, isSending, name, setName, email, setEmail, message, setMessage }: ContactTabProps) => {

    return (
        <div className="animate-in fade-in duration-500 mb-16">
            <div className="grid md:grid-cols-2 gap-8">

                <ContactTabForm
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    message={message}
                    setMessage={setMessage}
                    isSending={isSending}
                    handleSend={handleSend}
                />

                <ContactTabInfo />

            </div>
        </div>
    );
};

export default ContactTab;
