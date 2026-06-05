import React from 'react';
import DeviceType from '../base/DeviceType';
import { Lightbulb, Radio, Video, Plug, Thermometer, Ellipsis, X } from 'lucide-react';

export function AddDevicePageLayout() {
  return (
    <div >
      <div >
        <div className="w-full max-w-[1000px] bg-[#1a2035] rounded-[24px] shadow-2xl border border-[#232a45] overflow-hidden flex flex-col">
          {/* ================= GÓRNA SEKCJA (NAGŁÓWEK) ================= */}
        <div className="p-8 pb-6 flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h1 className="text-white text-2xl md:text-[26px] font-semibold tracking-wide">
              Dodaj nowe urządzenie
            </h1>
            <p className="text-[#626c8d] text-sm md:text-base font-medium">
              Krok 1 z 3: Wybierz typ urządzenia
            </p>
          </div>
          
          {/* Przycisk X (Zamknij) */}
          <button className="text-[#626c8d] hover:text-white transition-colors p-1.5 hover:bg-[#232a45] rounded-xl focus:outline-none">
            <X className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>

        {/* ================= ŚRODKOWA SEKCJA (SIATKA KART) ================= */}
        {/* Zmiana tła kontenera siatki na ciemniejszy kolor zgodny ze zdjęciem */}
        <div className="bg-[#121622] p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <DeviceType 
              title="Oświetlenie"
              content="Żarówki, taśmy LED, panele"
              Icon={Lightbulb}
              initialState={false}
            />

            <DeviceType 
              title="Czujnik"
              content="Ruch, dym, zalanie, CO2"
              Icon={Radio}
              initialState={false}
            />

            <DeviceType 
              title="Kamera"
              content="Monitoring, dzwonek wideo"
              Icon={Video}
              initialState={true}
            />

            <DeviceType 
              title="Gniazdko"
              content="Smart plugi i listwy"
              Icon={Plug}
              initialState={false}
            />

            <DeviceType 
              title="Klimat"
              content="Termostaty, nawilżacze"
              Icon={Thermometer}
              initialState={false}
            />

            <DeviceType 
              title="Inne"
              content="Urządzenia niestandardowe"
              Icon={Ellipsis}
              initialState={false}
            />
          </div>
        </div>

        {/* ================= DOLNA SEKCJA (STOPKA) ================= */}
        <div className="p-8 pt-6 flex justify-between items-center bg-[#1a2035]">
          {/* Przycisk Anuluj */}
          <button className="text-[#94a3b8] hover:text-white font-semibold text-lg transition-colors focus:outline-none px-4 py-2 rounded-xl hover:bg-[#232a45]">
            Anuluj
          </button>

          {/* Przycisk Dalej */}
          <button className="bg-[#00e676] hover:bg-[#00c853] text-[#09101d] font-bold text-lg px-9 py-3.5 rounded-[16px] shadow-lg shadow-[#00e676]/10 transition-all duration-200 active:scale-95 focus:outline-none">
            Dalej
          </button>
        </div>
        
        </div>
      </div>
    </div>
  );
}