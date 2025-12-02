// data/spotPins/kinpuGeojson.jsx

// 金峰山
export const kinpuGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [138.62557411143555, 35.87264656520422] },
      properties: { icon: "mountain-icon", title: "Mt.Kinpu", zoom: 12.5 }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point", coordinates: [
          138.6634787412866,
          35.87283944161615,
          2369.5395848080516
        ]
      },
      properties: { icon: "start-icon", title: "Start" }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point", coordinates: [
          138.66289018923464,
          35.871587799599304,
          2355.408119443804
        ]
      },
      properties: { icon: "goal-icon", title: "Goal" }
    },
  ]
};
