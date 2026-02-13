// components/InfoPanel/Filter/DateSelectWrapper.jsx
import styles from '@/components/InfoPanel/Filter/Filter.module.css';
import { DateSelect } from "@/components/InfoPanel/Filter/DateSelect";

export function DateSelectWrapper() {

  return (
    <div className="bg-(--card-bg) rounded-(--card-radius) p-4 shadow-(--card-shadow) hover:shadow-(--card-shadow-hover) transition-shadow duration-300">
      <label className="block text-sm font-medium text-(--text-primary) mb-3">
        Select Date
      </label>
      <DateSelect
        className={`${styles.select} w-full`}
      />
    </div>
  );
}