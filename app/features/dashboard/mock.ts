import type {
    ActivityItem,
    DashboardStat,
    FavoriteDevice,
    QuickAction,
} from "./types";

export const dashboardStats: DashboardStat[] = [
    {
        label: "Temperatura",
        value: "22.5°C",
        sublabel: "+1.2° vs wczoraj",
    },
    {
        label: "Wilgotność",
        value: "48%",
        sublabel: "Stan optymalny",
    },
    {
        label: "Aktywne",
        value: "12",
        sublabel: "Pobór: 1.2 kWh",
    },
    {
        label: "Bezpieczeństwo",
        value: "Uzbrojone",
        sublabel: "Wszystkie strefy zamknięte",
    },
];

export const favoriteDevices: FavoriteDevice[] = [
    {
        name: "Salon - Oświetlenie",
        location: "Jasność: 80%",
        detail: "Aktywne teraz",
        active: true,
        tone: "emerald",
    },
    {
        name: "Klimatyzacja - Sypialnia",
        location: "Tryb: Włączony",
        detail: "Cicha praca",
        active: false,
        tone: "slate",
    },
    {
        name: "Smart TV - Salon",
        location: "Oglądasz: Netflix",
        detail: "Pauza",
        active: false,
        tone: "indigo",
    },
    {
        name: "Audio - Cały Dom",
        location: "Głośność: 35%",
        detail: "Muzyka w tle",
        active: true,
        tone: "violet",
    },
];

export const activities: ActivityItem[] = [
    {
        title: "Brama wjazdowa otwarta",
        detail: "10 min temu · Smart Gate Pro",
    },
    {
        title: "Uruchomiono tryb 'Kino'",
        detail: "45 min temu · Scena",
    },
    {
        title: "Zakończono pranie",
        detail: "1 godz temu · Pralka WiFi",
    },
    {
        title: "Wykryto brak osób w kuchni",
        detail: "2 godz temu · Czujnik ruchu",
    },
];

export const quickActions: QuickAction[] = [
    { label: "Dobranoc", icon: "☾" },
    { label: "Dzień dobry", icon: "☼" },
    { label: "Wyjazd", icon: "➜" },
    { label: "Impreza", icon: "◎" },
];