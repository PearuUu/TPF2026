import React from 'react';
import DeviceCard from '../base/DeviceCard';
import MonitoringCard from '../base/MonitoringCard';
import { Lightbulb, Snowflake, Tv, Coffee, Speaker, Bot } from 'lucide-react';

export default function DevicePageLayout() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-6 max-w-[1400px] w-full">
        {/* RZĄD 1 */}
        <DeviceCard 
          location="Living room"
          title="Main lighting"
          activeStatusText="80% brightness"
          Icon={Lightbulb}
          initialState={true}
        />

        <DeviceCard 
          location="Bedroom"
          title="Air conditioning"
          activeStatusText="Cooling • 21°C"
          Icon={Snowflake}
          initialState={true}
        />

        <DeviceCard 
          location="Living room"
          title="Smart TV 4K"
          activeStatusText="Standby mode"
          Icon={Tv}
          initialState={false}
        />

        {/* We leave the empty space from the screenshot row 1 free; Grid will automatically arrange the next elements */}

        {/* ROW 2 */}
        <MonitoringCard />

        <DeviceCard 
          location="Kitchen"
          title="Coffee maker"
          activeStatusText="Ready • Water: 75%"
          Icon={Coffee}
          initialState={true}
        />

        <DeviceCard 
          location="Bathroom"
          title="Smart speaker"
          activeStatusText="Disconnected"
          Icon={Speaker}
          initialState={false}
        />

        {/* ROW 3 */}
        <DeviceCard 
          location="Entire house"
          title="Robot vacuum"
          activeStatusText="Cleaning • Battery: 92%"
          Icon={Bot}
          initialState={true}
        />
      </div>
    </div>
  );
}