import React from 'react';
import { Video, ClipboardList } from 'lucide-react';

export default function MonitoringCard() {
  return (
    <div className="lg:col-span-2 h-[260px] bg-gradient-to-br from-[#243460] to-[#1e2540] rounded-[32px] p-8 flex justify-between items-center relative overflow-hidden shadow-lg select-none">
      
      {/* Lewa strona: Teksty i Przyciski */}
      <div className="flex flex-col justify-between h-full z-10">
        <div>
          <span className="text-[#8492c4] text-xs font-bold tracking-widest uppercase">
            Bezpieczeństwo
          </span>
          <h2 className="text-white text-[32px] font-semibold mt-1 leading-tight">
            Monitoring wejścia
          </h2>
        </div>

        {/* Przyciski akcji */}
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-[#93c5fd] hover:bg-[#60a5fa] text-[#1e293b] font-bold px-5 py-3 rounded-2xl transition-colors">
            <Video className="w-5 h-5" />
            <span className="text-xs tracking-wider uppercase font-extrabold">Podgląd na żywo</span>
          </button>
          
          <button className="flex items-center gap-2 border border-[#475569] hover:bg-[#2e3752] text-white font-bold px-5 py-3 rounded-2xl transition-colors">
            <ClipboardList className="w-5 h-5 text-[#8492c4]" />
            <span className="text-xs tracking-wider uppercase font-extrabold text-[#94a3b8]">Logi zdarzeń</span>
          </button>
        </div>
      </div>

      {/* Prawa strona: Miniatura wideo */}
      <div className="relative w-[190px] h-[140px] rounded-2xl overflow-hidden shadow-2xl rotate-[-2deg] border border-[#3b4766]">
        {/* Atrapa obrazu z kamery (czarno-biała nocna sceneria) */}
        <div className="w-full h-full bg-gradient-to-b from-[#475569] to-[#0f172a] flex items-center justify-center relative">
          <div className="absolute inset-0 bg-black/40" />
          {/* Prosty szkic imitujący podjazd/dom w nocy */}
          <div className="absolute bottom-0 w-full h-[40%] bg-[#1e293b] skew-y-6" />
          <div className="absolute bottom-0 right-0 w-[40%] h-[60%] bg-[#334155]" />
          
          {/* Badge REC */}
          <div className="absolute top-3 left-3 bg-[#f87171] text-[10px] font-extrabold text-white px-2 py-0.5 rounded-md flex items-center gap-1 animate-pulse">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            REC
          </div>
        </div>
      </div>

    </div>
  );
}