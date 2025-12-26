// components/InfoPanel/Filter/DateSelect.jsx
import { useEffect } from "react";
import { useFilterStore } from "@/stores/filterStore";

export function DateSelect({ className }) {
  const { selectedDate, setSelectedDate, dateOptions, initDateOptions } = useFilterStore();

  useEffect(() => {
    initDateOptions();
  }, [initDateOptions]);

  const handleDateSelect = (e) => {
    const selected = dateOptions.find(opt => opt.value === e.target.value);
    setSelectedDate(selected);
  };


  return (
    <select
      value={selectedDate?.value || ""}
      onChange={handleDateSelect}
      className={className}
    >
      {dateOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label} ({opt.string})
        </option>
      ))}
    </select>
  );
}
