// data/spotPins/onoGeojson.jsx

//　大野山
export const onoGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [139.0483163494036, 35.3874841156144] },
      properties: { icon: "mountain-icon", title: "Mt.Ono", zoom: 12.5 }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point", coordinates: [
          139.042054303433,
          35.369064944455125,
          208.2781052319333
        ]
      },
      properties: { icon: "start-icon", title: "Start" }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point", coordinates: [
          139.0735192678329,
          35.359897504099045,
          114.13333857152611
        ]
      },
      properties: { icon: "goal-icon", title: "Goal" }
    },
  ]
};
