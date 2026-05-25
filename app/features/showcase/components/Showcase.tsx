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
} from "../../dashboard/mock";

const navigationItems = [
    { label: "Dashboard", active: true, icon: "▣" },
    { label: "Devices", active: false, icon: "▤" },
    { label: "Automation", active: false, icon: "◫" },
    { label: "Settings", active: false, icon: "⚙" },
];

const energyBars = [34, 46, 38, 60, 88, 56, 42, 30, 35, 49, 44, 28];

const buttonVariants = ["primary", "secondary", "ghost"] as const;

export function Showcase() {
    return (
        <main className="min-h-screen px-4 py-4 lg:px-6 lg:py-6">
            <div className="mx-auto max-w-375 space-y-6">
                <section className="rounded-[1.75rem] border border-white/8 bg-slate-950/80 p-6 shadow-[0_24px_70px_rgba(2,8,23,0.45)] backdrop-blur-xl lg:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.28em] text-emerald-400">
                                Concierge UI kit
                            </p>
                            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white lg:text-5xl">
                                Showcase wszystkich bazowych komponentów
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 lg:text-base">
                                Ta strona zbiera klocki UI, które budują dashboard: przyciski,
                                badge, karty, avatar, toggle oraz większe sekcje domenowe.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <Badge tone="emerald">Base components</Badge>
                            <Badge tone="blue">Feature sections</Badge>
                            <Badge tone="rose">Dark theme</Badge>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {dashboardStats.map((stat) => (
                        <Card key={stat.label} className="p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                {stat.label}
                            </p>
                            <p className="mt-4 text-3xl font-semibold text-white">{stat.value}</p>
                            <p className="mt-2 text-sm text-slate-400">{stat.sublabel}</p>
                        </Card>
                    ))}
                </section>

                <section className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
                    <Card className="p-5">
                        <SectionHeader title="Sidebar / nav" description="Ikony, aktywny stan i tip card" />
                        <nav className="mt-4 space-y-2">
                            {navigationItems.map((item) => (
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
                                Obniżenie temperatury o zaledwie 1°C w nocy może zmniejszyć
                                rachunki za ogrzewanie o około 6% rocznie.
                            </p>
                            <Button className="mt-4 w-full" variant="secondary">
                                Optymalizuj teraz
                            </Button>
                        </Card>
                    </Card>

                    <div className="space-y-6">
                        <Card className="p-5">
                            <SectionHeader title="Buttons, badge, avatar, toggle" description="Bazowe komponenty w różnych stanach" />
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                {buttonVariants.map((variant) => (
                                    <Button key={variant} variant={variant}>
                                        {variant}
                                    </Button>
                                ))}
                                <Badge tone="emerald">Active</Badge>
                                <Badge tone="blue">Stable</Badge>
                                <Badge tone="rose">Alert</Badge>
                                <Avatar name="Alex Morgan" />
                                <Toggle checked />
                                <Toggle />
                            </div>
                        </Card>

                        <section className="grid gap-4 md:grid-cols-2">
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
                        </section>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
                    <Card className="p-5">
                        <SectionHeader title="Energy chart" description="Prosty słupkowy podgląd z danych mock" />
                        <div className="mt-8 flex h-48 items-end gap-2 rounded-3xl bg-slate-900/60 px-4 py-5 ring-1 ring-inset ring-white/5">
                            {energyBars.map((bar, index) => (
                                <div key={`${bar}-${index}`} className="flex flex-1 items-end justify-center">
                                    <div
                                        className={`w-full max-w-8 rounded-t-2xl ${index === 4 ? "bg-slate-100" : "bg-slate-700/90"}`}
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
                        <SectionHeader title="Quick actions" description="Akcje w układzie kafelków" />
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
                </section>

                <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                    <Card className="p-5">
                        <SectionHeader title="Ostatnia aktywność" description="Karty listy eventów" />
                        <div className="mt-4 space-y-3">
                            {activities.map((activity) => (
                                <div key={activity.title} className="rounded-2xl border border-white/6 bg-slate-900/70 p-4">
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

                    <div className="space-y-6">
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
                </section>
            </div>
        </main>
    );
}