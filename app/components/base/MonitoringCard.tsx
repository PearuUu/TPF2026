import React from 'react';
import { Video, ClipboardList } from 'lucide-react';

export default function MonitoringCard() {
  return (
<div className="md:col-span-2 min-h-[240px] bg-gradient-to-br from-[#243460] to-[#1e2540] rounded-[32px] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden shadow-lg select-none">
      
      {/* Lewa strona: Teksty i Przyciski */}
      <div className="flex flex-col justify-between h-full w-full sm:w-auto z-10 gap-4 sm:gap-0">
        <div>
          <span className="text-[#8492c4] text-xs font-bold tracking-widest uppercase">
            Security
          </span>
          <h2 className="text-white text-2xl md:text-[32px] font-semibold mt-1 leading-tight">
            Entrance monitoring
          </h2>
        </div>

        {/* Przyciski akcji - na małych ekranach jeden pod drugim, potem obok siebie */}
        <div className="flex flex-col xs:flex-row gap-3">
          <button className="flex items-center justify-center gap-2 bg-[#93c5fd] hover:bg-[#60a5fa] text-[#1e293b] font-bold px-4 py-3 rounded-2xl transition-colors w-full sm:w-auto">
            <Video className="w-4 h-4" />
            <span className="text-[11px] tracking-wider uppercase font-extrabold whitespace-nowrap">Live view</span>
          </button>
          
          <button className="flex items-center justify-center gap-2 border border-[#475569] hover:bg-[#2e3752] text-white font-bold px-4 py-3 rounded-2xl transition-colors w-full sm:w-auto">
            <ClipboardList className="w-4 h-4 text-[#8492c4]" />
            <span className="text-[11px] tracking-wider uppercase font-extrabold text-[#94a3b8] whitespace-nowrap">Logs</span>
          </button>
        </div>
      </div>

      {/* Prawa strona: Miniatura wideo - automatycznie centruje się lub dopasowuje */}
      <div className="relative w-full sm:w-[190px] h-[140px] rounded-2xl overflow-hidden shadow-2xl sm:rotate-[-2deg] border border-[#3b4766] shrink-0">
        <div className="w-full h-full bg-gradient-to-b from-[#475569] to-[#0f172a] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 w-full h-[40%] bg-[#1e293b] skew-y-6" />
          <div className="absolute bottom-0 right-0 w-[40%] h-[60%] bg-[#334155]" />
          
          <div className="absolute top-3 left-3 bg-[#f87171] text-[10px] font-extrabold text-white px-2 py-0.5 rounded-md flex items-center gap-1 animate-pulse">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            REC
          </div>
        </div>
      </div>

    </div>
  );
}