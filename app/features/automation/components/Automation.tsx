import { useState } from "react";
import { Badge } from "../../../components/base/Badge";
import { Button } from "../../../components/base/Button";
import { BasePageLayout } from "../../../components/layout/BasePageLayout";
import { SceneCard } from "./SceneCard";
import { LogicRuleRow } from "./LogicRuleRow";
import { Tv, Moon, Zap, UserPlus, Plus } from "lucide-react";

import { LayoutGrid, MonitorSmartphone, Bot, Settings as SettingsIcon } from "lucide-react";

const navItems = [
    { label: "Dashboard", active: false, icon: <LayoutGrid size={18} /> },
    { label: "Devices", active: false, icon: <MonitorSmartphone size={18} /> },
    { label: "Automation", active: true, icon: <Bot size={18} /> },
    { label: "Settings", active: false, icon: <SettingsIcon size={18} /> },
];

const SCENES_MOCK = [
    {
        id: 1,
        title: "Movie Time",
        subtitle: "4 Devices Active",
        icon: <Tv size={20} />,
        tags: ["Lights: 10%", "Blinds: Closed", "AV: Theater Mode"],
        active: true,
    },
    {
        id: 2,
        title: "Good Night",
        subtitle: "Security Armed • Lights Off",
        icon: <Moon size={20} />,
        tags: [],
        active: false,
    },
    {
        id: 3,
        title: "Deep Focus",
        subtitle: "• Active",
        icon: <Zap size={20} />,
        tags: [],
        active: true,
    },
    {
        id: 4,
        title: "Away Mode",
        subtitle: "Eco Temps • Simulated Presence",
        icon: <UserPlus size={20} />,
        tags: ["Set to 62°F", "Armed Away"],
        active: false,
        isRadio: true,
    },
];

const RULES_MOCK = [
    {
        id: 1,
        title: "Nightlight Path",
        status: "RUNNING" as const,
        conditions: [{ text: "If Motion in Hallway" }, { text: "Time > 10 PM", operator: "AND" }],
        actions: ["Turn on Hall Light 100%"],
    },
    {
        id: 2,
        title: "Morning Wakeup",
        status: "PAUSED" as const,
        conditions: [{ text: "If Time = 7:00 AM" }, { text: "Day = Weekday", operator: "AND" }],
        actions: ["Open Blinds 50%"],
    },
    {
        id: 3,
        title: "Climate Auto-Balance",
        status: "RUNNING" as const,
        conditions: [{ text: "If Living Room Temp > 75°F" }, { text: "Sunlight = Direct", operator: "OR" }],
        actions: ["Set AC to 72°F", "Close West Blinds"],
    },
];

export function Automation() {
    const [scenes, setScenes] = useState(SCENES_MOCK);
    const [rules, setRules] = useState(RULES_MOCK);
    const [ruleFilter, setRuleFilter] = useState<"All" | "Active">("All");

    const toggleScene = (id: number) => {
        setScenes(scenes.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
    };

    const filteredRules = rules.filter((r) => {
        if (ruleFilter === "Active") return r.status === "RUNNING";
        return true;
    });

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
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                        Automation Flow
                    </h1>
                    <p className="text-sm text-slate-400">
                        Configure intelligent routines and ambient behaviors for your environment.
                    </p>
                </div>
                <div>
                    <Button variant="primary" icon={<Plus size={16} />}>
                        Create New Automation
                    </Button>
                </div>
            </header>

            {/* ── Mobile Page Header ── */}
            <div className="mb-8 lg:hidden">
                <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
                    Automation Flow
                </h1>
                <p className="text-sm text-slate-400 mb-4">
                    Configure intelligent routines and ambient behaviors for your environment.
                </p>
                <Button variant="primary" className="w-full" icon={<Plus size={16} />}>
                    Create New Automation
                </Button>
            </div>

            {/* ── Active Scenes ── */}
            <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                    <Zap className="text-slate-400" size={20} />
                    <h2 className="text-lg font-semibold text-white">Active Scenes</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {scenes.map((scene) => (
                        <SceneCard
                            key={scene.id}
                            title={scene.title}
                            subtitle={scene.subtitle}
                            icon={scene.icon}
                            tags={scene.tags}
                            active={scene.active}
                            isRadio={scene.isRadio}
                            onToggle={() => toggleScene(scene.id)}
                        />
                    ))}
                </div>
            </section>

            {/* ── Logic Rules ── */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-xl leading-none font-bold">▤</span>
                        <h2 className="text-lg font-semibold text-white">Logic Rules</h2>
                    </div>
                    <div className="flex bg-slate-800/50 rounded-lg p-1 border border-white/5">
                        <button
                            onClick={() => setRuleFilter("All")}
                            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                                ruleFilter === "All" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setRuleFilter("Active")}
                            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                                ruleFilter === "Active" ? "bg-emerald-500/20 text-emerald-400" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Active
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {filteredRules.map((rule) => (
                        <LogicRuleRow
                            key={rule.id}
                            title={rule.title}
                            status={rule.status}
                            conditions={rule.conditions}
                            actions={rule.actions}
                        />
                    ))}
                </div>
            </section>
        </BasePageLayout>
    );
}
