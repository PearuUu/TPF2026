import React, { useState } from 'react';

export function ConfigureDeviceLayout() {
  // State storing the currently selected location
  const [selectedRoom, setSelectedRoom] = useState<string>('Driveway');
  // State for the device name
  const [deviceName, setDeviceName] = useState<string>('Driveway Camera');

  const rooms = ['Living Room', 'Kitchen', 'Driveway', 'Garage'];

  return (
    <div className="w-full max-w-[1000px] bg-[#1a2035] rounded-[24px] shadow-2xl border border-[#232a45] overflow-hidden flex flex-col mt-8">
        {/* ================= HEADER SECTION ================= */}
        <div className="p-8 pb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-white text-2xl md:text-[26px] font-semibold tracking-wide">
              Configure device
            </h1>
            <p className="text-[#626c8d] text-sm md:text-base font-medium">
              Step 3 of 3: Name the device and assign a room
            </p>
          </div>
        </div>

        {/* ================= MIDDLE SECTION (FORM) ================= */}
        <div className="bg-[#121622] p-8 flex flex-col gap-8">
            {/* Field: Device name */}
            <div className="flex flex-col gap-3">
                <label className="text-[#556082] text-xs font-bold uppercase tracking-widest">
                  Device name
                </label>
                <input
                  type="text"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  className="w-full bg-[#1a2035] text-white text-lg rounded-[16px] px-6 py-4 border border-[#232a45] focus:outline-none focus:border-[#00e676]/50 transition-colors"
                  placeholder="e.g. Driveway Camera"
                />
            </div>

            {/* Field: Location (Room) */}
          <div className="flex flex-col gap-3">
            <label className="text-[#556082] text-xs font-bold uppercase tracking-widest">
              Location (Room)
            </label>
            
            {/* Grid of room selection buttons */}
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

        {/* ================= FOOTER SECTION ================= */}
        <div className="p-8 pt-6 flex justify-between items-center bg-[#1a2035]">
          {/* Back Button */}
          <button className="text-[#626c8d] hover:text-white font-semibold text-lg transition-colors focus:outline-none px-4 py-2 rounded-xl hover:bg-[#232a45]">
            Back
          </button>

          {/* Finish Button */}
          <button className="bg-[#0b7347] hover:bg-[#0e8a55] text-white sm:text-[#09101d] sm:bg-[#00e676] sm:hover:bg-[#00c853] font-bold text-lg px-9 py-3.5 rounded-[16px] shadow-lg transition-all duration-200 active:scale-95 focus:outline-none">
            Finish
          </button>
        </div>
    </div>
  );
}