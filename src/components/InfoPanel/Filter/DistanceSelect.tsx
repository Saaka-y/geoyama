// components/InfoPanel/Filter/DistanceSelect.jsx
import styles from '@/components/InfoPanel/Filter/Filter.module.css'

import { useFilterStore } from "@/stores/filterStore";

export function DistanceSelect() {
  const { distance, setDistance } = useFilterStore();

  return (
    <div className="bg-(--select-el-bg) rounded-(--card-radius) p-5 shadow-(--card-shadow) hover:shadow-(--card-shadow-hover) transition-all duration-300 backdrop-blur-sm">
      <label className="block text-sm font-semibold text-(--select-bg) mb-3 tracking-tight">
        Distance from Shinjuku
      </label>
      <select
        className={`${styles.select} w-full`}
        value={distance}
        onChange={(e) => setDistance(e.target.value)}>
        <option value="">Select duration</option>
        <option value="1">Within 1 hour</option>
        <option value="2">Within 2 hours</option>
        <option value="3">Within 3 hours</option>
        <option value="4">Within 4 hours</option>
        <option value="5">Over 5 hours</option>
      </select>
    </div>
  );
}