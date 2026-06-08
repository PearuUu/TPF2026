import React from 'react';
import DeviceCard from '../base/DeviceCard';
import MonitoringCard from '../base/MonitoringCard';
import { Lightbulb, Snowflake, Tv, Coffee, Speaker, Bot } from 'lucide-react';

interface DevicePageLayoutProps {
  activeCategory: string;
  sortBy: string; // Nowy wymagany prop z kryterium sortowania
}

const allDevices = [
  { 
    type: 'device',
    location: "Living room",
    title: "Main lighting",
    activeStatusText: "80% brightness",
    Icon: Lightbulb,
    initial: true 
  },
  { 
    type: 'device',
    location: "Bedroom",
    title: "Air conditioning",
    activeStatusText: "Cooling • 21°C",
    Icon: Snowflake,
    initial: true 
  },
  { 
    type: 'device',
    location: "Living room",
    title: "Smart TV 4K",
    activeStatusText: "Standby mode",
    Icon: Tv,
    initial: false 
  },
  { 
    type: 'monitoring',
    location: "Living room", 
    title: "CCTV Overview", // Dodany tytuł, by sortowanie po nazwie/typie nie wywalało błędu
    activeStatusText: "",
    Icon: Coffee,
    initial: false 
  },
  { 
    type: 'device',
    location: "Kitchen",
    title: "Coffee maker",
    activeStatusText: "Ready • Water: 75%",
    Icon: Coffee,
    initial: true 
  },
  { 
    type: 'device',
    location: "Bathroom",
    title: "Smart speaker",
    activeStatusText: "Disconnected",
    Icon: Speaker,
    initial: false 
  },
  { 
    type: 'device',
    location: "Entire house",
    title: "Robot vacuum",
    activeStatusText: "Cleaning • Battery: 92%",
    Icon: Bot,
    initial: true 
  },
];

export default function DevicePageLayout({ activeCategory, sortBy }: DevicePageLayoutProps) {
  
  // 1. Najpierw filtrujemy urządzenia według pokoju
  const filteredDevices = activeCategory === 'All' 
    ? [...allDevices] 
    : allDevices.filter(device => device.location === activeCategory || device.location === "Entire house");

  // 2. Następnie sortujemy przefiltrowaną listę na podstawie wybranego kryterium
  const sortedAndFilteredDevices = filteredDevices.sort((a, b) => {
    if (sortBy === 'Name') {
      return a.title.localeCompare(b.title); // Alfabetycznie po tytule
    }
    if (sortBy === 'Room') {
      return a.location.localeCompare(b.location); // Alfabetycznie po lokalizacji
    }
    if (sortBy === 'Type') {
      return a.type.localeCompare(b.type); // Grupuje najpierw urządzenia, potem monitoring (lub odwrotnie)
    }
    if (sortBy === 'Status') {
      // Sortowanie po statusie: aktywne (true) lądują na górze siatki
      return (b.initial === true ? 1 : 0) - (a.initial === true ? 1 : 0);
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex justify-center items-start py-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 max-w-[1400px] w-full">
        {/* Renderujemy ostatecznie przefiltrowaną i posortowaną tablicę */}
        {sortedAndFilteredDevices.map((device, index) => {
          if (device.type === 'monitoring') {
            return <MonitoringCard key={index} />;
          }

          return (
            <DeviceCard 
              key={index}
              location={device.location}
              title={device.title}
              activeStatusText={device.activeStatusText}
              Icon={device.Icon}
              initialState={device.initial}
            />
          );
        })}

        {filteredDevices.length === 0 && (
          <div className="col-span-full text-center py-12 text-[#556082] font-medium">
            No devices registered in this room.
          </div>
        )}
      </div>
    </div>
  );
}