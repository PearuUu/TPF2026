import { useState } from "react";
import { Badge } from "../../../components/base/Badge";
import { Card } from "../../../components/base/Card";
import { SectionHeader } from "../../../components/base/SectionHeader";
import { BasePageLayout } from "../../../components/layout/BasePageLayout";
import { notifications, type Notification } from "../mock";

const categoryMeta: Record<
    Notification["category"],
    { label: string; tone: "emerald" | "blue" | "rose" | "slate" }
> = {
    security: { label: "Security", tone: "rose" },
    automation: { label: "Automation", tone: "blue" },
    device: { label: "Device", tone: "slate" },
    energy: { label: "Energy", tone: "emerald" },
    system: { label: "System", tone: "slate" },
};

const filterTabs = ["All", "Unread", "Security", "Energy", "Automation", "Device", "System"] as const;
type FilterTab = typeof filterTabs[number];

export function Notifications() {
    const [items, setItems] = useState<Notification[]>(notifications);
    const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

    const unreadCount = items.filter((n) => !n.read).length;

    const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    const markRead = (id: string) =>
        setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

    const filtered = items.filter((n) => {
        if (activeFilter === "All") return true;
        if (activeFilter === "Unread") return !n.read;
        return n.category === activeFilter.toLowerCase();
    });

    const unreadItems = filtered.filter((n) => !n.read);
    const readItems = filtered.filter((n) => n.read);

    return (
        <BasePageLayout
            tipDescription="Stay on top of your home — unread alerts are shown first so nothing slips through."
            onTipButtonClick={() => markAllRead()}
            tipButtonLabel="Mark all as read"
            tipTitle="Concierge Tip"
        >
            <header className="hidden lg:flex lg:flex-row lg:items-start lg:justify-between gap-6 border-b border-white/6 pb-6 mb-6">
                <div>
                    <p className="text-sm font-medium text-slate-400">Home Sweet Home</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                        Notifications
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-6 text-slate-400">
                        {unreadCount > 0
                            ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}. Stay informed about your home's activity.`
                            : "You're all caught up. No unread notifications at the moment."}
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    {unreadCount > 0 ? (
                        <Badge tone="rose">{unreadCount} Unread</Badge>
                    ) : (
                        <Badge tone="emerald">All caught up</Badge>
                    )}
                </div>
            </header>

            {/* Mobile header */}
            <div className="mb-5 lg:hidden">
                <p className="text-xs font-medium text-slate-400">Home Sweet Home</p>
                <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-white">
                    Notifications
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                    {unreadCount > 0 ? (
                        <Badge tone="rose">{unreadCount} Unread</Badge>
                    ) : (
                        <Badge tone="emerald">All caught up</Badge>
                    )}
                </div>
            </div>

            {/* Filter tabs + Mark all read */}
            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveFilter(tab)}
                            className={`flex-shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                                activeFilter === tab
                                    ? "bg-slate-800/90 text-emerald-300 shadow shadow-emerald-500/10"
                                    : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {unreadCount > 0 && (
                    <button
                        type="button"
                        onClick={markAllRead}
                        className="flex-shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-slate-400 hover:bg-white/5 hover:text-slate-100 transition"
                    >
                        Mark all read
                    </button>
                )}
            </div>

            <div className="space-y-6">
                {/* Unread section */}
                {unreadItems.length > 0 && (
                    <div>
                        <SectionHeader title="New" />
                        <div className="space-y-2.5">
                            {unreadItems.map((n) => (
                                <NotificationRow
                                    key={n.id}
                                    notification={n}
                                    onMarkRead={markRead}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Read section */}
                {readItems.length > 0 && (
                    <div>
                        <SectionHeader title={unreadItems.length > 0 ? "Earlier" : "All Notifications"} />
                        <div className="space-y-2.5">
                            {readItems.map((n) => (
                                <NotificationRow
                                    key={n.id}
                                    notification={n}
                                    onMarkRead={markRead}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {filtered.length === 0 && (
                    <Card className="flex flex-col items-center justify-center py-16 text-center">
                        <p className="text-4xl mb-4">🔔</p>
                        <p className="text-sm font-semibold text-white">No notifications here</p>
                        <p className="mt-1 text-sm text-slate-400">
                            {activeFilter === "Unread"
                                ? "You're all caught up!"
                                : `No ${activeFilter.toLowerCase()} notifications yet.`}
                        </p>
                    </Card>
                )}
            </div>
        </BasePageLayout>
    );
}

function NotificationRow({
    notification: n,
    onMarkRead,
}: {
    notification: Notification;
    onMarkRead: (id: string) => void;
}) {
    const meta = categoryMeta[n.category];
    return (
        <div
            className={`group relative flex items-start gap-4 rounded-2xl border p-4 transition lg:p-5 ${
                n.read
                    ? "border-white/6 bg-white/3 hover:bg-white/5"
                    : "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/8"
            }`}
        >
            {/* Unread indicator dot */}
            {!n.read && (
                <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            )}

            {/* Icon */}
            <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg lg:h-11 lg:w-11 lg:rounded-2xl ${
                    n.read ? "bg-slate-800/80" : "bg-emerald-500/12"
                }`}
            >
                {n.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <h3
                        className={`text-sm font-semibold ${
                            n.read ? "text-slate-300" : "text-white"
                        }`}
                    >
                        {n.title}
                    </h3>
                    <Badge tone={meta.tone}>{meta.label}</Badge>
                </div>
                <p className={`mt-1 text-sm leading-5 ${n.read ? "text-slate-500" : "text-slate-400"}`}>
                    {n.description}
                </p>
                <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-600">{n.time}</span>
                    {!n.read && (
                        <button
                            type="button"
                            onClick={() => onMarkRead(n.id)}
                            className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition opacity-0 group-hover:opacity-100"
                        >
                            Mark as read
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
