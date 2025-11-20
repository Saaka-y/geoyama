// MountainInfoBox.jsx

export function MountainInfoBox({ mountain, selectedMountain }) {

  if (!selectedMountain) return null;
  if (selectedMountain.properties.description !== mountain.properties.description) {
    return null;
  }

  return (
    <div className="absolute top-0 left-full w-30 ml-2 p-2 bg-white/70 text-black rounded shadow-md z-20">
      Shinjuku to car park: {mountain.properties.distance} {mountain.properties.distance === 1 ? "hr" : "hrs"}
      <br />
      Duration to return: {mountain.properties.courseTime} {mountain.properties.courseTime === 1 ? "hr" : "hrs"}
    </div>
  )
}

