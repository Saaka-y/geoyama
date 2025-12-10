// components/InfoPanel/Filter/CourseTimeSelect.jsx
import styles from '@/components/InfoPanel/Filter/Filter.module.css'
import { useFilterStore } from "@/stores/filterStore";
import { useIsMd } from '@/hooks/useIsMd';
import { useIsLandscape } from "@/hooks/useIsLandscape";


export function CourseTimeSelect() {
  const { courseTime, setCourseTime } = useFilterStore();
  const isMd = useIsMd();
  const isLandscape = useIsLandscape();

  return (
    <div className={`w-[90%] flex ${ isMd || isLandscape? "flex-col items-start" : "flex-row"} items-center gap-2`}>
      <p className={`${isMd || isLandscape ? "w-full" : "w-1/2"} text-left text-xs`}>Approx. Hike time:</p>
      <select
        className={`${styles.select} ${isMd || isLandscape ? "w-full" : "w-2/3"} `}

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
  );
}