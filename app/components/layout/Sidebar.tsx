import type { ReactNode } from "react";
import { Card } from "../base/Card";
import { Button } from "../base/Button";
import { NavItem } from "./NavItem";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router'

const navItems = [
    { label: "Dashboard", active: false, icon: "▣" , direction: ""},
    { label: "Devices", active: true, icon: "▤" , direction: "devices"},
    { label: "Automation", active: false, icon: "◫", direction: "automation"},
    { label: "Settings", active: false, icon: "⚙", direction: "settings"},
];

type NavItemData = {
    label: string;
    icon: ReactNode;
    active?: boolean;
};

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    // navItems: NavItemData[];
    onNavItemClick?: (label: string) => void;
    appName?: string;
    appStatus?: string;
    tipTitle?: string;
    tipDescription?: string;
    tipButtonLabel?: string;
    onTipButtonClick?: () => void;
};

export function Sidebar({
    isOpen,
    onClose,
    // navItems,
    onNavItemClick,
    appName = "Concierge",
    appStatus = "System active",
    tipTitle = "Wskazówka od Concierge",
    tipDescription,
    tipButtonLabel = "Optymalizuj teraz",
    onTipButtonClick,
}: SidebarProps) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
            {/* ── Sidebar overlay (mobile) ── */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* ── Sidebar ── */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/8 bg-slate-950/95 px-5 py-6 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 lg:w-[260px] lg:rounded-none lg:border-r lg:border-white/8 lg:bg-slate-950/85 lg:shadow-[0_24px_70px_rgba(2,8,23,0.45)] ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Sidebar header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/15 text-lg text-sky-300">
                            ⌂
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">{appName}</p>
                            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400">
                                {appStatus}
                            </p>
                        </div>
                    </div>
                    <button
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-white/8 hover:text-white lg:hidden"
                        type="button"
                        onClick={onClose}
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-8 space-y-2">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            active={`/${item.direction}` == location.pathname}
                            onClick={() => {
                                onNavItemClick?.(item.label);
                                onClose();
                                navigate(`/${item.direction}`);
                                console.log(location.pathname);
                            }}
                        />
                    ))}
                </nav>
                
                {/* Tip Card */}
                {tipDescription && (
                    <Card className="mt-6 bg-linear-to-br from-sky-500/20 to-emerald-500/10 p-5">
                        <div className="flex items-center gap-2 text-sky-200">
                            <span>✦</span>
                            <p className="text-sm font-semibold">{tipTitle}</p>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-300">
                            {tipDescription}
                        </p>
                        <Button
                            className="mt-4 w-full"
                            variant="secondary"
                            onClick={onTipButtonClick}
                        >
                            {tipButtonLabel}
                        </Button>
                    </Card>
                )}
            </aside>
        </>
    );
}
