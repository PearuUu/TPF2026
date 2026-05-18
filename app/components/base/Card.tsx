import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

export function Card({ className = "", children, ...props }: CardProps) {
    return (
        <div
            className={`rounded-[1.5rem] border border-white/8 bg-white/6 p-4 shadow-[0_20px_60px_rgba(2,8,23,0.35)] backdrop-blur-xl ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}