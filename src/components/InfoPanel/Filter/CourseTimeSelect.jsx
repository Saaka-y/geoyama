// components/InfoPanel/Filter/CourseTimeSelect.jsx

import styles from '@/components/InfoPanel/Filter/Filter.module.css'
import { useFilterStore } from "@/stores/filterStore";


export function CourseTimeSelect() {
  const { courseTime, setCourseTime } = useFilterStore();

  return (
    <div className="bg-[var(--card-bg)] rounded-[var(--card-radius)] p-4 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow duration-300">
      <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
        Approx. Hike time
      </label>
      <select
        className={`${styles.select} w-full`}
        value={courseTime}
        onChange={(e) => setCourseTime(e.target.value)}
      >
        <option value="">Not selected</option>
        <option value="1">Less than an hour</option>
        <option value="3">Less than 3 hours</option>
        <option value="5">Less than 5 hours</option>
        <option value="7">Less than 7 hours</option>
        <option value="8">Over 7 hours</option>
      </select>
    </div>
  );
}