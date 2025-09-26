import { Home } from "lucide-react";
import PageHeader from "../../shared/PageHeader/PageHeader";
import LastUpdate from "./LastUpdate";

const Header = () => {
    return (
        <div className="flex gap-3 sm:items-center justify-between">
            <PageHeader
                title="داشبورد مدیریت"
                description="به سیستم مدیریت سیورا خوش آمدید"
                Icon={Home}
            />
            <div className="self-center">
                <LastUpdate />
            </div>
        </div>
    );
}

export default Header;