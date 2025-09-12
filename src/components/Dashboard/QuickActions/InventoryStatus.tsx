import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building } from "lucide-react"

const InventoryStatus = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-green-600" />
                    وضعیت انبار
                </CardTitle>
                <CardDescription>موجودی و سفارشات جاری</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[
                        { item: "سیمان", stock: "450 تن", status: "موجود" },
                        { item: "میلگرد", stock: "120 تن", status: "کم موجود" },
                        { item: "آجر", stock: "8500 عدد", status: "موجود" },
                        { item: "شن و ماسه", stock: "25 متر مکعب", status: "سفارش داده شده" },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">{item.item}</p>
                                <p className="text-sm text-gray-600">{item.stock}</p>
                            </div>
                            <span
                                className={`px-2 py-1 text-xs rounded-full ${item.status === "موجود"
                                    ? "bg-green-100 text-green-800"
                                    : item.status === "کم موجود"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-blue-100 text-blue-800"
                                    }`}
                            >
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default InventoryStatus;