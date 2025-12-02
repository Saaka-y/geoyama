//components/Map/MountainInfo.jsx

export function MountainInfo({ selectedMountain }) {
  if (!selectedMountain) return null;

  const { title, summit, routeName, carPark, station, distance, courseTime, elevation } = selectedMountain.properties;

  return (
    <div>
      <span className="font-bold">{title} ({summit}m)</span>
      <span className="italic">{routeName ? ` - ${routeName}` : ""}</span>
      <br />
      Shinjuku to{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href={carPark ? carPark : station}
        className="underline"
      >
        {carPark ? "car park" : "station"}
      </a>
      : {distance} {distance === 1 ? "hr" : "hrs"}
      <br />
      Total hike time: {courseTime} {courseTime === 1 ? "hr" : "hrs"}
      <br />
      Elevation gain: {elevation}m
    </div>
  );
}
