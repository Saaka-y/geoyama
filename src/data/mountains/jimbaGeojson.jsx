// data/Jimba.jsx

// 陣馬山
export const jimbaGeojson = {
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
        title: "Summit"
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
