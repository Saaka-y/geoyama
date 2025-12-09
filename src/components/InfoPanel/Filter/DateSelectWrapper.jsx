// components/InfoPanel/Filter/DateSelectWrapper.jsx
import styles from '@/components/InfoPanel/Filter/Filter.module.css'
import { useMountainStore } from "@/stores/mountainStore";
import { useIsLandscape } from "@/hooks/useIsLandscape";
import { DateSelect } from "@/components/InfoPanel/Filter/DateSelect";


export function DateSelectWrapper() {
  const { filteredMountains } = useMountainStore();
  const isLandscape = useIsLandscape();

  return (
    <>
      {/* Date select */}
      <div className={`
        w-[90%] flex md:flex-col justify-center items-center md:items-start gap-2
        ${isLandscape && "flex-col items-start"}
      `}>

        <p className={`w-1/2 md:w-full ${isLandscape && "w-full"} text-left text-xs`}>Select Date:</p>

        <DateSelect
          className={`${styles.select} w-2/3 md:w-full ${isLandscape && "w-full"} `}
        />
      </div>
    </>
  );
}