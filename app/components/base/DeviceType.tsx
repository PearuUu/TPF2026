import React, { useState } from 'react';
import { type LucideIcon } from 'lucide-react'; // lub 'lucide-react' w zależności od Twojej konfiguracji

interface SmartCardProps {
  title: string;
  content: string;
  Icon: LucideIcon;
  initialState?: boolean;
  onClick?: () => void; // Opcjonalny callback, jeśli chcesz przekazać akcję wyżej
}

export default function DeviceType({ title, content, Icon, initialState = false, onClick }: SmartCardProps) {
  // Zmieniamy domyślny stan na false, aby nowa karta startowała jako nieaktywna (jak "Czujnik")
  const [isActive, setIsActive] = useState(initialState);

  const handleCardClick = () => {
    setIsActive(!isActive);
    if (onClick) onClick();
  };
  
  return (
    <button
      onClick={handleCardClick}
      className={`
        w-full min-h-[200px] rounded-[32px] p-8 flex flex-col justify-between font-sans select-none text-left transition-all duration-300 focus:outline-none
        ${isActive 
          ? 'bg-[#131b2e] border-2 border-[#4ecc6b] shadow-lg shadow-[#4ecc6b]/5' 
          : 'bg-[#181e2e] border-2 border-transparent hover:bg-[#1c2438]'
        }
      `}
    >
      {/* Górna sekcja: Dynamiczna ikona */}
      <div className="flex justify-between items-start">
        {/* Kontener ikony zmieniający się pod stan aktywacji */}
        <div className={`p-4 rounded-[20px] transition-colors duration-300 flex items-center justify-center ${
          isActive ? 'bg-[#4ecc6b]' : 'bg-[#292f45]'
        }`}>
          <Icon 
            className={`w-8 h-8 transition-colors duration-300 ${
              isActive ? 'text-[#14321b]' : 'text-[#8b9bb4]'
            }`} 
            {...(isActive && { fill: '#14321b' })} // Wypełnienie ikony tylko gdy aktywna (opcjonalnie)
          />
        </div>
      </div>

      {/* Dolna sekcja: Teksty informacyjne zepchnięte w dół przez mt-auto */}
      <div className="flex flex-col gap-2 mt-auto text-left">
        <h2 className="text-white text-3xl font-semibold tracking-wide">
          {title}
        </h2>
        <p className="text-[#64748b] text-base font-normal tracking-wide">
          {content}
        </p>
      </div>

    </button>
  );
}