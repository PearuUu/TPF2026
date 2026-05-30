import { Avatar } from "../base/Avatar";

export function Header() {
    return (
        <div className="flex items-center justify-between w-full">
            {/* Left: Title */}
            <h1 className="text-3xl font-bold text-white">Home Sweet Home</h1>

            {/* Right: Weather, Notification, Avatar */}
            <div className="flex items-center gap-6">
                {/* Weather Info */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6">
                        <svg
                            className="w-5 h-5 text-emerald-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="5" />
                            <line
                                x1="12"
                                y1="1"
                                x2="12"
                                y2="3"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <line
                                x1="12"
                                y1="21"
                                x2="12"
                                y2="23"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <line
                                x1="4.22"
                                y1="4.22"
                                x2="5.64"
                                y2="5.64"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <line
                                x1="18.36"
                                y1="18.36"
                                x2="19.78"
                                y2="19.78"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <line
                                x1="1"
                                y1="12"
                                x2="3"
                                y2="12"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <line
                                x1="21"
                                y1="12"
                                x2="23"
                                y2="12"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <line
                                x1="4.22"
                                y1="19.78"
                                x2="5.64"
                                y2="18.36"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <line
                                x1="18.36"
                                y1="5.64"
                                x2="19.78"
                                y2="4.22"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                    <span className="text-sm font-medium text-emerald-400">
                        72°F · CLEAR
                    </span>
                </div>

                {/* Notification Bell */}
                <button className="relative p-2 text-slate-300 hover:text-white transition">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                </button>

                {/* Avatar */}
                <Avatar name="John Doe" size="md" />
            </div>
        </div>
    );
}
