// MountainInfoBox.jsx

export function MountainInfoBox({ mountain, selectedMountain, showWeather, setShowWeather, setMapView }) {

  if (!selectedMountain) return null;
  if (selectedMountain.properties.description !== mountain.properties.description) {
    return null;
  }

  const handleShowDetail = (m) => {
      setMapView({
        latitude: m.geometry.coordinates[1],
        longitude: m.geometry.coordinates[0],
        zoom: 13,
        pitch: 60, // 3D 表示寄り
        bearing: 0
      })
      setShowWeather(true); //天気表示
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
      *All estimates. {!showWeather && <button className="underline" onClick={() => handleShowDetail(mountain)}>details</button>}
    </div>
  )
}

