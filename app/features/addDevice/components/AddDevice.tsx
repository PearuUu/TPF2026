import { useState } from "react";
import { Badge } from "../../../components/base/Badge";
import { BasePageLayout } from "../../../components/layout/BasePageLayout";
import { useNavigate } from "react-router";
import { SearchDeviceLayout } from "~/components/layout/SearchDeviceLayout";
import { AddDevicePageLayout } from "~/components/layout/AddDeviceLayout";
import { ConfigureDeviceLayout } from "~/components/layout/ConfigureDeviceLayout";

const navItems = [
    { label: "Dashboard", active: true, icon: "▣" },
    { label: "Devices", active: false, icon: "▤" },
    { label: "Automation", active: false, icon: "◫" },
    { label: "Settings", active: false, icon: "⚙" },
];

const energyBars = [34, 46, 38, 60, 88, 56, 42, 30, 35, 49, 44, 28];

export function AddDevice() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

            <AddDevicePageLayout/>
            <SearchDeviceLayout/>
            <ConfigureDeviceLayout/>

        </BasePageLayout>
    );
}
