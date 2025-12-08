// data/spotPins/tanigawaGeojson.jsx

// 谷川岳
export const tanigawaGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [138.92989016075813, 36.837969505311655]
      },
      properties: { icon: "mountain-icon", title: "Mt.Tanigawa", zoom: 12 }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [138.96291285741043, 36.83678024439758] // ルート取得次第修正
      },
      properties: {
        icon: "start-icon",
        title: "Start"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point", coordinates: [138.96291285741043, 36.83678024439758] // ルート取得次第修正
      },
      properties: { icon: "goal-icon", title: "Goal" }
    },
  ]
};
