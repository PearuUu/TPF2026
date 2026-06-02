import { useState } from "react";
import { Avatar } from "../../../components/base/Avatar";
import { Badge } from "../../../components/base/Badge";
import { Button } from "../../../components/base/Button";
import { Card } from "../../../components/base/Card";
import { SectionHeader } from "../../../components/base/SectionHeader";
import { Toggle } from "../../../components/base/Toggle";
import {
    activities,
    dashboardStats,
    favoriteDevices,
    quickActions,
} from "../mock";

const navItems = [
    { label: "Dashboard", active: true, icon: "▣" },
    { label: "Devices", active: false, icon: "▤" },
    { label: "Automation", active: false, icon: "◫" },
    { label: "Settings", active: false, icon: "⚙" },
];

const energyBars = [34, 46, 38, 60, 88, 56, 42, 30, 35, 49, 44, 28];

export function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <main className="min-h-screen">
            {/* ── Mobile top bar ── */}
            <div className="flex items-center justify-between border-b border-white/8 bg-slate-950/90 px-4 py-3 backdrop-blur-xl lg:hidden">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-400/15 text-base text-sky-300">
                        ⌂
                    </div>
                    <div>
                        <p className="text-sm font-semibold leading-none text-white">Concierge</p>
                        <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400">
                            System active
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300"
                        type="button"
                        aria-label="Notifications"
                    >
                        🔔
                    </button>
                    <Avatar name="Alex Morgan" size="sm" />
                </div>
            </div>

            {/* ── Sidebar overlay (mobile) ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            <div className="lg:flex lg:min-h-screen">
                {/* ── Sidebar ── */}
                <aside
                    className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/8 bg-slate-950/95 px-5 py-6 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 lg:w-[260px] lg:rounded-none lg:border-r lg:border-white/8 lg:bg-slate-950/85 lg:shadow-[0_24px_70px_rgba(2,8,23,0.45)] ${
                        sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    {/* Sidebar header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/15 text-lg text-sky-300">
                                ⌂
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Concierge</p>
                                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400">
                                    System active
                                </p>
                            </div>
                        </div>
                        <button
                            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-white/8 hover:text-white lg:hidden"
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            aria-label="Close menu"
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="mt-8 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                                    item.active
                                        ? "bg-slate-800/90 text-emerald-300 shadow-lg shadow-emerald-500/10"
                                        : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                                }`}
                                type="button"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <Card className="mt-6 bg-linear-to-br from-sky-500/20 to-emerald-500/10 p-5">
                        <div className="flex items-center gap-2 text-sky-200">
                            <span>✦</span>
                            <p className="text-sm font-semibold">Wskazówka od Concierge</p>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-300">
                            Obniżenie temperatury o zaledwie 1°C w nocy może zmniejszyć Twoje
                            rachunki za ogrzewanie o około 6% rocznie.
                        </p>
                        <Button className="mt-4 w-full" variant="secondary">
                            Optymalizuj teraz
                        </Button>
                    </Card>
                </aside>

                {/* ── Main content ── */}
                <section className="flex-1 overflow-x-hidden px-4 py-4 pb-24 lg:px-6 lg:py-6 lg:pb-6">
                    {/* Desktop page header */}
                    <header className="hidden lg:flex lg:flex-row lg:items-start lg:justify-between gap-6 border-b border-white/6 pb-6 mb-6">
                        <div>
                            <p className="text-sm font-medium text-slate-400">Home Sweet Home</p>
                            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                                Witaj w domu, Alex.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-6 text-slate-400">
                                Twój inteligentny asystent zoptymalizował parametry w 4
                                pomieszczeniach. System działa bez zakłóceń.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge tone="emerald">Wszystkie systemy aktywne</Badge>
                            <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 text-xs text-slate-300">
                                <span className="text-emerald-400">●</span>
                                72°F · Clear
                            </div>
                            <button
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300"
                                type="button"
                            >
                                🔔
                            </button>
                            <Avatar name="Alex Morgan" />
                        </div>
                    </header>

                    {/* Mobile page header (compact) */}
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

                    {/* ── Stats grid ── */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
                        {dashboardStats.map((stat) => (
                            <Card key={stat.label} className="p-4 lg:p-5">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 lg:text-xs">
                                    {stat.label}
                                </p>
                                <p className="mt-3 text-2xl font-semibold text-white lg:mt-4 lg:text-3xl">
                                    {stat.value}
                                </p>
                                <p className="mt-1.5 text-xs text-slate-400 lg:mt-2 lg:text-sm">
                                    {stat.sublabel}
                                </p>
                            </Card>
                        ))}
                    </div>

                    {/* ── Devices + Activity two-col on large screens ── */}
                    <div className="mt-5 grid gap-5 lg:mt-6 lg:gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                        {/* Left column */}
                        <div className="space-y-5 lg:space-y-6">
                            {/* Favorite devices */}
                            <div>
                                <SectionHeader
                                    title="Ulubione Urządzenia"
                                    action={
                                        <Button variant="ghost" className="px-0">
                                            Zarządzaj
                                        </Button>
                                    }
                                />
                                <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
                                    {favoriteDevices.map((device) => (
                                        <Card key={device.name} className="p-4 lg:p-5">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-start gap-3 lg:gap-4">
                                                    <div
                                                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-base lg:h-12 lg:w-12 lg:rounded-2xl lg:text-lg ${
                                                            device.tone === "emerald"
                                                                ? "bg-emerald-500/15 text-emerald-300"
                                                                : device.tone === "indigo"
                                                                ? "bg-indigo-500/15 text-indigo-300"
                                                                : device.tone === "violet"
                                                                ? "bg-violet-500/15 text-violet-300"
                                                                : "bg-slate-500/15 text-slate-300"
                                                        }`}
                                                    >
                                                        ⌘
                                                    </div>
                                                    <div>
                                                        <h3 className="text-sm font-semibold text-white lg:text-base">
                                                            {device.name}
                                                        </h3>
                                                        <p className="mt-0.5 text-xs text-slate-400 lg:mt-1 lg:text-sm">
                                                            {device.location}
                                                        </p>
                                                        <p className="mt-0.5 text-[11px] text-slate-500">
                                                            {device.detail}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Toggle checked={device.active} />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Energy + Quick Actions */}
                            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(220px,0.9fr)]">
                                <Card className="p-4 lg:p-5">
                                    <SectionHeader
                                        title="Zużycie Energii"
                                        description="Ostatnie 24 godziny"
                                    />
                                    <div className="mt-4 flex h-36 items-end gap-1.5 rounded-2xl bg-slate-900/60 px-3 py-4 ring-1 ring-inset ring-white/5 lg:mt-8 lg:h-48 lg:gap-2 lg:rounded-3xl lg:px-4 lg:py-5">
                                        {energyBars.map((bar, index) => (
                                            <div
                                                key={`${bar}-${index}`}
                                                className="flex flex-1 items-end justify-center"
                                            >
                                                <div
                                                    className={`w-full max-w-8 rounded-t-xl lg:rounded-t-2xl ${
                                                        index === 4 ? "bg-slate-100" : "bg-slate-700/90"
                                                    }`}
                                                    style={{ height: `${bar}%` }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 flex justify-between text-xs text-slate-500">
                                        <span>00:00</span>
                                        <span>06:00</span>
                                        <span>12:00</span>
                                        <span>18:00</span>
                                        <span>23:59</span>
                                    </div>
                                </Card>

                                <Card className="p-4 lg:p-5">
                                    <SectionHeader title="Szybkie Akcje" />
                                    <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
                                        {quickActions.map((action) => (
                                            <button
                                                key={action.label}
                                                className="flex aspect-square flex-col items-start justify-between rounded-xl border border-white/8 bg-slate-900/70 p-3 text-left transition hover:bg-slate-800/90 lg:rounded-2xl lg:p-4"
                                                type="button"
                                            >
                                                <span className="text-xl text-emerald-300 lg:text-2xl">
                                                    {action.icon}
                                                </span>
                                                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300 lg:text-xs lg:tracking-[0.2em]">
                                                    {action.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* Right column — activity + status */}
                        <div className="space-y-5 lg:space-y-6">
                            <Card className="p-4 lg:p-5">
                                <SectionHeader title="Ostatnia Aktywność" />
                                <div className="space-y-2.5 lg:space-y-3">
                                    {activities.map((activity) => (
                                        <div
                                            key={activity.title}
                                            className="rounded-xl border border-white/6 bg-slate-900/70 p-3.5 lg:rounded-2xl lg:p-4"
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="mt-1 h-8 w-1 flex-shrink-0 rounded-full bg-emerald-400 lg:h-10" />
                                                <div>
                                                    <h3 className="text-sm font-medium text-white">
                                                        {activity.title}
                                                    </h3>
                                                    <p className="mt-0.5 text-xs text-slate-400 lg:mt-1 lg:text-sm">
                                                        {activity.detail}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card className="p-4 lg:p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-white">Scena wieczorna</p>
                                        <p className="mt-1 text-sm text-slate-400">
                                            Podsumowanie automatyzacji
                                        </p>
                                    </div>
                                    <Badge tone="blue">Aktywna</Badge>
                                </div>
                                <div className="mt-4 space-y-3 rounded-2xl bg-slate-900/70 p-3.5 ring-1 ring-inset ring-white/5 lg:mt-5 lg:rounded-3xl lg:p-4">
                                    <div className="flex items-center justify-between text-sm text-slate-300">
                                        <span>Temperatura</span>
                                        <span>21°C</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-slate-300">
                                        <span>Oświetlenie</span>
                                        <span>35%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-slate-300">
                                        <span>Rolety</span>
                                        <span>Opuszczone</span>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4 lg:p-5">
                                <SectionHeader title="Status domu" />
                                <div className="space-y-2.5 lg:space-y-4">
                                    <div className="flex items-center justify-between rounded-xl bg-slate-900/70 px-3.5 py-2.5 lg:rounded-2xl lg:px-4 lg:py-3">
                                        <span className="text-sm text-slate-300">Bezpieczeństwo</span>
                                        <Badge tone="rose">Uzbrojone</Badge>
                                    </div>
                                    <div className="flex items-center justify-between rounded-xl bg-slate-900/70 px-3.5 py-2.5 lg:rounded-2xl lg:px-4 lg:py-3">
                                        <span className="text-sm text-slate-300">Łączność</span>
                                        <Badge tone="emerald">Stabilna</Badge>
                                    </div>
                                    <div className="flex items-center justify-between rounded-xl bg-slate-900/70 px-3.5 py-2.5 lg:rounded-2xl lg:px-4 lg:py-3">
                                        <span className="text-sm text-slate-300">Energia</span>
                                        <Badge tone="blue">Niska</Badge>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>

            {/* ── Mobile bottom nav ── */}
            <nav className="fixed bottom-0 inset-x-0 z-30 flex items-center border-t border-white/8 bg-slate-950/95 backdrop-blur-xl lg:hidden">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        type="button"
                        className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition ${
                            item.active ? "text-emerald-400" : "text-slate-500"
                        }`}
                    >
                        <span className="text-xl leading-none">{item.icon}</span>
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* ── FAB (hidden on mobile — bottom nav takes over) ── */}
            <button
                className="fixed bottom-6 right-6 hidden h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 text-2xl font-semibold text-slate-950 shadow-[0_18px_40px_rgba(16,185,129,0.35)] lg:flex"
                type="button"
                aria-label="Add"
            >
                +
            </button>
        </main>
    );
}
