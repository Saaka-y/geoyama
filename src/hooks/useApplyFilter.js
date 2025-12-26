//@/hooks/useApplyFilter.js
import { useEffect } from "react";
import { useMountainStore } from "@/stores/mountainStore";
import { useFilterStore } from "@/stores/filterStore";
import { applyMoutnainFilters } from "@/utils/applyMountainFilters";

export function useApplyFilter() {
  const { allMountains, setFilteredMountains } = useMountainStore();
  const { distance, courseTime } = useFilterStore();

  useEffect(() => {
    setFilteredMountains(
      applyMoutnainFilters(distance, courseTime, allMountains)
    );
  }, [distance, courseTime, allMountains, setFilteredMountains]);

  return { applyMoutnainFilters };
}