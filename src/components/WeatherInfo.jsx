/* eslint-disable react-hooks/exhaustive-deps */
// components/WeatherInfo.jsx

import { useEffect } from "react";
import { DateSelect } from "@/components/DateSelect";

export function WeatherInfo({ selectedDate, setSelectedDate }) {

  return (
    <div>
      <p className="w-full h-full">
        Weather Information will be displayed here.
      </p>
      <DateSelect
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          className="w-2/3 md:w-full border border-gray-400 rounded px-2 py-1"
      />
    </div>
  );
}
