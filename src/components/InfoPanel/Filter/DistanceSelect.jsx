// components/InfoPanel/Filter/DistanceSelect.jsx
import styles from '@/components/InfoPanel/Filter/Filter.module.css'
import { useFilterStore } from "@/stores/filterStore";

export function DistanceSelect() {
  const { distance, setDistance } = useFilterStore();

  return (
    <div className="w-[90%] flex md:flex-col md:items-start landscape:flex-col landscape:items-start flex-row items-center gap-2">
      <p className="w-1/2 md:w-full landscape:w-full text-left text-xs" >Duration from Shinjuku:</p>
      <select
        className={`${styles.select} w-2/3 md:w-full landscape:w-full`}
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