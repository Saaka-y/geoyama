import { useState, useEffect } from "react";

export function DateSelect({ selectedDate, setSelectedDate }) {

  const [dateOptions, setDateOptions] = useState([]);

  // 初回レンダー時に選択肢を生成
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
        value: date.toISOString().split("T")[0]
      });
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDateOptions(options);
  }, []);

  // 日付を選んだ時
  const handleDateSelect = (e) => {
    const selected = dateOptions.find(opt => opt.value === e.target.value);
    setSelectedDate(selected);
  };

  return (
    <select
      value={selectedDate?.value || ""}
      onChange={handleDateSelect}
      className="m-1"
    >
      <option value="">Select a date</option>

      {dateOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label} ({opt.date.toDateString()})
        </option>
      ))}
    </select>
  );
}
