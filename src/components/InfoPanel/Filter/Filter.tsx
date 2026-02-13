// components/InfoPanel/Filter/Filter.jsx
import { useMapUiStore } from "@/stores/mapUiStore";
import { useMountainStore } from "@/stores/mountainStore";
import { useFilterStore } from "@/stores/filterStore";
import { useClearFilters } from "@/hooks/useClearFilters";
import { useApplyFilter } from '@/hooks/useApplyFilter';
import { DistanceSelect } from '@/components/InfoPanel/Filter/DistanceSelect';
import { CourseTimeSelect } from '@/components/InfoPanel/Filter/CourseTimeSelect';
import { DateSelectWrapper } from '@/components/InfoPanel/Filter/DateSelectWrapper';
import { ClearButton } from '@/components/InfoPanel/Filter/ClearButton';

export function Filter({ japanMapRef }) {

  const { japanMapInitialView } = useMapUiStore();
  const { dateOptions } = useFilterStore();
  const { filteredMountains } = useMountainStore();
  const { clearFilter } = useClearFilters();
  useApplyFilter();


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
    <div className="flex flex-col items-center gap-6 px-4 py-2 pt-8 md:pt-12 landscape:pt-12">
      {/* Header */}
      <div className="w-full max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold text-(--text-primary) mb-2 tracking-tight">
          Find Your Mountain
        </h1>
        <p className="text-base text-(--text-secondary) leading-relaxed">
          Discover hiking trails by distance, duration, and weather conditions
        </p>
      </div>

      {filteredMountains.length === 0 && (
        <div className="w-full max-w-md bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-medium text-red-700">No mountains match your filters. Try adjusting your criteria.</p>
        </div>
      )}

      {/* Filter Cards */}
      <div className="w-full max-w-md flex flex-col gap-3">
        <DistanceSelect />
        <CourseTimeSelect />
        <DateSelectWrapper />
      </div>

      <ClearButton onClear={handleClearFilter} />
    </div>
  );
}