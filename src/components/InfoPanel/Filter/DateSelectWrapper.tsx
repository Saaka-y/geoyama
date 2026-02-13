// components/InfoPanel/Filter/DateSelectWrapper.jsx
import styles from '@/components/InfoPanel/Filter/Filter.module.css';
import { DateSelect } from "@/components/InfoPanel/Filter/DateSelect";

export function DateSelectWrapper() {

  return (
    <div className="bg-(--card-bg) rounded-(--card-radius) p-5 shadow-(--card-shadow) hover:shadow-(--card-shadow-hover) transition-all duration-300 backdrop-blur-sm">
      <label className="block text-sm font-semibold text-(--text-primary) mb-3 tracking-tight">
        Hiking Date
      </label>
      <DateSelect
        className={`${styles.select} w-full`}
      />
    </div>
  );
}