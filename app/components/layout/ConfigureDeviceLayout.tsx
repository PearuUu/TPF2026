import React, { useState } from 'react';

export function ConfigureDeviceLayout() {
  // Stan przechowujący aktualnie wybraną lokalizację
  const [selectedRoom, setSelectedRoom] = useState<string>('Podjazd');
  // Stan dla nazwy urządzenia
  const [deviceName, setDeviceName] = useState<string>('Kamera Podjazd');

  const rooms = ['Salon', 'Kuchnia', 'Podjazd', 'Garaż'];

  return (
    <div className="w-full max-w-[1000px] bg-[#1a2035] rounded-[24px] shadow-2xl border border-[#232a45] overflow-hidden flex flex-col mt-8">
        {/* ================= GÓRNA SEKCJA (NAGŁÓWEK) ================= */}
        <div className="p-8 pb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-white text-2xl md:text-[26px] font-semibold tracking-wide">
              Skonfiguruj urządzenie
            </h1>
            <p className="text-[#626c8d] text-sm md:text-base font-medium">
              Krok 3 z 3: Nadaj nazwę i przypisz pokój
            </p>
          </div>
        </div>

        {/* ================= ŚRODKOWA SEKCJA (FORMULARZ) ================= */}
        <div className="bg-[#121622] p-8 flex flex-col gap-8">
            {/* Pole: Nazwa urządzenia */}
            <div className="flex flex-col gap-3">
                <label className="text-[#556082] text-xs font-bold uppercase tracking-widest">
                Nazwa urządzenia
                </label>
                <input
                type="text"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                className="w-full bg-[#1a2035] text-white text-lg rounded-[16px] px-6 py-4 border border-[#232a45] focus:outline-none focus:border-[#00e676]/50 transition-colors"
                placeholder="np. Kamera Podjazd"
                />
            </div>

            {/* Pole: Lokalizacja (Pokój) */}
          <div className="flex flex-col gap-3">
            <label className="text-[#556082] text-xs font-bold uppercase tracking-widest">
              Lokalizacja (Pokój)
            </label>
            
            {/* Siatka przycisków wyboru pokoju */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {rooms.map((room) => {
                const isSelected = selectedRoom === room;
                return (
                  <button
                    key={room}
                    type="button"
                    onClick={() => setSelectedRoom(room)}
                    className={`
                      py-4 rounded-[16px] text-lg font-medium transition-all duration-200 text-center border-2 focus:outline-none
                      ${isSelected 
                        ? 'bg-[#14232c] border-[#104a3a] text-[#00e676]' 
                        : 'bg-[#1a2035] border-transparent text-[#626c8d] hover:bg-[#1e263f] hover:text-[#94a3b8]'
                      }
                    `}
                  >
                    {room}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= DOLNA SEKCJA (STOPKA) ================= */}
        <div className="p-8 pt-6 flex justify-between items-center bg-[#1a2035]">
          {/* Przycisk Wróć */}
          <button className="text-[#626c8d] hover:text-white font-semibold text-lg transition-colors focus:outline-none px-4 py-2 rounded-xl hover:bg-[#232a45]">
            Wróć
          </button>

          {/* Przycisk Zakończ */}
          <button className="bg-[#0b7347] hover:bg-[#0e8a55] text-white sm:text-[#09101d] sm:bg-[#00e676] sm:hover:bg-[#00c853] font-bold text-lg px-9 py-3.5 rounded-[16px] shadow-lg transition-all duration-200 active:scale-95 focus:outline-none">
            Zakończ
          </button>
        </div>
    </div>
  );
}