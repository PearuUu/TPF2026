type ToggleProps = {
    checked?: boolean;
};

export function Toggle({ checked = false }: ToggleProps) {
    return (
        <span
            className={`relative inline-flex h-6 w-11 items-center rounded-full p-1 transition ${checked ? "bg-emerald-500" : "bg-slate-600"
                }`}
            aria-hidden="true"
        >
            <span
                className={`h-4 w-4 rounded-full bg-white transition ${checked ? "translate-x-5" : "translate-x-0"
                    }`}
            />
        </span>
    );
}