// components/InfoPanel/Filter/DateSelectWrapper.jsx
import styles from '@/components/InfoPanel/Filter/Filter.module.css';
import { DateSelect } from "@/components/InfoPanel/Filter/DateSelect";

export function DateSelectWrapper() {

  return (
    <div className="bg-[var(--card-bg)] rounded-[var(--card-radius)] p-4 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow duration-300">
      <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
        Select Date
      </label>
      <DateSelect
        className={`${styles.select} w-full`}
      />
    </div>
  );
}