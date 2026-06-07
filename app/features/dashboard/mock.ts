import type {
    ActivityItem,
    DashboardStat,
    FavoriteDevice,
    QuickAction,
} from "./types";

export const dashboardStats: DashboardStat[] = [
    {
        label: "Temperature",
        value: "22.5°C",
        sublabel: "+1.2° vs yesterday",
    },
    {
        label: "Humidity",
        value: "48%",
        sublabel: "Optimal level",
    },
    {
        label: "Active",
        value: "12",
        sublabel: "Usage: 1.2 kWh",
    },
    {
        label: "Security",
        value: "Armed",
        sublabel: "All zones secured",
    },
];

export const favoriteDevices: FavoriteDevice[] = [
    {
        name: "Living Room – Lighting",
        location: "Brightness: 80%",
        detail: "Active now",
        active: true,
        tone: "emerald",
    },
    {
        name: "Air Conditioning – Bedroom",
        location: "Mode: On",
        detail: "Silent mode",
        active: false,
        tone: "slate",
    },
    {
        name: "Smart TV – Living Room",
        location: "Watching: Netflix",
        detail: "Paused",
        active: false,
        tone: "indigo",
    },
    {
        name: "Audio – Whole Home",
        location: "Volume: 35%",
        detail: "Background music",
        active: true,
        tone: "violet",
    },
];

export const activities: ActivityItem[] = [
    {
        title: "Entry gate opened",
        detail: "10 min ago · Smart Gate Pro",
    },
    {
        title: "Cinema mode activated",
        detail: "45 min ago · Scene",
    },
    {
        title: "Laundry cycle complete",
        detail: "1 hr ago · WiFi Washing Machine",
    },
    {
        title: "No motion detected in kitchen",
        detail: "2 hrs ago · Motion Sensor",
    },
];

export const quickActions: QuickAction[] = [
    { label: "Good Night", icon: "☾" },
    { label: "Good Morning", icon: "☼" },
    { label: "Leaving Home", icon: "➜" },
    { label: "Party Mode", icon: "◎" },
];
