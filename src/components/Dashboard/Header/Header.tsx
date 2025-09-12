import { Bell, Home } from "lucide-react";
import PageHeader from "../../shared/PageHeader/PageHeader";
import LastUpdate from "./LastUpdate";

const Header = () => {
    return (
        <div className="flex items-center justify-between">
            <PageHeader
                title="داشبورد مدیریت"
                description="به سیستم مدیریت پروژه‌های سیورا خوش آمدید"
                Icon={Home}
            />
            <LastUpdate />
        </div>
    );
}

export default Header;