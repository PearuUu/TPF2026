type MobileMenuToggleProps = {
    isOpen: boolean;
    onClick: () => void;
};

export function MobileMenuToggle({ isOpen, onClick }: MobileMenuToggleProps) {
    return (
        <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg lg:hidden"
            type="button"
            onClick={onClick}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
        >
            <span
                className={`block h-0.5 w-6 rounded-full bg-slate-300 transition-all ${isOpen ? "translate-y-2 rotate-45" : ""
                    }`}
            />
            <span
                className={`block h-0.5 w-6 rounded-full bg-slate-300 transition-all ${isOpen ? "opacity-0" : ""
                    }`}
            />
            <span
                className={`block h-0.5 w-6 rounded-full bg-slate-300 transition-all ${isOpen ? "-translate-y-2 -rotate-45" : ""
                    }`}
            />
        </button>
    );
}
