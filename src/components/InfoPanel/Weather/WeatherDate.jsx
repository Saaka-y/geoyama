// components/InfoPanel/Weather/WeatherDate.jsx

export function WeatherDate({ date, grouped, summit }) {

  return (
    <p className="text-sm font-bold text-center mb-2 ">
      {date}<span className="text-gray-400 text-xs"> {grouped[date] && grouped[date].length > 2 ? ` - Temp: (${summit}m)` : ""}</span>
    </p>
  );
}
