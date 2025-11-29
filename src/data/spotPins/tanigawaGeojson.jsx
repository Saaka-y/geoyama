// data/spotPins/tanigawaGeojson.jsx

// 谷川岳
export const tanigawaGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [138.92989016075813, 36.837969505311655] // 山頂
      },
      properties: {
        icon: "mountain-icon",
        title: "Summit",
        routeApiUrl: "",
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [138.96291285741043, 36.83678024439758] // 駐車場
      },
      properties: {
        icon: "carpark-icon",
        title: "Car Park"
      }
    }
  ]
};
