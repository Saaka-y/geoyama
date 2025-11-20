// components/InfoPanel.jsx
"use client";

import { Filter } from "@/components/InfoPanel/Filter/Filter";
import { ShowWeather } from "@/components/InfoPanel/Weather/ShowWeather";
import { DateSelect } from "@/components/InfoPanel/Filter/DateSelect";

export function InfoPanel({ mapState, mountainState, filterState, screenSizeState }) {

  const {
    distance,
    setDistance,
    courseTime,
    setCourseTime,
    selectedDate,
    setSelectedDate, } = filterState;

  return (
    <>
      <div className={`${screenSizeState.infoViewClass} p-6 md:p-8 mt-2 flex flex-col justify-start items-center md:justify-start gap-4 bg-(--color-surface)`}>
        {!mapState.selectedMountain ? (

          <Filter
            mapState={mapState}
            mountainState={mountainState}
            filterState={filterState}
            screenSizeState={screenSizeState}
          />
        ) : (
          <ShowWeather
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedMountain={mapState.selectedMountain}
          />
        )}
        <div className=" w-[90%] flex flex-row md:flex-col items-center md:items-start gap-2">
        <p className="w-1/2 md:w-full text-left text-xs">Select Date:</p>
        <DateSelect
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          className="w-2/3 md:w-full border border-gray-400 rounded px-2 py-1"
        />
      </div>
      </div>
    </>
  );
}
