import type { ReactNode } from "react";

type SectionHeaderProps = {
    title: string;
    action?: ReactNode;
    description?: string;
};

export function SectionHeader({
    title,
    action,
    description,
}: SectionHeaderProps) {
    return (
        <div className="mb-4 flex items-end justify-between gap-3">
            <div>
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                {description ? (
                    <p className="mt-1 text-sm text-slate-400">{description}</p>
                ) : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
        </div>
    );
}