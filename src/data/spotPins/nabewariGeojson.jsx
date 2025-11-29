// data/spotPins/nabewariGeojson.jsx

//　鍋割山
export const nabewariGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [139.14178132960086, 35.44431802028864] },
      properties: {
        icon: "mountain-icon",
        title: "Mt.Nabewari",
        routeApiUrl: "nabewariGeoJson",
      }
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [139.13779380571876, 35.401821833908905] },
      properties: { icon: "carpark-icon", title: "Car Park" }
    }
  ]
};