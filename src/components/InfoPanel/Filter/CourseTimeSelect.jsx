// components/InfoPanel/Filter/CourseTimeSelect.jsx
import styles from '@/components/InfoPanel/Filter/Filter.module.css'
import { useFilterStore } from "@/stores/filterStore";
import { useIsLandscape } from "@/hooks/useIsLandscape";


export function CourseTimeSelect() {
  const { courseTime, setCourseTime } = useFilterStore();
  const isLandscape = useIsLandscape();

  return (
    <div className={`w-[90%] flex md:flex-col ${isLandscape && "flex-col items-start"} items-center md:items-start gap-2`}>
      <p className={`w-1/2 md:w-full ${isLandscape && "w-full"} text-left text-xs`}>Approx. Hike time:</p>
      <select
        className={`w-2/3 md:w-full ${styles.select} ${isLandscape && "w-full"} `}

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