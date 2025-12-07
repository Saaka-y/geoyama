// components/Filter.jsx

import { useEffect } from "react";
import { useUiStore } from "@/stores/uiStore";
import { useFilterStore } from "@/stores/filterStore";
import { useMountainStore } from "@/stores/mountainStore";


export function Filter({ japanMapRef }) {

  const japanMapInitialView = useUiStore((state) => state.japanMapInitialView);
  const { distance, courseTime, setDistance, setCourseTime, setSelectedDate, } = useFilterStore();
  const { allMountains, filteredMountains, setFilteredMountains, setSelectedMountain } = useMountainStore();


  //**************************/
  // Filter function  /
  //**************************/
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


  //**************************/
  // Clear button  /
  //**************************/
  const handleClearFilter = () => {
    setFilteredMountains(allMountains);
    setDistance("");
    setCourseTime("");
    setSelectedDate(null)
    setSelectedMountain(null);
    setSelectedDate(dateOptions[0]);

    japanMapRef.current.flyTo({
      ...japanMapInitialView,
    })
  }

  // ****** parent div ******
  // `flex-1 bg-(--color-surface)` +
  //   ` flex flex-col pt-6 md:pt-10 items-center gap-5`

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
      <div className="w-[90%] flex flex-row md:flex-col items-center md:items-start gap-2">
        <p className="w-1/2 md:w-full text-left text-xs ">Duration from Shinjuku:</p>
        <select
          className="w-2/3 md:w-full rounded px-2 py-1"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}>
          <option value="">Not selected</option>
          <option value="1">Within an hour</option>
          <option value="2">Within 2 hours</option>
          <option value="3">Within 3 hours</option>
          <option value="4">Within 4 hours</option>
          <option value="5">Over 5 hours</option>
        </select>
      </div>
      {/* Course time */}
      <div className=" w-[90%] flex flex-row md:flex-col items-center md:items-start gap-2">
        <p className="w-1/2 md:w-full text-left text-xs">Approx. Hike time:</p>
        <select
          className="w-2/3 md:w-full rounded px-2 py-1"

          value={courseTime}
          onChange={(e) => setCourseTime(e.target.value)}
        >
          <option value="">Not selected</option>
          <option value="1">Less than an hour</option>
          <option value="3">Less than 3 hours</option>
          <option value="5">Less than 5 hours</option>
          <option value="7">Less than 7 hours</option>
          <option value="7">Over 7 hours</option>
        </select>
      </div>
      {/* show alert when no mountains being matched */}
      {filteredMountains.length === 0 && (<p className="m-1 px-1 text-red-500">No mountains match the filter</p>)}
    </>
  );
}