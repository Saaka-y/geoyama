// components/InfoPanel/Filter/DateSelect.jsx
import { useFilterStore } from "@/stores/filterStore";
import { useGetDateOptions } from "@/hooks/useGetDateOptions";

export function DateSelect({ className }) {
  useGetDateOptions();
  const { dateOptions } = useFilterStore();
  const { selectedDate, setSelectedDate } = useFilterStore();

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
