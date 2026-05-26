import type { ReactNode } from "react";

type NavItemProps = {
    label: string;
    icon: ReactNode;
    active?: boolean;
    onClick?: () => void;
};

export function NavItem({ label, icon, active = false, onClick }: NavItemProps) {
    return (
        <button
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${active
                    ? "bg-slate-800/90 text-emerald-300 shadow-lg shadow-emerald-500/10"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                }`}
            type="button"
            onClick={onClick}
        >
            <span className="text-lg">{icon}</span>
            {label}
        </button>
    );
}
