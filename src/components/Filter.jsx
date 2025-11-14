// Filter.jsx

import { useEffect } from "react";
import { DateSelect } from "@/components/DateSelect"

export function Filter({ filterState, mapState, mountainState }) {
  // props
  const { distance, setDistance, courseTime, setCourseTime, selectedDate, setSelectedDate } = filterState;
  const { setMapView, initialView, selectedMountain, setSelectedMountain } = mapState;
  const { allMountains, filteredMountains, setFilteredMountains } = mountainState;

  // filtered mountains
  useEffect(() => {
    let filtered = allMountains;

    if (distance) {
      filtered = filtered.filter(
        (mountain) => mountain.properties.distance <= parseInt(distance)
      );
    }

    if (courseTime) {
      filtered = filtered.filter(
        (mountain) => mountain.properties.courseTime <= parseInt(courseTime)
      );
    }

    setFilteredMountains(filtered);
  }
    , [distance, courseTime]);


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
    <div className="p-6 md:p-8 mt-2 flex flex-col justify-start md:justify-start gap-4 bg-(var(--color-surface)) w-full md:w-1/3 h-1/3 md:h-full text-md md:text-xl">
      <select
        className="m-1"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}>
        <option value="">Distance from Tokyo</option>
        <option value="1">Within an hour</option>
        <option value="2">Within 2 hours</option>
        <option value="3">Within 3 hours</option>
        <option value="4">Within 4 hours</option>
        <option value="5">Over 5 hours</option>
      </select>

      <select
        className="m-1"
        value={courseTime}
        onChange={(e) => setCourseTime(e.target.value)}
      >
        <option value="">Hike duration</option>
        <option value="1">Less than an hour</option>
        <option value="3">Less than 3 hours</option>
        <option value="5">Less than 5 hours</option>
        <option value="7">Less than 7 hours</option>
      </select>

      <DateSelect
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* show alert when no mountains being matched */}
      {filteredMountains.length <= 0 ? <p className="m-1 px-1 text-red-500">No mountains match the filter</p> : ""}

      <button
        className="m-1 px-2 bg-white"
        onClick={handleClearFilter}
      >
        Clear
      </button>
    </div>
  );
}
