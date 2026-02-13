// components/InfoPanel/Filter/CourseTimeSelect.jsx

import styles from '@/components/InfoPanel/Filter/Filter.module.css'
import { useFilterStore } from "@/stores/filterStore";


export function CourseTimeSelect() {
  const { courseTime, setCourseTime } = useFilterStore();

  return (
    <div className="bg-(--card-bg) rounded-(--card-radius) p-5 shadow-(--card-shadow) hover:shadow-(--card-shadow-hover) transition-all duration-300 backdrop-blur-sm">
      <label className="block text-sm font-semibold text-(--text-primary) mb-3 tracking-tight">
        Hiking Duration
      </label>
      <select
        className={`${styles.select} w-full`}
        value={courseTime}
        onChange={(e) => setCourseTime(e.target.value)}
      >
        <option value="">Select duration</option>
        <option value="1">Under 1 hour</option>
        <option value="3">Under 3 hours</option>
        <option value="5">Under 5 hours</option>
        <option value="7">Under 7 hours</option>
        <option value="8">7+ hours</option>
      </select>
    </div>
  );
}