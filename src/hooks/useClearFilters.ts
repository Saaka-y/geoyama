//@/hooks/useClearFilters.js
import { useFilterStore } from "@/stores/filterStore";
import { useMountainStore } from "@/stores/mountainStore";
import { DateOption } from "@/utils/createDateOptions";

export function useClearFilters() {
  const { setDistance, setCourseTime, setSelectedDate } = useFilterStore();
  const { allMountains, setFilteredMountains, setSelectedMountain } = useMountainStore();

  const clearFilter = (initialDateOption: DateOption | null) => {
    setDistance("");
    setCourseTime("");
    setSelectedDate(initialDateOption);
    setFilteredMountains(allMountains);
    setSelectedMountain(null);
  }

  return { clearFilter };
}