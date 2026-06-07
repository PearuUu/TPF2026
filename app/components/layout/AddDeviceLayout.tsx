import React from 'react';
import DeviceType from '../base/DeviceType';
import { Lightbulb, Radio, Video, Plug, Thermometer, Ellipsis, X } from 'lucide-react';

export function AddDevicePageLayout() {
  return (
    <div>
      <div>
        <div className="w-full max-w-[1000px] bg-[#1a2035] rounded-[24px] shadow-2xl border border-[#232a45] overflow-hidden flex flex-col">
          
          {/* ================= HEADER SECTION ================= */}
          <div className="p-8 pb-6 flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h1 className="text-white text-2xl md:text-[26px] font-semibold tracking-wide">
                Add new device
              </h1>
              <p className="text-[#626c8d] text-sm md:text-base font-medium">
                Step 1 of 3: Select device type
              </p>
            </div>
            
            {/* X Button (Close) */}
            <button className="text-[#626c8d] hover:text-white transition-colors p-1.5 hover:bg-[#232a45] rounded-xl focus:outline-none">
              <X className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>

          {/* ================= MIDDLE SECTION (CARD GRID) ================= */}
          <div className="bg-[#121622] p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <DeviceType 
                title="Lighting"
                content="Light bulbs, LED strips, panels"
                Icon={Lightbulb}
                initialState={false}
              />

              <DeviceType 
                title="Sensor"
                content="Motion, smoke, flood, CO2"
                Icon={Radio}
                initialState={false}
              />

              <DeviceType 
                title="Camera"
                content="Monitoring, video doorbell"
                Icon={Video}
                initialState={true}
              />

              <DeviceType 
                title="Outlet"
                content="Smart plugs and power strips"
                Icon={Plug}
                initialState={false}
              />

              <DeviceType 
                title="Climate"
                content="Thermostats, humidifiers"
                Icon={Thermometer}
                initialState={false}
              />

              <DeviceType 
                title="Other"
                content="Custom devices"
                Icon={Ellipsis}
                initialState={false}
              />
            </div>
          </div>

          {/* ================= FOOTER SECTION ================= */}
          <div className="p-8 pt-6 flex justify-between items-center bg-[#1a2035]">
            {/* Cancel Button */}
            <button className="text-[#94a3b8] hover:text-white font-semibold text-lg transition-colors focus:outline-none px-4 py-2 rounded-xl hover:bg-[#232a45]">
              Cancel
            </button>

            {/* Next Button */}
            <button className="bg-[#00e676] hover:bg-[#00c853] text-[#09101d] font-bold text-lg px-9 py-3.5 rounded-[16px] shadow-lg shadow-[#00e676]/10 transition-all duration-200 active:scale-95 focus:outline-none">
              Next
            </button>
          </div>
        
        </div>
      </div>
    </div>
  );
}