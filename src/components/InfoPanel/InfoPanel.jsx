// components/InfoPanel.jsx
"use client";

import { Filter } from "@/components/InfoPanel/Filter/Filter";
import { ShowWeather } from "@/components/InfoPanel/Weather/ShowWeather";
import { DateSelect } from "@/components/InfoPanel/Filter/DateSelect";

export function InfoPanel({ mapState, mountainState, filterState, screenSizeState, showWeather }) {

  const {
    distance,
    setDistance,
    courseTime,
    setCourseTime,
    selectedDate,
    setSelectedDate, } = filterState;

  return (
    <>
      {showWeather ? (
        <ShowWeather
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedMountain={mapState.selectedMountain}
        />
      ) : (
        <Filter
          mapState={mapState}
          mountainState={mountainState}
          filterState={filterState}
        />
      )
      }

      <div className="w-[90%] flex flex-row md:flex-col justify-center items-center md:items-start gap-2">

        {!showWeather &&
          <p className="w-1/2 md:w-full text-left text-xs">Select Date:</p>
        }
        <DateSelect
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          className="w-2/3 md:w-full border border-gray-400 rounded px-2 py-1"
        />
      </div>
    </>
  );
}
