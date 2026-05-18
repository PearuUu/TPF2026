type AvatarProps = {
    name: string;
    size?: "sm" | "md";
};

const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
};

export function Avatar({ name, size = "md" }: AvatarProps) {
    const initials = name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div
            className={`inline-flex items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-slate-700 to-slate-900 font-semibold text-slate-100 ${sizeClasses[size]}`}
            aria-label={name}
            title={name}
        >
            {initials}
        </div>
    );
}