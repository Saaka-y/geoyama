//@/hooks/useClearFilters.js
import { useFilterStore } from "@/stores/filterStore";
import { useMountainStore } from "@/stores/mountainStore";

export function useClearFilters() {
  const { setDistance, setCourseTime, setSelectedDate } = useFilterStore();
  const { allMountains, setFilteredMountains, setSelectedMountain } = useMountainStore();

  const clearFilter = (initialDateOption) => {
    setDistance("");
    setCourseTime("");
    setSelectedDate(initialDateOption);
    setFilteredMountains(allMountains);
    setSelectedMountain(null);
  }

  return { clearFilter };
}