// data/spotPins/chausuGeojson.jsx


//　茶臼岳
export const chausuGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point", coordinates: [139.96470378835457, 37.125682960009954]
      },
      properties: { icon: "mountain-icon", title: "Mt.Chausu", zoom: 13.8, }
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [139.97581886188752, 37.12982310145938] }, //ルート取得次第修正
      properties: { icon: "start-icon", title: "Start" }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point", coordinates: [
          139.97581886188752, 37.12982310145938  //ルート取得次第修正
        ]
      },
      properties: {icon: "goal-icon", title: "Goal" }
    },
  ]
};
