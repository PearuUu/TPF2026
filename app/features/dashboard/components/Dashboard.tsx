import { useState } from "react";
import { useNavigate } from "react-router";
import { Avatar } from "../../../components/base/Avatar";
import { Badge } from "../../../components/base/Badge";
import { Button } from "../../../components/base/Button";
import { Card } from "../../../components/base/Card";
import { SectionHeader } from "../../../components/base/SectionHeader";
import { Toggle } from "../../../components/base/Toggle";
import { BasePageLayout } from "../../../components/layout/BasePageLayout";
import {
    activities,
    dashboardStats,
    favoriteDevices,
    quickActions,
} from "../mock";

const energyData = [
    { hour: "00:00", kwh: 0.4 },
    { hour: "01:00", kwh: 0.3 },
    { hour: "02:00", kwh: 0.3 },
    { hour: "03:00", kwh: 0.2 },
    { hour: "04:00", kwh: 0.2 },
    { hour: "05:00", kwh: 0.4 },
    { hour: "06:00", kwh: 0.8 },
    { hour: "07:00", kwh: 1.4 },
    { hour: "08:00", kwh: 1.9 },
    { hour: "09:00", kwh: 1.6 },
    { hour: "10:00", kwh: 1.3 },
    { hour: "11:00", kwh: 1.5 },
    { hour: "12:00", kwh: 2.1 },
    { hour: "13:00", kwh: 1.8 },
    { hour: "14:00", kwh: 2.4 },
    { hour: "15:00", kwh: 2.0 },
    { hour: "16:00", kwh: 1.7 },
    { hour: "17:00", kwh: 2.2 },
    { hour: "18:00", kwh: 2.8 },
    { hour: "19:00", kwh: 3.1 },
    { hour: "20:00", kwh: 2.6 },
    { hour: "21:00", kwh: 2.0 },
    { hour: "22:00", kwh: 1.3 },
    { hour: "23:00", kwh: 0.7 },
];

function EnergyChart() {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const W = 480;
    const H = 140;
    const padX = 8;
    const padY = 12;
    const innerW = W - padX * 2;
    const innerH = H - padY * 2;
    const max = Math.max(...energyData.map((d) => d.kwh));
    const min = 0;

    const pts = energyData.map((d, i) => ({
        x: padX + (i / (energyData.length - 1)) * innerW,
        y: padY + innerH - ((d.kwh - min) / (max - min)) * innerH,
        ...d,
    }));

    const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
    const area = [
        `M ${pts[0].x},${H}`,
        ...pts.map((p) => `L ${p.x},${p.y}`),
        `L ${pts[pts.length - 1].x},${H}`,
        "Z",
    ].join(" ");

    const tickHours = ["00:00", "06:00", "12:00", "18:00", "23:00"];
    const tickIdxs = [0, 6, 12, 18, 23];

    const hovered = hoveredIdx !== null ? pts[hoveredIdx] : null;

    return (
        <div className="relative mt-4">
            {/* Tooltip */}
            {hovered && (
                <div
                    className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-xl border border-white/10 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xl"
                    style={{
                        left: `${(hovered.x / W) * 100}%`,
                        top: `${(hovered.y / H) * 100}%`,
                    }}
                >
                    {hovered.hour} · {hovered.kwh} kWh
                </div>
            )}

            <svg
                viewBox={`0 0 ${W} ${H}`}
                className="w-full rounded-2xl lg:rounded-3xl overflow-visible"
                style={{ height: "auto", display: "block" }}
                onMouseLeave={() => setHoveredIdx(null)}
            >
                <defs>
                    <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#6ee7b7" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                </defs>

                {/* Background */}
                <rect width={W} height={H} rx="16" fill="rgba(15,23,42,0.6)" />

                {/* Horizontal gridlines */}
                {[0.25, 0.5, 0.75].map((f, i) => (
                    <line
                        key={i}
                        x1={padX}
                        y1={padY + innerH * (1 - f)}
                        x2={W - padX}
                        y2={padY + innerH * (1 - f)}
                        stroke="rgba(255,255,255,0.05)"
                        strokeDasharray="4 4"
                    />
                ))}

                {/* Area fill */}
                <path d={area} fill="url(#energyGradient)" />

                {/* Line */}
                <polyline
                    points={polyline}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />

                {/* Invisible hover targets */}
                {pts.map((p, i) => (
                    <rect
                        key={i}
                        x={p.x - (innerW / (energyData.length - 1)) / 2}
                        y={0}
                        width={innerW / (energyData.length - 1)}
                        height={H}
                        fill="transparent"
                        onMouseEnter={() => setHoveredIdx(i)}
                        style={{ cursor: "crosshair" }}
                    />
                ))}

                {/* Dot on hover */}
                {hovered && (
                    <>
                        <line
                            x1={hovered.x}
                            y1={padY}
                            x2={hovered.x}
                            y2={H - padY}
                            stroke="rgba(52,211,153,0.25)"
                            strokeDasharray="3 3"
                        />
                        <circle
                            cx={hovered.x}
                            cy={hovered.y}
                            r="5"
                            fill="#10b981"
                            stroke="white"
                            strokeWidth="2"
                        />
                    </>
                )}
            </svg>

            {/* X-axis labels */}
            <div className="mt-2 flex justify-between text-[10px] text-slate-500 px-1">
                {tickHours.map((h) => (
                    <span key={h}>{h}</span>
                ))}
            </div>
        </div>
    );
}

