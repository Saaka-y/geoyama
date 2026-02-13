// components/InfoPanel/Weather/WeatherDate.jsx

export function WeatherDate({ date, grouped, summit }) {

  return (
    <div className="border-b border-(--border) pb-2.5 mb-2">
      <p className="text-base font-bold text-(--text-primary) text-center tracking-tight">
        {date}
      </p>
      {grouped[date] && (
        <p className="text-xs font-medium text-(--text-muted) text-center mt-1.5">
          Summit: {summit}m
        </p>
      )}
    </div>
  );
}
