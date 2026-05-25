export type DashboardStat = {
    label: string;
    value: string;
    sublabel: string;
};

export type FavoriteDevice = {
    name: string;
    location: string;
    detail: string;
    active: boolean;
    tone: "emerald" | "indigo" | "violet" | "slate";
};

export type ActivityItem = {
    title: string;
    detail: string;
};

export type QuickAction = {
    label: string;
    icon: string;
};