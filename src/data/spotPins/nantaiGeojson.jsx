// @/data/spotPins/nantaiGeojson.jsx

//　男体山
export const nantaiGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point", coordinates: [139.4907250423291, 36.766102722061035]
      },
      properties: { icon: "mountain-icon", title: "Mt.Nantai", zoom: 12.5 }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point", coordinates: [
          139.48698958610385,
          36.74106691808819,
          1280.2163307283151
        ]
      },
      properties: { icon: "start-icon", title: "Start" }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point", coordinates: [
          139.48702123929226,
          36.741038645714,
          1272.4315861109644
        ]
      },
      properties: {icon: "goal-icon", title: "Goal"}
    },
  ]
};
