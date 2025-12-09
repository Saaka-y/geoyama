//@/hooks/useApplyFilter.js
import { useEffect } from "react";
import { useMountainStore } from "@/stores/mountainStore";
import { useFilterStore } from "@/stores/filterStore";

export function useApplyFilter() {
  const { allMountains, setFilteredMountains } = useMountainStore();
  const { distance, courseTime } = useFilterStore();

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

  return { applyFilters };
}