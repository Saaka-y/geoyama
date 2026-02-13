// components/InfoPanel/Weather/WeatherDate.jsx

export function WeatherDate({ date, grouped, summit }) {

  return (
    <div className="border-b border-(--border) pb-2 mb-1">
      <p className="text-base font-semibold text-(--text-primary) text-center">
        {date}
      </p>
      {grouped[date] && grouped[date].length > 2 && (
        <p className="text-xs text-(--text-muted) text-center mt-1">
          Elevation: {summit}m
        </p>
      )}
    </div>
  );
}
