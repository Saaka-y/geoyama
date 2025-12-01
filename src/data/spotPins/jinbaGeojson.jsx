// data/spotPins/jinbaGeojson.jsx

// 陣馬山
export const jinbaGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [139.96470378835457, 37.125682960009954] // 山頂
      },
      properties: {
        icon: "mountain-icon",
        title: "Mt.Jinba",
        routeApiUrl: "",
        zoom: 14
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [139.97581886188752, 37.12982310145938] // 駐車場
      },
      properties: {
        icon: "carpark-icon",
        title: "Car Park"
      }
    }
  ]
};
