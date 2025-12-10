// components/InfoPanel/Filter/Filter.jsx
import { useMapUiStore } from "@/stores/mapUiStore";
import { useMountainStore } from "@/stores/mountainStore";
import { useFilterStore } from "@/stores/filterStore";
import { useIsMd } from "@/hooks/useIsMd";
import { useIsLandscape } from "@/hooks/useIsLandscape";
import { useClearFilter } from "@/hooks/useClearFilter";
import { useApplyFilter } from '@/hooks/useApplyFilter';
import { DistanceSelect } from '@/components/InfoPanel/Filter/DistanceSelect';
import { CourseTimeSelect } from '@/components/InfoPanel/Filter/CourseTimeSelect';
import { DateSelectWrapper } from '@/components/InfoPanel/Filter/DateSelectWrapper';
import { ClearButton } from '@/components/InfoPanel/Filter/ClearButton';

export function Filter({ japanMapRef }) {

  const { japanMapInitialView } = useMapUiStore();
  const { dateOptions } = useFilterStore();
  const { filteredMountains } = useMountainStore();
  const isMd = useIsMd();
  const isLandscape = useIsLandscape();
  const { clearFilter } = useClearFilter();
  const { applyFilters } = useApplyFilter();


  //**************************/
  // Clear button  /
  //**************************/
  const handleClearFilter = () => {
    clearFilter(dateOptions[0]);

    if (japanMapRef?.current) {
      japanMapRef.current.flyTo({
        ...japanMapInitialView,
      })
    }
  }

  return (
    <div className={` flex flex-col ${isMd || isLandscape ? "pt-10" : "pt-4"} items-center gap-5`}>
      {filteredMountains.length === 0 && (<p className="m-1 px-1 text-red-500">No mountains match the filter</p>)}
      <DistanceSelect />
      <CourseTimeSelect />
      <DateSelectWrapper />
      <ClearButton onClear={handleClearFilter} />
    </div>
  );
}