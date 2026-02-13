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
    <div className="flex flex-col items-center gap-4 px-4 py-2 pt-6 md:pt-10 landscape:pt-10">
      {/* Header */}
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold text-(--text-primary) mb-2">
          Find Your Mountain
        </h2>
        <p className="text-sm text-(--text-secondary)">
          Filter mountains by distance, hike time, and weather
        </p>
      </div>

      {filteredMountains.length === 0 && (
        <div className="w-full max-w-md bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">No mountains match the filter</p>
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