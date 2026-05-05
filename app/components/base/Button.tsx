import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    icon?: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400",
    secondary:
        "bg-white/8 text-slate-100 ring-1 ring-inset ring-white/10 hover:bg-white/12",
    ghost: "bg-transparent text-slate-300 hover:bg-white/8 hover:text-white",
};

export function Button({
    variant = "primary",
    icon,
    className = "",
    children,
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {icon}
            {children}
        </button>
    );
}