import { Card } from "../../../components/base/Card";
import { Toggle } from "../../../components/base/Toggle";
import { Badge } from "../../../components/base/Badge";

type SceneCardProps = {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    tags?: string[];
    active?: boolean;
    onToggle?: () => void;
    isRadio?: boolean;
};

export function SceneCard({
    title,
    subtitle,
    icon,
    tags = [],
    active = false,
    onToggle,
    isRadio = false,
}: SceneCardProps) {
    return (
        <Card className={`relative flex flex-col justify-between transition-colors ${active ? "border-emerald-500/30 bg-[#1e293b]/50" : ""}`}>
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className="bg-slate-800 p-3 rounded-xl text-slate-300">
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white">{title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
                    </div>
                </div>

                {isRadio ? (
                    <div className="mt-1 flex h-6 w-11 justify-end p-1">
                        <div className={`h-4 w-4 rounded-full border-2 ${active ? 'border-emerald-500 bg-emerald-500' : 'border-slate-500 bg-transparent'}`} />
                    </div>
                ) : (
                    <div className="mt-1 cursor-pointer" onClick={onToggle}>
                        <Toggle checked={active} />
                    </div>
                )}
            </div>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((tag, idx) => (
                        <Badge
                            key={idx}
                            tone="slate"
                            className="bg-slate-800/50 text-slate-400 border-none font-normal px-2 py-0.5 normal-case tracking-normal"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            )}
        </Card>
    );
}
