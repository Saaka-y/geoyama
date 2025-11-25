// data/mountains.jsx


export const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [139.9629289, 37.1248415]
      },
      properties: {
        title: 'Mt.Chausu',
        description: 'Mount Chausu',
        distance: 3.5,
        courseTime: 3,
        routeName: "",
        elevation: 450,
        summit: 1915,
        routeApiUrl: ""
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [138.9303258224096, 36.83582764641854]
      },
      properties: {
        title: 'Mt.Tanigawa',
        description: 'Mount Tanigawa',
        distance: 2.4,
        courseTime: 4.5,
        routeName: "Tenjin-ridge return",
        elevation: 719,
        summit: 1977,
        routeApiUrl: ""
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [139.166601, 35.652254]
      },
      properties: {
        title: 'Mt.Jimba',
        description: 'Mount Jimba',
        distance: 1.5,
        courseTime: 5,
        routeName: "Tochiya-ridge return",
        elevation: 764,
        summit: 854,
        routeApiUrl: ""
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [139.14161914045997, 35.445043691827536]
      },
      properties: {
        title: 'Mt.Nabewari',
        description: 'Mount Nabewari',
        distance: 2,
        courseTime: 7.5,
        routeName: "Yadorigi start",
        elevation: 1332,
        summit: 1272,
        routeApiUrl: ""
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [139.00452128748336, 35.29100532254763]
      },
      properties: {
        title: 'Mt.Kintoki',
        description: 'Mount Kintoki',
        distance: 2.5,
        courseTime: 3.5,
        routeName: "Kintoki shrine loop",
        elevation: 651,
        summit: 1213,
        routeApiUrl: "/api/kintokiGeoJson"
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [138.8289016391101, 35.5275878479893]
      },
      properties: {
        title: 'Mt.Kinpu',
        description: 'Mount Kinpu',
        distance: 3.25,
        courseTime: 4.5,
        routeName: "Odarumi pass start",
        elevation: 570,
        summit: 2599,
        routeApiUrl: ""
      }
    },
  ]
};
