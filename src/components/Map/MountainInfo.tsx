//components/Map/MountainInfo.jsx
import { useMountainStore } from "@/stores/mountainStore";

export function MountainInfo() {
  const { selectedMountain } = useMountainStore();
  
  if (!selectedMountain) return null;

  const { title, summit, routeName, carPark, station, distance, courseTime, elevation } = selectedMountain.properties;

  return (
    <div className="text-xs text-white" style={{ fontFamily: 'Roboto' }}>
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
      : <span className="text-sm">{distance}</span> {distance === 1 ? "hr" : "hrs"}
      <br />
      Total hike time: <span className="text-sm">{courseTime}</span> {courseTime === 1 ? "hr" : "hrs"}
      <br />
      Elevation gain: <span className="text-sm">{elevation}</span> m
    </div>
  );
}
