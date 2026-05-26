import { useState } from "react";
import { Avatar } from "../../../components/base/Avatar";
import { Badge } from "../../../components/base/Badge";
import { Button } from "../../../components/base/Button";
import { Card } from "../../../components/base/Card";
import { SectionHeader } from "../../../components/base/SectionHeader";
import { Toggle } from "../../../components/base/Toggle";
import { BasePageLayout } from "../../../components/layout/BasePageLayout";

const navItems = [
    { label: "Dashboard", active: true, icon: "▣" },
    { label: "Devices", active: false, icon: "▤" },
    { label: "Automation", active: false, icon: "◫" },
    { label: "Settings", active: false, icon: "⚙" },
];

const energyBars = [34, 46, 38, 60, 88, 56, 42, 30, 35, 49, 44, 28];

export function Settings() {
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
                <div>
                    <p className="text-sm font-medium text-slate-400">Home Sweet Home</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                        Witaj w domu, Alex.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-6 text-slate-400">
                        Ustawienia
                    </p>
                </div>
            </header>

            {/* ── Mobile Page Header ── */}
            <div className="mb-5 lg:hidden">
                <p className="text-xs font-medium text-slate-400">Home Sweet Home</p>
                <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-white">
                    Witaj w domu, Alex.
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge tone="emerald">Wszystkie systemy aktywne</Badge>
                    <div className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/5 px-2.5 py-1.5 text-xs text-slate-300">
                        <span className="text-emerald-400">●</span>
                        72°F · Clear
                    </div>
                </div>
            </div>

        </BasePageLayout>
    );
}
