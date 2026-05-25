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
    return (
        <main className="min-h-screen px-4 py-4 lg:px-6 lg:py-6">
            <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-375 gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
                <aside className="rounded-[1.75rem] border border-white/8 bg-slate-950/85 p-5 shadow-[0_24px_70px_rgba(2,8,23,0.45)] backdrop-blur-xl">
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

                    <nav className="mt-8 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${item.active
                                        ? "bg-slate-800/90 text-emerald-300 shadow-lg shadow-emerald-500/10"
                                        : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                                    }`}
                                type="button"
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

                <section className="rounded-[1.75rem] border border-white/8 bg-slate-950/75 p-5 shadow-[0_24px_70px_rgba(2,8,23,0.45)] backdrop-blur-xl lg:p-7">
                    <header className="flex flex-col gap-6 border-b border-white/6 pb-6 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-400">Home Sweet Home</p>
                            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                                Witaj w domu, Alex.
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 lg:text-base">
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

                    <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                        <div className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                {dashboardStats.map((stat) => (
                                    <Card key={stat.label} className="p-5">
                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                            {stat.label}
                                        </p>
                                        <div className="mt-4 flex items-end gap-2">
                                            <p className="text-3xl font-semibold text-white">{stat.value}</p>
                                        </div>
                                        <p className="mt-2 text-sm text-slate-400">{stat.sublabel}</p>
                                    </Card>
                                ))}
                            </div>

                            <div>
                                <SectionHeader title="Ulubione Urządzenia" action={<Button variant="ghost" className="px-0">Zarządzaj</Button>} />
                                <div className="grid gap-4 md:grid-cols-2">
                                    {favoriteDevices.map((device) => (
                                        <Card key={device.name} className="p-5">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-start gap-4">
                                                    <div
                                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg ${device.tone === "emerald"
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
                                                        <h3 className="font-semibold text-white">{device.name}</h3>
                                                        <p className="mt-1 text-sm text-slate-400">{device.location}</p>
                                                        <p className="mt-1 text-xs text-slate-500">{device.detail}</p>
                                                    </div>
                                                </div>
                                                <Toggle checked={device.active} />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
                                <Card className="p-5">
                                    <SectionHeader title="Zużycie Energii" description="Ostatnie 24 godziny" />
                                    <div className="mt-8 flex h-48 items-end gap-2 rounded-3xl bg-slate-900/60 px-4 py-5 ring-1 ring-inset ring-white/5">
                                        {energyBars.map((bar, index) => (
                                            <div key={`${bar}-${index}`} className="flex flex-1 items-end justify-center">
                                                <div
                                                    className={`w-full max-w-8 rounded-t-2xl ${index === 4 ? "bg-slate-100" : "bg-slate-700/90"
                                                        }`}
                                                    style={{ height: `${bar}%` }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex justify-between text-xs text-slate-500">
                                        <span>00:00</span>
                                        <span>06:00</span>
                                        <span>12:00</span>
                                        <span>18:00</span>
                                        <span>23:59</span>
                                    </div>
                                </Card>

                                <Card className="p-5">
                                    <SectionHeader title="Szybkie Akcje" />
                                    <div className="grid grid-cols-2 gap-3">
                                        {quickActions.map((action) => (
                                            <button
                                                key={action.label}
                                                className="flex aspect-square flex-col items-start justify-between rounded-2xl border border-white/8 bg-slate-900/70 p-4 text-left transition hover:bg-slate-800/90"
                                                type="button"
                                            >
                                                <span className="text-2xl text-emerald-300">{action.icon}</span>
                                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                                                    {action.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card className="p-5">
                                <SectionHeader title="Ostatnia Aktywność" />
                                <div className="space-y-3">
                                    {activities.map((activity) => (
                                        <div
                                            key={activity.title}
                                            className="rounded-2xl border border-white/6 bg-slate-900/70 p-4"
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="mt-1 h-10 w-1 rounded-full bg-emerald-400" />
                                                <div>
                                                    <h3 className="font-medium text-white">{activity.title}</h3>
                                                    <p className="mt-1 text-sm text-slate-400">{activity.detail}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card className="p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-white">Scena wieczorna</p>
                                        <p className="mt-1 text-sm text-slate-400">Podsumowanie automatyzacji</p>
                                    </div>
                                    <Badge tone="blue">Aktywna</Badge>
                                </div>
                                <div className="mt-5 space-y-3 rounded-3xl bg-slate-900/70 p-4 ring-1 ring-inset ring-white/5">
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

                            <Card className="p-5">
                                <SectionHeader title="Status domu" />
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                                        <span className="text-sm text-slate-300">Bezpieczeństwo</span>
                                        <Badge tone="rose">Uzbrojone</Badge>
                                    </div>
                                    <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                                        <span className="text-sm text-slate-300">Łączność</span>
                                        <Badge tone="emerald">Stabilna</Badge>
                                    </div>
                                    <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                                        <span className="text-sm text-slate-300">Energia</span>
                                        <Badge tone="blue">Niska</Badge>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>

            <button
                className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 text-2xl font-semibold text-slate-950 shadow-[0_18px_40px_rgba(16,185,129,0.35)]"
                type="button"
                aria-label="Add"
            >
                +
            </button>
        </main>
    );
}