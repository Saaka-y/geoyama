// components/InfoPanel/Filter/DateSelectWrapper.jsx
import styles from '@/components/InfoPanel/Filter/Filter.module.css';
import { useIsMd } from '@/hooks/useIsMd';
import { useIsLandscape } from "@/hooks/useIsLandscape";
import { DateSelect } from "@/components/InfoPanel/Filter/DateSelect";

export function DateSelectWrapper() {
  const isMd = useIsMd();
  const isLandscape = useIsLandscape();

  return (
    <>
      {/* Date select */}
      <div className={`
        w-[90%] flex justify-center gap-2
        ${isMd || isLandscape ? "flex-col items-start" : "flex-row items-center"}
      `}>

        <p className={`${isMd || isLandscape ? "w-full" : "w-1/2"} text-left text-xs`}>Select Date:</p>

        <DateSelect
          className={`${styles.select} ${isMd || isLandscape ? "w-full" : "w-2/3"} `}
        />
      </div>
    </>
  );
}