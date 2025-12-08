// data/spotPins/nabewariGeojson.jsx

//　鍋割山
export const nabewariGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [139.14178132960086, 35.44431802028864] },
      properties: { icon: "mountain-icon", title: "Mt.Nabewari", zoom: 12 }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point", coordinates: [
          139.14101957231105,
          35.402304841845215,
          347.71192303871504
        ]
      },
      properties: { icon: "start-icon", title: "Start" }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point", coordinates: [
          139.13875663159303,
          35.40138447297568,
          292.68307776004076
        ]
      },
      properties: { icon: "goal-icon", title: "Goal" }
    },
  ]
};