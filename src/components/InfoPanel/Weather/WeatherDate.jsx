// components/InfoPanel/Weather/WeatherDate.jsx

export function WeatherDate({ date, grouped, summit }) {

  return (
    <div className="border-b border-[var(--border)] pb-2 mb-1">
      <p className="text-base font-semibold text-[var(--text-primary)] text-center">
        {date}
      </p>
      {grouped[date] && grouped[date].length > 2 && (
        <p className="text-xs text-[var(--text-muted)] text-center mt-1">
          Elevation: {summit}m
        </p>
      )}
    </div>
  );
}
