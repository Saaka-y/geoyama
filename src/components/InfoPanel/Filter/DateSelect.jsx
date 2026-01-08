// components/InfoPanel/Filter/DateSelect.jsx
import { useFilterStore } from "@/stores/filterStore";

export function DateSelect({ className, onSelect }) {
  const { selectedDate, setSelectedDate, dateOptions } = useFilterStore();

  const handleDateSelect = (e) => {
    const selected = dateOptions.find(opt => opt.value === e.target.value);
    setSelectedDate(selected);
    if (onSelect) onSelect();
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
