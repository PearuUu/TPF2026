import React from 'react';
import MonitoringCard from '../base/MonitoringCard';
import { Lightbulb, Snowflake, Tv, Coffee, Speaker, Bot } from 'lucide-react';
import DeviceType from '../base/DeviceType';

export function DeviceTypesLayout() {
  return (
    <div className="min-h-screen p-6 md:p-12 flex justify-center items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 max-w-[1400px] w-full">
        
        {/* RZĄD 1 */}
        <DeviceType 
            title="Oświetlenie"
            content="Żarównki, taśmy led, panele"
            Icon={Lightbulb}
            initialState={false}
        />

        <DeviceType 
            title="Czujnik"
            content="Ruch, dym, zalanie, CO2"
            Icon={Lightbulb}
            initialState={false}
        />

        <DeviceType 
            title="Kamera"
            content="Monitoring, dzwonek video"
            Icon={Lightbulb}
            initialState={true}
        />

        <DeviceType 
            title="Gniezdko"
            content="Smart plug'i i listwy"
            Icon={Lightbulb}
            initialState={false}
        />

        <DeviceType 
            title="Klimat"
            content="Termostaty, nawilzacze"
            Icon={Lightbulb}
            initialState={false}
        />

        <DeviceType 
            title="Inne"
            content="Ustawienia niestandardowe"
            Icon={Lightbulb}
            initialState={false}
        />

      </div>
    </div>
  );
}