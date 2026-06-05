import { useState } from "react";
import { Badge } from "../../../components/base/Badge";
import { BasePageLayout } from "../../../components/layout/BasePageLayout";
import { useNavigate } from "react-router";
import { Lightbulb, Radio, Video, Plug, Thermometer, Ellipsis } from 'lucide-react';
import DeviceType from "~/components/base/DeviceType";
import { DevicePageLayout } from "~/components/layout/DevicePageLayout";

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
                <div>
                    <p className="text-sm font-medium text-slate-400">Home Sweet Home</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                        Witaj w domu, Alex.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-6 text-slate-400">
                        Dodaj urządzenie
                    </p>
                </div>
            </header>

            <DevicePageLayout/>

            {/* <div className="bg-[#2D3449] min-h-screen p-6 md:p-12 flex justify-center items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-[1400px] w-full">
                    <DeviceType 
                        title="Oświetlenie"
                        content="Żarównki, taśmy led, panele"
                        Icon={Lightbulb}
                        initialState={false}
                    />

                    <DeviceType 
                        title="Czujnik"
                        content="Ruch, dym, zalanie, CO2"
                        Icon={Radio}
                        initialState={false}
                    />

                    <DeviceType 
                        title="Kamera"
                        content="Monitoring, dzwonek video"
                        Icon={Video}
                        initialState={true}
                    />

                    <DeviceType 
                        title="Gniezdko"
                        content="Smart plug'i i listwy"
                        Icon={Plug}
                        initialState={false}
                    />

                    <DeviceType 
                        title="Klimat"
                        content="Termostaty, nawilzacze"
                        Icon={Thermometer}
                        initialState={false}
                    />

                    <DeviceType 
                        title="Inne"
                        content="Ustawienia niestandardowe"
                        Icon={Ellipsis}
                        initialState={false}
                    />
                </div>
            </div> */}

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
