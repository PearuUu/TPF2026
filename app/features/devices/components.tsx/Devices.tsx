import { useState } from "react";
import { BasePageLayout } from "../../../components/layout/BasePageLayout";
import AddDeviceButton from "~/components/base/AddDeviceButton";
import { useNavigate } from "react-router";
import DevicePageLayout from "~/components/layout/DevicePageLayout";
import CategoryFilter from "~/components/base/CategoryFilter";

const navItems = [
    { label: "Dashboard", active: true, icon: "▣" },
    { label: "Devices", active: false, icon: "▤" },
    { label: "Automation", active: false, icon: "◫" },
    { label: "Settings", active: false, icon: "⚙" },
];

const energyBars = [34, 46, 38, 60, 88, 56, 42, 30, 35, 49, 44, 28];

export function Devices() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedSort, setSelectedSort] = useState<string>('Status'); // Domyślnie sortujemy po statusie

    return (
        <BasePageLayout
            navItems={navItems}
            onNavItemClick={(label) => console.log(`Navigated to: ${label}`)}
            tipDescription="Obniżenie temperatury o zaledwie 1°C w nocy może zmniejszyć Twoje rachunki za ogrzewanie o około 6% rocznie."
            onTipButtonClick={() => console.log("Optimize clicked")}
        >
            {/* ── Page Header ── */}
            <header className="hidden lg:flex lg:flex-row lg:items-start lg:justify-between gap-6 border-b border-white/6 pb-6 mb-6">
            </header>

            <CategoryFilter
                onCategoryChange={(category) => setSelectedCategory(category)}
                onSortChange={(sortBy) => setSelectedSort(sortBy)}
            />
            <DevicePageLayout
                activeCategory={selectedCategory}
                sortBy={selectedSort}
                />
            <AddDeviceButton onClick={()=> {navigate("/addDevice")}}/>

        </BasePageLayout>
    );
}
