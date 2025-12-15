// components/InfoPanel/Filter/DateSelectWrapper.jsx
import styles from '@/components/InfoPanel/Filter/Filter.module.css';
import { DateSelect } from "@/components/InfoPanel/Filter/DateSelect";

export function DateSelectWrapper() {

  return (
    <div
      className="
        w-[90%] flex gap-2 justify-center
        flex-row items-center
        md:flex-col md:items-start
        landscape:flex-col landscape:items-start
      "
    >
      <p
        className="
          text-left text-xs
          w-1/2
          md:w-full
          landscape:w-full
        "
      >
        Select Date:
      </p>

      <DateSelect
        className={`
          ${styles.select}
          w-2/3
          md:w-full
          landscape:w-full
        `}
      />
    </div>
  );
}