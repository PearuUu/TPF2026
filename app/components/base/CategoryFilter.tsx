import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CategoryFilterProps {
  onCategoryChange?: (category: string) => void;
  onSortChange?: (sortBy: string) => void;
}

export default function CategoryFilter({ onCategoryChange, onSortChange }: CategoryFilterProps) {
  // Lista kategorii/pokoi pobrana ze zdjęcia
  const categories = ['All', 'Living room', 'Kitchen', 'Bathroom', 'Bedroom'];
  
  // Stan dla aktywnej zakładki
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Opcjonalny stan dla otwartego dropdownu sortowania
  const [currentSort, setCurrentSort] = useState('Status');

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (onCategoryChange) onCategoryChange(category);
  };

  const [isOpen, setIsOpen] = useState(false);
  const sortOptions = ['Status', 'Name', 'Type', 'Room'];

  const handleSortSelect = (option: string) => {
    setCurrentSort(option);
    setIsOpen(false); // Zamyka listę natychmiast po wybraniu nowej wartości
    if (onSortChange) onSortChange(option);
  };

  return (
    <div className="w-full max-w-[1400px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 font-sans select-none">
      
      {/* LEWA STRONA: Przyciski kategorii (pokoje) */}
      <div className="flex flex-wrap items-center gap-2 bg-[#131722]/60 p-1.5 rounded-[16px] border border-[#232a45]/30">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`
                px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none
                ${isActive 
                  ? 'bg-[#21273a] text-[#4ade80] shadow-md shadow-black/10' 
                  : 'text-[#626c8d] hover:text-[#94a3b8] hover:bg-[#1a2035]/50'
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>

{/* PRAWA STRONA: Selektor sortowania */}
      {/* Dodana klasa relative na kontenerze, aby menu pozycjonowało się idealnie pod przyciskiem */}
      <div className="relative flex items-center gap-3 self-end sm:self-auto">
        <span className="text-[#556082] text-xs font-bold uppercase tracking-widest">
          Sort by:
        </span>
        
        {/* Główny przycisk typu Select */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 bg-[#181e2e] hover:bg-[#20273d] text-white text-sm font-medium px-4 py-3 rounded-xl border border-[#232a45] transition-colors focus:outline-none min-w-[120px] justify-between"
        >
          <span>{currentSort}</span>
          <ChevronDown className={`w-4 h-4 text-[#626c8d] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dynamicznie renderowana lista rozwijana (Dropdown) */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-[#181e2e] border border-[#232a45] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="py-1 flex flex-col">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSortSelect(option)}
                  className={`
                    w-full text-left px-4 py-2.5 text-sm transition-colors focus:outline-none
                    ${currentSort === option 
                      ? 'bg-[#21273a] text-[#4ade80] font-medium' 
                      : 'text-[#626c8d] hover:bg-[#20273d] hover:text-white'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}