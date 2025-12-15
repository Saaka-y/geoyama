// components/InfoPanel/Filter/CourseTimeSelect.jsx
"use client"
import styles from '@/components/InfoPanel/Filter/Filter.module.css'
import { useFilterStore } from "@/stores/filterStore";


export function CourseTimeSelect() {
  const { courseTime, setCourseTime } = useFilterStore();

  return (
  <div className="w-[90%] flex gap-2 items-center flex-row md:flex-col md:items-start landscape:flex-col landscape:items-start">
    <p className="text-left text-xs w-1/2 md:w-full landscape:w-full">
      Approx. Hike time:
    </p>

    <select
      className={`${styles.select} w-2/3 md:w-full landscape:w-full`}
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