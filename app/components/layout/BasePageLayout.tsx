import { useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileMenuToggle } from "./MobileMenuToggle";

type NavItemData = {
    label: string;
    icon: ReactNode;
    active?: boolean;
};

type BasePageLayoutProps = {
    children: ReactNode;
    navItems: NavItemData[];
    onNavItemClick?: (label: string) => void;
    appName?: string;
    appStatus?: string;
    tipTitle?: string;
    tipDescription?: string;
    tipButtonLabel?: string;
    onTipButtonClick?: () => void;
};

export function BasePageLayout({
    children,
    navItems,
    onNavItemClick,
    appName = "Concierge",
    appStatus = "System active",
    tipTitle = "Wskazówka od Concierge",
    tipDescription,
    tipButtonLabel = "Optymalizuj teraz",
    onTipButtonClick,
}: BasePageLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row">
            {/* ── Sidebar ── */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                // navItems={navItems}
                onNavItemClick={onNavItemClick}
                appName={appName}
                appStatus={appStatus}
                tipTitle={tipTitle}
                tipDescription={tipDescription}
                tipButtonLabel={tipButtonLabel}
                onTipButtonClick={onTipButtonClick}
            />

            {/* ── Right container: Header + Content ── */}
            <div className="flex flex-col flex-1 min-h-screen lg:min-h-auto">
                {/* ── Header with mobile menu toggle ── */}
                <header className="w-full border-b border-white/8 bg-slate-950/95 backdrop-blur-xl">
                    <div className="flex items-center justify-between px-4 py-4 lg:px-6">
                        <MobileMenuToggle
                            isOpen={sidebarOpen}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        />
                        <div className="flex-1 lg:hidden" />
                        <Header />
                    </div>
                </header>

                {/* ── Main content ── */}
                <main className="flex-1 overflow-x-hidden px-4 py-4 pb-24 lg:px-6 lg:py-6 lg:pb-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
