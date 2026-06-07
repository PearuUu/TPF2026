import React, { useState } from 'react';
import { type LucideIcon } from 'lucide-react';

// Definiujemy typy dla propsów komponentu
interface SmartCardProps {
  location: string;       // np. "Salon", "Sypialnia"
  title: string;          // np. "Oświetlenie główne", "Klimatyzacja"
  activeStatusText: string; // np. "80% jasności", "22°C"
  Icon: LucideIcon;       // Komponent ikony z biblioteki lucide-react
  initialState?: boolean;
}

export default function DeviceCard({ location, title, activeStatusText, Icon, initialState }: SmartCardProps) {
  // Stan odpowiedzialny za włączenie/wyłączenie urządzenia
  const [isActive, setIsActive] = useState(initialState ?? true);

  const toggleSwitch = () => {
    setIsActive(!isActive);
  };
  
  return (
    // <div className="w-[340px] h-[380px] bg-[#2d3142] rounded-[32px] p-8 flex flex-col justify-between font-sans select-none">
    <div className="w-full min-h-[240px] bg-[#2d3142] rounded-[32px] p-6 flex flex-col justify-between font-sans select-none shadow-md">
        
      {/* Górna sekcja: Dynamiczna ikona oraz Przełącznik */}
      <div className="flex justify-between items-start">
        {/* Kontener ikony */}
        <div className={`p-4 rounded-[20px] transition-colors duration-300 ${
          isActive ? 'bg-[#223e3b]' : 'bg-[#242736]'
        }`}>
          <Icon 
            className={`w-8 h-8 transition-colors duration-300 ${
              isActive ? 'text-[#4ade80] fill-[#4ade80]' : 'text-[#5d637c]'
            }`} 
          />
        </div>

        {/* Przełącznik (Toggle Switch) */}
        <button 
          onClick={toggleSwitch}
          aria-label={`Przełącznik: ${title}`}
          className={`w-16 h-9 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
            isActive ? 'bg-[#4ade80]' : 'bg-[#474d66]'
          }`}
        >
          <div className={`bg-white w-7 h-7 rounded-full shadow-md transform transition-transform duration-300 ${
            isActive ? 'translate-x-7' : 'translate-x-0'
          }`} />
        </button>
      </div>

      {/* Środkowa sekcja: Dynamiczne teksty informacyjne */}
      <div className="flex flex-col gap-2 mt-auto mb-6">
        <span className="text-[#4ade80] text-sm font-bold tracking-widest uppercase">
          {location}
        </span>
        <h2 className="text-white text-[32px] font-semibold leading-tight tracking-wide whitespace-pre-line">
          {title}
        </h2>
      </div>

      {/* Dolna sekcja: Dynamiczny status i stan */}
      <div className="flex items-center gap-3 text-[#94a3b8] text-lg font-medium">
        <span className={`w-3.5 h-3.5 rounded-full transition-colors duration-300 ${
          isActive ? 'bg-[#4ade80]' : 'bg-[#5d637c]'
        }`} />
        <p className="opacity-80">
          {isActive ? `Active • ${activeStatusText}` : 'Inactive'}
        </p>
      </div>

    </div>
  );
}