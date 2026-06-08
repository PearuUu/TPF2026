export type Notification = {
    id: string;
    title: string;
    description: string;
    time: string;
    category: "security" | "automation" | "device" | "energy" | "system";
    read: boolean;
    icon: string;
};

export const notifications: Notification[] = [
    {
        id: "n1",
        title: "Motion Detected – Front Door",
        description: "Motion sensor triggered at the main entrance. Camera recording initiated automatically.",
        time: "2 min ago",
        category: "security",
        read: true,
        icon: "🔍",
    },
    {
        id: "n2",
        title: "Energy Alert – Unusual Spike",
        description: "Your home consumed 2.4× the average energy between 14:00–15:00. This may be due to the oven and air conditioning running simultaneously.",
        time: "18 min ago",
        category: "energy",
        read: true,
        icon: "⚡",
    },
    {
        id: "n3",
        title: "Automation: Evening Scene Active",
        description: "The Evening Scene was activated at sunset. Lights dimmed to 35%, temperature set to 21°C, blinds lowered.",
        time: "1 hr ago",
        category: "automation",
        read: true,
        icon: "🌙",
    },
    {
        id: "n4",
        title: "Smart TV – Living Room offline",
        description: "The Smart TV in the living room lost its network connection and is unreachable. It may have been powered off manually.",
        time: "2 hrs ago",
        category: "device",
        read: true,
        icon: "📺",
    },
    {
        id: "n5",
        title: "Security System Armed",
        description: "All security zones were armed automatically at 23:00 as scheduled. All doors and windows are secured.",
        time: "Yesterday, 23:00",
        category: "security",
        read: true,
        icon: "🔒",
    },
    {
        id: "n6",
        title: "Laundry Cycle Complete",
        description: "The WiFi Washing Machine in the utility room has finished its cycle. Don't forget to move the laundry to the dryer.",
        time: "Yesterday, 18:42",
        category: "device",
        read: true,
        icon: "🫧",
    },
    {
        id: "n7",
        title: "Firmware Update Available",
        description: "A new firmware version (v3.4.2) is available for your Smart Gate Pro. The update includes security patches and performance improvements.",
        time: "2 days ago",
        category: "system",
        read: true,
        icon: "⚙️",
    },
    {
        id: "n8",
        title: "Weekly Energy Report Ready",
        description: "Your weekly energy summary is ready. This week you used 12% less energy than last week — great work optimising your home!",
        time: "3 days ago",
        category: "energy",
        read: true,
        icon: "📊",
    },
];
