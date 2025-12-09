// components/InfoPanel/Filter/DistanceSelect.jsx
import styles from '@/components/InfoPanel/Filter/Filter.module.css'
import { useFilterStore } from "@/stores/filterStore";
import { useIsLandscape } from "@/hooks/useIsLandscape";

export function DistanceSelect() {
  const { distance, setDistance } = useFilterStore();
  const isLandscape = useIsLandscape();

  return (
    <div className={`w-[90%] flex md:flex-col ${isLandscape && "flex-col items-start"} items-center md:items-start gap-2`}>
      <p className={`w-1/2 md:w-full ${isLandscape && "w-full"} text-left text-xs`} >Duration from Shinjuku:</p>
      <select
        className={`w-2/3 md:w-full ${styles.select} ${isLandscape && "w-full"} `}
        value={distance}
        onChange={(e) => setDistance(e.target.value)}>
        <option value="">Not selected</option>
        <option value="1">Within an hour</option>
        <option value="2">Within 2 hours</option>
        <option value="3">Within 3 hours</option>
        <option value="4">Within 4 hours</option>
        <option value="5">Over 5 hours</option>
      </select>
    </div>
  );
}