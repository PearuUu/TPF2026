import React from 'react';
import { Video } from 'lucide-react';

export function SearchDeviceLayout() {
  return (
    <div>
        <div className="w-full max-w-[1000px] rounded-[24px] shadow-2xl border border-[#232a45] overflow-hidden mt-8">
            <div className="p-8 pb-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-white text-2xl md:text-[26px] font-semibold tracking-wide">
                      Searching for device...
                    </h1>
                    <p className="text-[#626c8d] text-sm md:text-base font-medium">
                      Step 2 of 3: Pairing outdoor camera
                    </p>
                </div>
            </div>

            <div className="bg-[#121622] p-8 min-h-[360px] flex flex-col items-center justify-center text-center">
                <div className="relative flex items-center justify-center w-40 h-40 mb-8">
                    {/* Outer pulsing circle 2 */}
                    <div className="absolute inset-0 rounded-full bg-[#4ecc6b]/5 border border-[#4ecc6b]/10 animate-ping [animation-duration:3s]" />
                    
                    {/* Outer pulsing circle 1 */}
                    <div className="absolute w-[85%] h-[85%] rounded-full bg-[#4ecc6b]/5 border border-[#4ecc6b]/20 animate-pulse [animation-duration:2s]" />
                    
                    {/* Main ring around the icon */}
                    <div className="absolute w-[65%] h-[65%] rounded-full bg-[#1b262d] border-2 border-[#1c3831] flex items-center justify-center">
                    {/* Inner container of the icon itself */}
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                        <Video className="w-10 h-10 text-[#4ecc6b]" strokeWidth={2} />
                    </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 max-w-[500px]">
                    <h2 className="text-white text-xl md:text-2xl font-medium tracking-wide">
                      Searching for signal...
                    </h2>
                    <p className="text-[#556082] text-sm md:text-base font-normal leading-relaxed">
                      Make sure the device is in pairing mode and connected to power.
                    </p>
                </div>

            </div>
            <div className="p-8 pt-6 flex justify-end items-center bg-[#1a2035]">
                {/* Cancel button pushed to the right edge according to the screenshot */}
                <button className="text-[#626c8d] hover:text-white font-semibold text-lg transition-colors focus:outline-none px-6 py-2 rounded-xl hover:bg-[#232a45]">
                    Cancel
                </button>
            </div>
        </div>
    </div>
  );
}