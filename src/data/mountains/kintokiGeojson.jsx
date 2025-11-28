// data/mountains/kintokiGeojson.jsx

// 金時山
export const kintokiGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [139.00490776875867, 35.29128729757679] },
      properties: {
        icon: "mountain-icon",
        title: "Mt.Kintoki",
        routeApiUrl: "kintokiGeoJson",
      }
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [139.00254682976754, 35.278273848045835] },
      properties: { icon: "carpark-icon", title: "Car Park" }
    }
  ]
};
