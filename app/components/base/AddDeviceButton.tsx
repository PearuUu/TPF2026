import React from 'react';
import { Plus } from 'lucide-react';

interface AddDeviceButtonProps {
  onClick?: () => void;
}

export default function AddDeviceButton({ onClick }: AddDeviceButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Dodaj nowe urządzenie"
      className="
        w-24 h-24 
        bg-[#57dc77] 
        hover:bg-[#4ecc6b] 
        active:scale-95 
        rounded-[28px] 
        flex 
        items-center 
        justify-center 
        shadow-lg 
        shadow-[#57dc77]/10 
        transition-all 
        duration-200 
        focus:outline-none 
        focus:ring-2 
        focus:ring-[#57dc77]/50
      "
      style={{"position": "fixed", "bottom": 60, "right": 60}}
    >
      <Plus 
        className="w-10 h-10 text-[#14321b]" 
        strokeWidth={2.5} 
      />
    </button>
  );
}