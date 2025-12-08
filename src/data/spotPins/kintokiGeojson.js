// data/spotPins/kintokiGeojson.jsx

// 金時山
export const kintokiGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [139.00490776875867, 35.29128729757679] },
      properties: { icon: "mountain-icon", title: "Mt.Kintoki", zoom: 13.5 }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point", coordinates: [
          139.00988655527547,
          35.27561321899243,
          668.5409434731147
        ]
      },
      properties: { icon: "start-icon", title: "Start" }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point", coordinates: [
          139.00236818507105,
          35.27840207154606,
          676.7348522990942
        ]
      },
      properties: { icon: "goal-icon", title: "Goal" }
    },
  ]
};
