// @/data/spotPins/nantaiGeojson.jsx

//　男体山
export const nantaiGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [139.4907250423291, 36.766102722061035] },
      properties: {
        icon: "mountain-icon",
        title: "Mt.Nantai",
        routeApiUrl: "nantaiGeoJson",
        zoom: 13
      }
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [139.48799315790674, 36.741902686946624] },
      properties: { icon: "carpark-icon", title: "Car Park" }
    }
  ]
};
