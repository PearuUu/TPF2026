import React from 'react';
import DeviceCard from '../base/DeviceCard'; // Twój uniwersalny komponent karty
import MonitoringCard from '../base/MonitoringCard';
import { Lightbulb, Snowflake, Tv, Coffee, Speaker, Bot } from 'lucide-react';

export function DevicePageLayout() {
  return (
    <div className="min-h-screen bg-[#0f111a] p-6 md:p-12 flex justify-center items-center">
      {/* Kontener siatki (Grid) dopasowany do ekranów */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] w-full"> */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] w-full"> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 max-w-[1400px] w-full">
        
        {/* RZĄD 1 */}
        <DeviceCard 
          location="Salon"
          title="Oświetlenie główne"
          activeStatusText="80% jasności"
          Icon={Lightbulb}
          initialState={true}
        />

        <DeviceCard 
          location="Sypialnia"
          title="Klimatyzacja"
          activeStatusText="Chłodzenie • 21°C"
          Icon={Snowflake}
          initialState={true}
        />

        <DeviceCard 
          location="Salon"
          title="Smart TV 4K"
          activeStatusText="Tryb czuwania"
          Icon={Tv}
          initialState={false}
        />

        {/* Puste miejsce w pierwszym rzędzie na screenie zostawiamy wolne, Grid automatycznie ułoży kolejne elementy */}

        {/* RZĄD 2 */}
        <MonitoringCard />

        <DeviceCard 
          location="Kuchnia"
          title="Ekspres do kawy"
          activeStatusText="Gotowy • Woda: 75%"
          Icon={Coffee}
          initialState={true}
        />

        <DeviceCard 
          location="Łazienka"
          title="Głośnik Smart"
          activeStatusText="Rozłączony"
          Icon={Speaker}
          initialState={false}
        />

        {/* RZĄD 3 */}
        <DeviceCard 
          location="Cały dom"
          title="Robot sprzątający"
          activeStatusText="Sprzątanie • Bateria: 92%"
          Icon={Bot}
          initialState={true}
        />

      </div>
    </div>
  );
}