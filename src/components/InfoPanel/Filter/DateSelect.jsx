/* eslint-disable react-hooks/set-state-in-effect */
// components/DateSelect.jsx
import { useEffect } from "react";

export function DateSelect({ selectedDate, setSelectedDate, className, dateOptions, setDateOptions }) {

  // create date options at the first rendering
  useEffect(() => {
    const today = new Date();
    const days = 5;
    const options = [];

    for (let i = 0; i <= days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const label =
        i === 0 ? "Today" :
          i === 1 ? "Tomorrow" :
            `${i} days later`;

      options.push({
        date,
        label,
        value: date.toISOString().split("T")[0], // YYYY-MM-DD
        string: date.toLocaleDateString("en-UK", {
          weekday: "short",
          month: "short",
          day: "numeric"
        })
      });
    }
    setDateOptions(options);

    if (!selectedDate) {
      setSelectedDate(options[0]);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
