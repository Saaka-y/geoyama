/* eslint-disable react-hooks/exhaustive-deps */
// components/Filter.jsx

import { useEffect } from "react";
import { DateSelect } from "@/components/DateSelect"

export function Filter({ filterState, mapState, mountainState }) {
  // props
  const { distance, setDistance, courseTime, setCourseTime, selectedDate, setSelectedDate } = filterState;
  const { setMapView, initialView, selectedMountain, setSelectedMountain } = mapState;
  const { allMountains, filteredMountains, setFilteredMountains } = mountainState;



  // filter mountains
  const applyFilters = ({ distance, courseTime, allMountains }) => {
    return allMountains.filter(mountain => {
      if (distance && mountain.properties.distance > distance) return false;
      if (courseTime && mountain.properties.courseTime > courseTime) return false;
      return true;
    });
  };

  useEffect(() => {
    setFilteredMountains(
      applyFilters({ distance, courseTime, allMountains })
    );
  }, [distance, courseTime, allMountains]);


  // clear button
  const handleClearFilter = () => {
    setFilteredMountains(allMountains);
    setDistance("");
    setCourseTime("");
    setSelectedDate(null)
    setMapView(initialView);
    setSelectedMountain(null);

  }


  return (
    <>
      {/* Clear btn */}
      <button
        className="w-[90%] bg-(--select-bg) border-(--border)"
        onClick={handleClearFilter}
      >
        Clear
      </button>

      {/* Hours from Shinjuku */}
      <div className="w-[90%] flex flex-row md:flex-col items-center md:items-start  gap-2">
        <p className="w-1/2 md:w-full text-left text-xs ">Driving hours from Shinjuku:</p>
        <select
          className="w-2/3 md:w-full rounded px-2 py-1"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}>
          <option value="1">Within an hour</option>
          <option value="2">Within 2 hours</option>
          <option value="3">Within 3 hours</option>
          <option value="4">Within 4 hours</option>
          <option value="5">Over 5 hours</option>
        </select>
      </div>
      {/* Course time */}
      <div className=" w-[90%] flex flex-row md:flex-col items-center md:items-start gap-2">
        <p className="w-1/2 md:w-full text-left text-xs">Approx. Hike duration:</p>
        <select
          className="w-2/3 md:w-full rounded px-2 py-1"

          value={courseTime}
          onChange={(e) => setCourseTime(e.target.value)}
        >
          <option value="1">Less than an hour</option>
          <option value="3">Less than 3 hours</option>
          <option value="5">Less than 5 hours</option>
          <option value="7">Less than 7 hours</option>
        </select>
      </div>
       {/* Date */}
      <div className=" w-[90%] flex flex-row md:flex-col items-center md:items-start gap-2">
        <p className="w-1/2 md:w-full text-left text-xs">Select Date:</p>
        <DateSelect
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          className="w-2/3 md:w-full border border-gray-400 rounded px-2 py-1"
        />
      </div>
      {/* show alert when no mountains being matched */}
      {filteredMountains.length === 0 && (<p className="m-1 px-1 text-red-500">No mountains match the filter</p>)}
    </>
  );
}