export function Dashboard() {
    const [devices, setDevices] = useState(favoriteDevices);
    const [activeScene, setActiveScene] = useState(true);
    const [activeQuickAction, setActiveQuickAction] = useState<string | null>(null);
    const [temp, setTemp] = useState(21);
    const [lightLevel, setLightLevel] = useState(35);
    const [blindsClosed, setBlindsClosed] = useState(true);
    const [securityArmed, setSecurityArmed] = useState(true);
    const navigation = useNavigate();

    const toggleDevice = (index: number) => {
        setDevices((prev) =>
            prev.map((d, i) => (i === index ? { ...d, active: !d.active } : d))
        );
    };

    const handleQuickAction = (label: string) => {
        setActiveQuickAction(label);
        setTimeout(() => setActiveQuickAction(null), 1800);
        if (label === "Good Night") {
            setLightLevel(5);
            setTemp(20);
            setBlindsClosed(true);
        } else if (label === "Good Morning") {
            setLightLevel(80);
            setTemp(22);
            setBlindsClosed(false);
        } else if (label === "Leaving Home") {
            setDevices((prev) => prev.map((d) => ({ ...d, active: false })));
            setSecurityArmed(true);
        } else if (label === "Party Mode") {
            setLightLevel(90);
            setTemp(23);
        }
    };

    return (
        <BasePageLayout
            tipDescription="Lowering your thermostat by just 1°C at night can cut your heating bills by around 6% per year."
            onTipButtonClick={() => { setTemp((t) => Math.max(16, t - 1)); }}
            tipButtonLabel="Optimise now"
            tipTitle="Concierge Tip"
        >
            <header className="hidden lg:flex lg:flex-row lg:items-start lg:justify-between gap-6 border-b border-white/6 pb-6 mb-6">
                <div>
                    <p className="text-sm font-medium text-slate-400">Home Sweet Home</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                        Welcome home, Alex.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-6 text-slate-400">
                        Your smart assistant has optimised settings across 4 rooms.
                        All systems running smoothly.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Badge tone="emerald">All systems active</Badge>
                </div>
            </header>

            <div className="mb-5 lg:hidden">
                <p className="text-xs font-medium text-slate-400">Home Sweet Home</p>
                <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-white">
                    Welcome home, Alex.
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge tone="emerald">All systems active</Badge>
                    <div className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/5 px-2.5 py-1.5 text-xs text-slate-300">
                        <span className="text-emerald-400">●</span>
                        72°F · Clear
                    </div>
                </div>
            </div>

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

            <div className="mt-5 grid gap-5 lg:mt-6 lg:gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-5 lg:space-y-6">
                    <div>
                        <SectionHeader
                            title="Favourite Devices"
                            action={
                                <Button
                                    variant="ghost"
                                    className="px-0"
                                    onClick={() => navigation('/devices')}
                                >
                                    Manage
                                </Button>
                            }
                        />
                        <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
                            {devices.map((device, i) => (
                                <Card key={device.name} className="p-4 lg:p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3 lg:gap-4">
                                            <div
                                                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-base lg:h-12 lg:w-12 lg:rounded-2xl lg:text-lg ${device.tone === "emerald"
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
                                        <button
                                            type="button"
                                            onClick={() => toggleDevice(i)}
                                            className="flex-shrink-0"
                                            aria-label={`Toggle ${device.name}`}
                                        >
                                            <Toggle checked={device.active} />
                                        </button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Energy + Quick Actions */}
                    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(220px,0.9fr)]">
                        <Card className="p-4 lg:p-5">
                            <div className="flex items-end justify-between">
                                <SectionHeader
                                    title="Energy Usage"
                                    description="Last 24 hours"
                                />
                                <span className="mb-4 text-xs font-semibold text-emerald-400 lg:mb-5">
                                    12.4 kWh total
                                </span>
                            </div>
                            <EnergyChart />
                        </Card>

                        <Card className="p-4 lg:p-5">
                            <SectionHeader title="Quick Actions" />
                            <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
                                {quickActions.map((action) => (
                                    <button
                                        key={action.label}
                                        className={`flex aspect-square flex-col items-start justify-between rounded-xl border p-3 text-left transition lg:rounded-2xl lg:p-4 ${
                                            activeQuickAction === action.label
                                                ? "border-emerald-500/40 bg-emerald-500/15"
                                                : "border-white/8 bg-slate-900/70 hover:bg-slate-800/90"
                                        }`}
                                        type="button"
                                        onClick={() => handleQuickAction(action.label)}
                                    >
                                        <span className={`text-xl lg:text-2xl ${
                                            activeQuickAction === action.label
                                                ? "text-emerald-300"
                                                : "text-emerald-300"
                                        }`}>
                                            {action.icon}
                                        </span>
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300 lg:text-xs lg:tracking-[0.2em]">
                                            {action.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            {activeQuickAction && (
                                <p className="mt-3 text-center text-xs text-emerald-400 animate-pulse">
                                    ✓ {activeQuickAction} activated
                                </p>
                            )}
                        </Card>
                    </div>
                </div>

                <div className="space-y-5 lg:space-y-6">
                    <Card className="p-4 lg:p-5">
                        <SectionHeader title="Recent Activity" />
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
                                <p className="text-sm font-semibold text-white">Evening Scene</p>
                                <p className="mt-1 text-sm text-slate-400">
                                    Automation summary
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveScene((v) => !v)}
                            >
                                <Badge tone={activeScene ? "blue" : "slate"}>
                                    {activeScene ? "Active" : "Inactive"}
                                </Badge>
                            </button>
                        </div>
                        <div className="mt-4 space-y-3 rounded-2xl bg-slate-900/70 p-3.5 ring-1 ring-inset ring-white/5 lg:mt-5 lg:rounded-3xl lg:p-4">
                            <div className="flex items-center justify-between text-sm text-slate-300">
                                <span>Temperature</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setTemp((t) => Math.max(16, t - 1))}
                                        className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/8 text-xs hover:bg-white/15 transition"
                                    >
                                        −
                                    </button>
                                    <span className="w-8 text-center font-semibold">{temp}°C</span>
                                    <button
                                        type="button"
                                        onClick={() => setTemp((t) => Math.min(28, t + 1))}
                                        className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/8 text-xs hover:bg-white/15 transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-300">
                                <span>Lighting</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setLightLevel((v) => Math.max(0, v - 5))}
                                        className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/8 text-xs hover:bg-white/15 transition"
                                    >
                                        −
                                    </button>
                                    <span className="w-8 text-center font-semibold">{lightLevel}%</span>
                                    <button
                                        type="button"
                                        onClick={() => setLightLevel((v) => Math.min(100, v + 5))}
                                        className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/8 text-xs hover:bg-white/15 transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-300">
                                <span>Blinds</span>
                                <button
                                    type="button"
                                    onClick={() => setBlindsClosed((v) => !v)}
                                    className="rounded-lg bg-white/8 px-2.5 py-1 text-xs font-medium hover:bg-white/15 transition"
                                >
                                    {blindsClosed ? "Lowered" : "Raised"}
                                </button>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 lg:p-5">
                        <SectionHeader title="Home Status" />
                        <div className="space-y-2.5 lg:space-y-4">
                            <div className="flex items-center justify-between rounded-xl bg-slate-900/70 px-3.5 py-2.5 lg:rounded-2xl lg:px-4 lg:py-3">
                                <span className="text-sm text-slate-300">Security</span>
                                <button
                                    type="button"
                                    onClick={() => setSecurityArmed((v) => !v)}
                                >
                                    <Badge tone={securityArmed ? "rose" : "emerald"}>
                                        {securityArmed ? "Armed" : "Disarmed"}
                                    </Badge>
                                </button>
                            </div>
                            <div className="flex items-center justify-between rounded-xl bg-slate-900/70 px-3.5 py-2.5 lg:rounded-2xl lg:px-4 lg:py-3">
                                <span className="text-sm text-slate-300">Connectivity</span>
                                <Badge tone="emerald">Stable</Badge>
                            </div>
                            <div className="flex items-center justify-between rounded-xl bg-slate-900/70 px-3.5 py-2.5 lg:rounded-2xl lg:px-4 lg:py-3">
                                <span className="text-sm text-slate-300">Energy</span>
                                <Badge tone="blue">Low</Badge>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </BasePageLayout>
    );
}
