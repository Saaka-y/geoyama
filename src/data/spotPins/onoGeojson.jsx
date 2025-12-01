// data/spotPins/onoGeojson.jsx

//　大野山
export const onoGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates:  [139.0483163494036, 35.3874841156144] },
      properties: { 
        icon: "mountain-icon", 
        title: "Mt.Ono", 
        routeApiUrl: "", 
        zoom: 12.5,
      }
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [139.03880422376682, 35.367495243197] },
      properties: { icon: "start-icon", title: "Station" }
    }
  ]
};
