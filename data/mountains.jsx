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
        courseTime: 2.5,
        routeName: "",
        elevation: 454,
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
        courseTime: 3.5,
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
        courseTime: 6.5,
        routeName: "Yadorigi start",
        elevation: 1265,
        summit: 1272,
        routeApiUrl: "/api/nabewariGeoJson"
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
        courseTime: 4.5,
        routeName: "Kintoki shrine loop",
        elevation: 539,
        summit: 1213,
        routeApiUrl: "/api/kintokiGeoJson"
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [138.624997434027, 35.87344715198021], 
      },
      properties: {
        title: 'Mt.Kinpu',
        description: 'Mount Kinpu',
        distance: 3,
        courseTime: 4.5,
        routeName: "Odarumi pass start",
        elevation: 538,
        summit: 2599,
        routeApiUrl: "/api/kinpuGeoJson"
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [139.49109834098047, 36.767387231585836]
      },
      properties: {
        title: 'Nantai-san',
        description: 'Mount Nantai',
        distance: 2.5,
        courseTime: 7,
        routeName: "",
        elevation: 1230,
        summit: 2486,
        routeApiUrl: ""
      }
    },
  ]
};
