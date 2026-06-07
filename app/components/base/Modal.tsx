import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:items-center p-0 md:p-4">
            {/* Backdrop click close */}
            <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

            {/* Modal Container */}
            <div className="relative z-10 flex flex-col w-full max-h-[90vh] md:max-h-[85vh] bg-[#0c1524]/95 border border-white/5 shadow-2xl backdrop-blur-xl transition-all duration-300 rounded-t-[28px] md:rounded-[28px] md:max-w-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                    <h3 className="text-xl font-bold tracking-tight text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors focus:outline-none"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                    {children}
                </div>
            </div>
        </div>
    );
}
