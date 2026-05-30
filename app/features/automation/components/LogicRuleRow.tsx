import React from "react";
import { Badge } from "../../../components/base/Badge";
import { Pencil, Play, Pause } from "lucide-react";

type Condition = {
    text: string;
    operator?: string;
};

type LogicRuleRowProps = {
    title: string;
    status: "RUNNING" | "PAUSED";
    conditions: Condition[];
    actions: string[];
};

export function LogicRuleRow({ title, status, conditions, actions }: LogicRuleRowProps) {
    const isRunning = status === "RUNNING";

    return (
        <div className="group flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-800/40 rounded-2xl border border-transparent hover:border-slate-700 transition-colors gap-4">
            <div className="flex flex-col flex-1 gap-2">
                {/* Title and Badge */}
                <div className="flex items-center gap-3">
                    <div className={`w-1 h-5 rounded-full ${isRunning ? "bg-emerald-500" : "bg-slate-600"}`} />
                    <h4 className="text-sm font-semibold text-white">{title}</h4>
                    <Badge
                        tone={isRunning ? "emerald" : "slate"}
                        className="text-[10px] px-1.5 py-0"
                    >
                        {status}
                    </Badge>
                </div>

                {/* Logic Row */}
                <div className="flex flex-wrap items-center gap-2 pl-4">
                    {conditions.map((cond, i) => (
                        <React.Fragment key={i}>
                            <Badge tone="slate" className="bg-slate-800 text-slate-300 font-normal hover:bg-slate-800 normal-case tracking-normal">
                                {cond.text}
                            </Badge>
                            {i < conditions.length - 1 && (
                                <span className="text-[10px] font-bold text-slate-500">{cond.operator || "AND"}</span>
                            )}
                        </React.Fragment>
                    ))}

                    <span className="text-slate-500 mx-2">→</span>

                    {actions.map((act, i) => (
                        <Badge key={i} tone="slate" className="bg-slate-800 text-slate-300 font-normal hover:bg-slate-800 normal-case tracking-normal">
                            {act}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pl-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                    <Pencil size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                    {isRunning ? <Pause size={16} /> : <Play size={16} />}
                </button>
            </div>
        </div>
    );
}
