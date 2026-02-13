//@/hooks/useApplyFilter.js
import { useEffect } from "react";
import { useMountainStore } from "@/stores/mountainStore";
import { useFilterStore } from "@/stores/filterStore";
import { applyMountainFilters } from "@/utils/applyMountainFilters";

export function useApplyFilter() {
  const { allMountains, setFilteredMountains } = useMountainStore();
  const { distance, courseTime } = useFilterStore();

  useEffect(() => {
    setFilteredMountains(
      applyMountainFilters({distance, courseTime, mountains: allMountains})
    );
  }, [distance, courseTime, allMountains, setFilteredMountains]);

}