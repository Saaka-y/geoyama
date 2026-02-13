// components/InfoPanel/Filter/DistanceSelect.jsx
import styles from '@/components/InfoPanel/Filter/Filter.module.css'

import { useFilterStore } from "@/stores/filterStore";

export function DistanceSelect() {
  const { distance, setDistance } = useFilterStore();

  return (
    <div className="bg-(--card-bg) rounded-(--card-radius) p-4 shadow-(--card-shadow) hover:shadow-(--card-shadow-hover) transition-shadow duration-300">
      <label className="block text-sm font-medium text-(--text-primary) mb-3">
        Duration from Shinjuku
      </label>
      <select
        className={`${styles.select} w-full`}
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