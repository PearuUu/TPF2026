import { useState } from "react";
import { AddAutomationModal } from "./AddAutomationModal";
import { Badge } from "../../../components/base/Badge";
import { Button } from "../../../components/base/Button";
import { Toggle } from "../../../components/base/Toggle";
import { BasePageLayout } from "../../../components/layout/BasePageLayout";
import { SceneCard } from "./SceneCard";
import { LogicRuleRow } from "./LogicRuleRow";
import { Tv, Moon, Zap, UserPlus, Plus, Clapperboard, Sun, Lightbulb, MapPin, Lock, Thermometer, ArrowRight, LayoutGrid, MonitorSmartphone, Bot, Settings as SettingsIcon, Pencil } from "lucide-react";

const navItems = [
    { label: "Dashboard", active: false, icon: <LayoutGrid size={18} /> },
    { label: "Devices", active: false, icon: <MonitorSmartphone size={18} /> },
    { label: "Automation", active: true, icon: <Bot size={18} /> },
    { label: "Settings", active: false, icon: <SettingsIcon size={18} /> },
];

const SCENES_MOCK = [
    { id: 1, title: "Movie Time", subtitle: "4 Devices Active", icon: <Tv size={20} />, tags: ["Lights: 10%", "Blinds: Closed", "AV: Theater Mode"], active: true },
    { id: 2, title: "Good Night", subtitle: "Security Armed • Lights Off", icon: <Moon size={20} />, tags: [], active: false },
    { id: 3, title: "Deep Focus", subtitle: "• Active", icon: <Zap size={20} />, tags: [], active: true },
    { id: 4, title: "Away Mode", subtitle: "Eco Temps • Simulated Presence", icon: <UserPlus size={20} />, tags: ["Set to 62°F", "Armed Away"], active: false, isRadio: true },
];

const RULES_MOCK = [
    { id: 1, title: "Nightlight Path", status: "RUNNING" as const, conditions: [{ text: "If Motion in Hallway" }, { text: "Time > 10 PM", operator: "AND" }], actions: ["Turn on Hall Light 100%"] },
    { id: 2, title: "Morning Wakeup", status: "PAUSED" as const, conditions: [{ text: "If Time = 7:00 AM" }, { text: "Day = Weekday", operator: "AND" }], actions: ["Open Blinds 50%"] },
    { id: 3, title: "Climate Auto-Balance", status: "RUNNING" as const, conditions: [{ text: "If Living Room Temp > 75°F" }, { text: "Sunlight = Direct", operator: "OR" }], actions: ["Set AC to 72°F", "Close West Blinds"] },
];

const MOBILE_SCENES_MOCK = [
    { id: 1, title: "Movie Time", subtitle: "3 devices active", icon: <Clapperboard size={20} />, active: true },
    { id: 2, title: "Goodnight", subtitle: "Standby", icon: <Moon size={20} />, active: false },
];

const MOBILE_RULES_MOCK = [
    { id: 1, title: "Sunset Lighting", subtitle: "Runs daily", status: "RUNNING" as const, conditions: [{ text: "Sunset", icon: <Sun size={14} /> }], actions: [{ text: "Living Rm On", icon: <Lightbulb size={14} /> }] },
    { id: 2, title: "Leave Home", subtitle: "Geofence trigger", status: "PAUSED" as const, conditions: [{ text: "Away", icon: <MapPin size={14} /> }], actions: [{ text: "Lock Doors", icon: <Lock size={14} /> }, { text: "Eco Mode", icon: <Thermometer size={14} /> }] },
];

