// MountainInfoBox.jsx

export function MountainInfoBox({ mountain, selectedMountain }) {

  if (!selectedMountain) return null;
  if (selectedMountain.properties.description !== mountain.properties.description) {
    return null;
  }

  return (
    <div className="absolute top-0 left-full w-42 ml-2 p-2 bg-white/70 text-black rounded shadow-md z-20">
      <span className="font-bold">{mountain.properties.title} ({mountain.properties.summit}m) </span>
      <span className="italic">{mountain.properties.routeName && `- ${mountain.properties.routeName} `}</span>
      <br />
      Shinjuku to car park: {mountain.properties.distance} {mountain.properties.distance === 1 ? "hr" : "hrs"}
      <br />
      Return walk time: {mountain.properties.courseTime} {mountain.properties.courseTime === 1 ? "hr" : "hrs"}
      <br />
      Elevation gain: {mountain.properties.elevation}m
      <br />
      *All estimates. More datails
    </div>
  )
}

