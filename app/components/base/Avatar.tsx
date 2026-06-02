type AvatarProps = {
    name?: string;
    src?: string;
    alt?: string;
    size?: "sm" | "md" | "xl";
    className?: string;
};

const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    xl: "h-20 w-20 text-xl",
};

export function Avatar({ name, src, alt, size = "md", className = "" }: AvatarProps) {
    if (src) {
        return (
            <img
                src={src}
                alt={alt || name || "Avatar"}
                className={`inline-flex items-center justify-center rounded-full object-cover border border-white/10 ${sizeClasses[size]} ${className}`}
            />
        );
    }

    const initials = (name || "User")
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div
            className={`inline-flex items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-slate-700 to-slate-900 font-semibold text-slate-100 ${sizeClasses[size]} ${className}`}
            aria-label={name}
            title={name}
        >
            {initials}
        </div>
    );
}