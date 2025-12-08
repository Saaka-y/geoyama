// components/InfoPanel/DateSelect.jsx
import { useFilterStore } from "@/stores/filterStore";
import { useGetDateOptions } from "@/hooks/useGetDateOptions";


export function DateSelect({ className }) {
  const { selectedDate, setSelectedDate } = useFilterStore();
  const { dateOptions } = useGetDateOptions();

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
