import { useState } from "react";
import { Avatar } from "../../../components/base/Avatar";
import { Badge } from "../../../components/base/Badge";
import { Button } from "../../../components/base/Button";
import { Card } from "../../../components/base/Card";
import { BasePageLayout } from "../../../components/layout/BasePageLayout";
import { Pencil, MapPin, Clock, Plus, MoreVertical, RefreshCw, LayoutGrid, MonitorSmartphone, Bot, Settings as SettingsIcon } from "lucide-react";

const navItems = [
    { label: "Dashboard", active: false, icon: <LayoutGrid size={18} /> },
    { label: "Devices", active: false, icon: <MonitorSmartphone size={18} /> },
    { label: "Automation", active: false, icon: <Bot size={18} /> },
    { label: "Settings", active: true, icon: <SettingsIcon size={18} /> },
];

export function Settings() {
    return (
        <BasePageLayout
            navItems={navItems}
            onNavItemClick={(label) => console.log(`Navigated to: ${label}`)}
            tipDescription="Obniżenie temperatury o zaledwie 1°C w nocy może zmniejszyć Twoje rachunki za ogrzewanie o około 6% rocznie. Czy chcesz, abym zoptymalizował Twój harmonogram?"
            onTipButtonClick={() => console.log("Optimize clicked")}
        >
            {/* ── Page Header ── */}
            <header className="hidden lg:flex lg:flex-row lg:items-start lg:justify-between gap-6 border-b border-white/6 pb-6 mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                        System Settings
                    </h1>
                    <p className="text-sm text-slate-400">
                        Manage your digital environment, access controls, and core configurations.
                    </p>
                </div>
            </header>

            {/* ── Mobile Page Header ── */}
            <div className="mb-8 lg:hidden">
                <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
                    System Settings
                </h1>
                <p className="text-sm text-slate-400 mb-4">
                    Manage your digital environment, access controls, and core configurations.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* ── Left Column ── */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Identity Card */}
                    <Card className="flex flex-col items-center text-center p-8">
                        <Avatar
                            src="https://i.pravatar.cc/150?img=11"
                            alt="Elias Vance"
                            size="xl"
                            className="mb-4 w-20 h-20"
                        />
                        <h2 className="text-lg font-semibold text-white">Elias Vance</h2>
                        <p className="text-sm text-blue-400 mb-6">elias.vance@sentient.io</p>
                        <Button variant="secondary" className="w-full justify-center bg-slate-800 hover:bg-slate-700" icon={<Pencil size={14} />}>
                            Edit Identity
                        </Button>
                    </Card>

                    {/* Environment Config Card */}
                    <Card className="p-0 overflow-hidden">
                        <div className="flex items-center gap-2 p-4 border-b border-slate-800 bg-slate-800/50">
                            <MapPin size={16} className="text-slate-400" />
                            <h3 className="text-sm font-semibold text-white">Environment Config</h3>
                        </div>
                        <div className="p-4 flex flex-col gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                                    Primary Node Address
                                </label>
                                <div className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                                    <MapPin size={16} className="text-slate-400 mt-0.5" />
                                    <div className="text-sm text-slate-300">
                                        Unit 402, Apex Towers<br />
                                        Neo-Reykjavik, Sector 7
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                                    Temporal Sync (Timezone)
                                </label>
                                <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                                    <Clock size={16} className="text-slate-400" />
                                    <select className="bg-transparent text-sm text-slate-300 w-full outline-none appearance-none cursor-pointer">
                                        <option value="GMT-08:00">GMT-08:00 (Pacific)</option>
                                        <option value="GMT+01:00">GMT+01:00 (CET)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ── Right Column ── */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Access Protocol Card */}
                    <Card className="p-0">
                        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-800/20">
                            <div>
                                <h3 className="text-base font-semibold text-white mb-1">Access Protocol</h3>
                                <p className="text-xs text-slate-400">Manage entities with clearance to this environment.</p>
                            </div>
                            <button className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900 hover:bg-emerald-400 transition-colors">
                                <Plus size={18} />
                            </button>
                        </div>
                        <div className="flex flex-col p-4 gap-2">
                            {/* User 1 */}
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 transition-colors group border border-transparent hover:border-slate-700">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-semibold text-slate-300">
                                        EV
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-white">Elias Vance</h4>
                                        <p className="text-xs text-slate-400">elias.vance@sentient.io</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge tone="emerald" className="bg-emerald-500/10 text-emerald-400 border-none uppercase text-[10px] px-2 py-0.5 font-bold">
                                        Admin
                                    </Badge>
                                    <button className="text-slate-500 hover:text-white transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* User 2 */}
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 transition-colors group border border-transparent hover:border-slate-700">
                                <div className="flex items-center gap-4">
                                    <Avatar
                                        src="https://i.pravatar.cc/150?img=5"
                                        alt="Sarah Vance"
                                        size="md"
                                        className="w-10 h-10"
                                    />
                                    <div>
                                        <h4 className="text-sm font-medium text-white">Sarah Vance</h4>
                                        <p className="text-xs text-slate-400">sarah.v@sentient.io</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge tone="slate" className="bg-slate-800 text-slate-300 border-none uppercase text-[10px] px-2 py-0.5 font-bold">
                                        Resident
                                    </Badge>
                                    <button className="text-slate-500 hover:text-white transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* User 3 */}
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 transition-colors group border border-transparent hover:border-slate-700">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-semibold text-slate-400">
                                        GS
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-white">Guest Network</h4>
                                        <p className="text-xs text-slate-400">Exp: 24h Remaining</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge tone="slate" className="bg-slate-800 text-slate-300 border-none uppercase text-[10px] px-2 py-0.5 font-bold">
                                        Temporary
                                    </Badge>
                                    <button className="text-slate-500 hover:text-white transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Firmware Matrix Card */}
                    <Card className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-slate-800/40">
                        <div className="flex items-start gap-4 mb-4 sm:mb-0">
                            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                                <RefreshCw size={20} />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-white mb-1">Firmware Matrix</h3>
                                <p className="text-sm text-slate-400">
                                    Core OS is currently running <span className="text-white font-medium">v4.2.1-stable</span>
                                </p>
                                <p className="text-xs text-slate-500 mt-1">Last synced: 2 hours ago</p>
                            </div>
                        </div>
                        <Button variant="secondary" className="bg-slate-800 hover:bg-slate-700 whitespace-nowrap">
                            Check Integrity
                        </Button>
                    </Card>
                </div>
            </div>
        </BasePageLayout>
    );
}
