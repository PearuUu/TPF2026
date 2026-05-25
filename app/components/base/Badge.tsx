import type { HTMLAttributes, ReactNode } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    children: ReactNode;
    tone?: "emerald" | "blue" | "rose" | "slate";
};

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
    emerald: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/20",
    blue: "bg-sky-500/15 text-sky-300 ring-sky-400/20",
    rose: "bg-rose-500/15 text-rose-300 ring-rose-400/20",
    slate: "bg-slate-500/15 text-slate-300 ring-white/10",
};

export function Badge({
    tone = "slate",
    className = "",
    children,
    ...props
}: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ring-1 ring-inset ${toneClasses[tone]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}