import { Bell, Home } from "lucide-react";
import PageHeader from "../../shared/PageHeader/PageHeader";
import LastUpdate from "./LastUpdate";

const Header = () => {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <PageHeader
                title="داشبورد مدیریت"
                description="به سیستم مدیریت پروژه‌های سیورا خوش آمدید"
                Icon={Home}
            />
            <div className="self-end sm:self-auto">
                <LastUpdate />
            </div>
        </div>
    );
}

export default Header;