function MobileSceneCard({ scene, onToggle }: any) {
    return (
        <div className="relative flex flex-col p-4 w-40 shrink-0 cursor-pointer transition-colors bg-slate-900/80 rounded-2xl border border-transparent hover:border-slate-700" onClick={onToggle}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${scene.active ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
                {scene.icon}
            </div>
            <div>
                <h3 className="text-base font-semibold text-white">{scene.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{scene.subtitle}</p>
            </div>
        </div>
    );
}

function MobileLogicRuleRow({ rule, onToggle, onEdit }: any) {
    const isRunning = rule.status === "RUNNING";
    return (
        <div className={`flex flex-col p-4 bg-slate-900/80 rounded-xl border-l-4 ${isRunning ? "border-emerald-500" : "border-slate-700"}`}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1 cursor-pointer" onClick={onEdit}>
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-white">{rule.title}</h3>
                        <Pencil size={13} className="text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{rule.subtitle}</p>
                </div>
                <div onClick={onToggle} className="cursor-pointer">
                    <Toggle checked={isRunning} />
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
                {rule.conditions.map((cond: any, i: number) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-300">
                        {cond.icon && <span className="text-slate-400">{cond.icon}</span>}{cond.text}
                    </div>
                ))}
                <ArrowRight size={16} className="text-slate-400 mx-1" />
                {rule.actions.map((act: any, i: number) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-300">
                        {act.icon && <span className="text-slate-400">{act.icon}</span>}{act.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Automation() {
    const [scenes, setScenes] = useState(SCENES_MOCK);
    const [rules, setRules] = useState(RULES_MOCK);
    const [ruleFilter, setRuleFilter] = useState<"All" | "Active">("All");

    const [mobileScenes, setMobileScenes] = useState(MOBILE_SCENES_MOCK);
    const [mobileRules, setMobileRules] = useState(MOBILE_RULES_MOCK);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingRule, setEditingRule] = useState<any>(null);

    const triggerEditRule = (rule: any) => {
        setEditingRule(rule);
        setIsAddModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setEditingRule(null);
    };

    const toggleScene = (id: number) => setScenes(scenes.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
    const filteredRules = rules.filter((r) => ruleFilter === "Active" ? r.status === "RUNNING" : true);

    const toggleMobileScene = (id: number) => setMobileScenes(mobileScenes.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
    const toggleMobileRule = (id: number) => setMobileRules(mobileRules.map((r) => (r.id === id ? { ...r, status: r.status === "RUNNING" ? "PAUSED" : "RUNNING" } : r)));

    const handleAddRule = (newRule: any) => {
        const nextId = Math.max(...rules.map((r) => r.id), 0) + 1;
        setRules([
            ...rules,
            {
                id: nextId,
                title: newRule.title,
                status: newRule.status,
                conditions: newRule.conditions,
                actions: newRule.actions,
            },
        ]);

        const nextMobileId = Math.max(...mobileRules.map((r) => r.id), 0) + 1;
        setMobileRules([
            ...mobileRules,
            {
                id: nextMobileId,
                title: newRule.title,
                subtitle: newRule.conditions[0].text,
                status: newRule.status,
                conditions: newRule.conditions.map((c: any) => ({ text: c.text })),
                actions: newRule.actions.map((a: any) => ({ text: a })),
            },
        ]);
    };

    const handleEditRule = (updatedRule: any) => {
        setRules(rules.map((r) => r.id === updatedRule.id ? updatedRule : r));

        setMobileRules(mobileRules.map((mr) => {
            if (mr.id === updatedRule.id) {
                return {
                    ...mr,
                    title: updatedRule.title,
                    subtitle: updatedRule.conditions[0].text,
                    conditions: updatedRule.conditions.map((c: any) => ({ text: c.text })),
                    actions: updatedRule.actions.map((a: any) => ({ text: a })),
                };
            }
            return mr;
        }));
    };

    return (
        <BasePageLayout
            navItems={navItems}
            onNavItemClick={(label) => console.log(`Navigated to: ${label}`)}
            tipDescription="Obniżenie temperatury o zaledwie 1°C w nocy może zmniejszyć Twoje rachunki za ogrzewanie o około 6% rocznie."
            onTipButtonClick={() => console.log("Optimize clicked")}
        >
            {/* Desktop Layout */}
            <div className="hidden lg:block">
                <header className="flex flex-row items-start justify-between gap-6 border-b border-white/6 pb-6 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Automation Flow</h1>
                        <p className="text-sm text-slate-400">Configure intelligent routines and ambient behaviors for your environment.</p>
                    </div>
                </header>

                <section className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <Zap className="text-slate-400" size={20} />
                        <h2 className="text-lg font-semibold text-white">Active Scenes</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {scenes.map((scene) => (
                            <SceneCard key={scene.id} title={scene.title} subtitle={scene.subtitle} icon={scene.icon} tags={scene.tags} active={scene.active} isRadio={scene.isRadio} onToggle={() => toggleScene(scene.id)} />
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xl leading-none font-bold">▤</span>
                            <h2 className="text-lg font-semibold text-white">Logic Rules</h2>
                        </div>
                        <div className="flex bg-slate-800/50 rounded-lg p-1 border border-white/5">
                            <button onClick={() => setRuleFilter("All")} className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${ruleFilter === "All" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"}`}>All</button>
                            <button onClick={() => setRuleFilter("Active")} className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${ruleFilter === "Active" ? "bg-emerald-500/20 text-emerald-400" : "text-slate-400 hover:text-white"}`}>Active</button>
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
                                onEdit={() => triggerEditRule(rule)}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden flex flex-col h-full max-w-md mx-auto">
                <section className="mb-8 mt-2">
                    <h2 className="text-2xl font-bold text-white mb-1">Active Scenes</h2>
                    <p className="text-sm text-slate-400 mb-4">Quick environmental presets.</p>
                    <div className="flex overflow-x-auto gap-4 snap-x pb-2 -mx-4 px-4 scrollbar-hide">
                        {mobileScenes.map((scene) => (
                            <div key={scene.id} className="snap-start">
                                <MobileSceneCard scene={scene} onToggle={() => toggleMobileScene(scene.id)} />
                            </div>
                        ))}
                    </div>
                </section>
                <section className="flex-1 pb-24">
                    <h2 className="text-2xl font-bold text-white mb-1">Automations</h2>
                    <p className="text-sm text-slate-400 mb-4">Logic flows and routines.</p>
                    <div className="flex flex-col gap-4">
                        {mobileRules.map((rule) => (
                            <MobileLogicRuleRow 
                                key={rule.id} 
                                rule={rule} 
                                onToggle={() => toggleMobileRule(rule.id)} 
                                onEdit={() => {
                                    const desktopRule = rules.find((r) => r.id === rule.id) || {
                                        id: rule.id,
                                        title: rule.title,
                                        status: rule.status,
                                        conditions: rule.conditions.map((c: any) => ({ text: c.text })),
                                        actions: rule.actions.map((a: any) => typeof a === "string" ? a : a.text)
                                    };
                                    triggerEditRule(desktopRule);
                                }}
                            />
                        ))}
                    </div>
                </section>
            </div>
            {/* Unified Floating Action Button (FAB) */}
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none"
                aria-label="Dodaj automatyzację"
            >
                <Plus size={26} />
            </button>

            <AddAutomationModal
                isOpen={isAddModalOpen}
                onClose={handleCloseModal}
                onAdd={handleAddRule}
                onEdit={handleEditRule}
                editingRule={editingRule}
            />
        </BasePageLayout>
    );
}
