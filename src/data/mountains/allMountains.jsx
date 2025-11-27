// data/mountains/allMountains.jsx

// all mountains
export const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [139.96470378835457, 37.125682960009954],
      },
      properties: {
        title: 'Mt.Chausu',
        description: 'Mount Chausu',
        distance: 3.5,
        courseTime: 2.5,
        routeName: "",
        elevation: 454,
        summit: 1915,
        carPark: "https://maps.app.goo.gl/dVs1xtc3kr4egp6o9",
        routeApiUrl: "",
        carParkCoordinates: [139.97581886188752, 37.12982310145938], 
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [138.92989016075813, 36.837969505311655],
      },
      properties: {
        title: 'Mt.Tanigawa',
        description: 'Mount Tanigawa',
        distance: 2.4,
        courseTime: 4.5,
        routeName: "Tenjin-ridge return",
        elevation: 719,
        summit: 1977,
        carPark: "https://maps.app.goo.gl/5pwpRYddrjCo44GA9",
        routeApiUrl: "",
        carParkCoordinates: [138.96291285741043, 36.83678024439758], 
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [139.1664777423291, 35.65269336784197],
      },
      properties: {
        title: 'Mt.Jimba',
        description: 'Mount Jimba',
        distance: 1.25,
        courseTime: 3.5,
        routeName: "Tochiya-ridge return",
        elevation: 649,
        summit: 854,
        carPark: "https://maps.app.goo.gl/XSUQ3T1R18RFDWjm9",
        routeApiUrl: "",
        carParkCoordinates: [139.14365400503866, 35.631750255656875],
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [139.14178132960086, 35.44431802028864],
      },
      properties: {
        title: 'Mt.Nabewari',
        description: 'Mount Nabewari',
        distance: 1.5,
        courseTime: 6.5,
        routeName: "Yadorigi start",
        elevation: 1265,
        summit: 1272,
        carPark: "https://maps.app.goo.gl/bftoUSya6pZRyHeX6",
        routeApiUrl: "/api/nabewariGeoJson",
        carParkCoordinates: [139.13779380571876, 35.401821833908905], 
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [139.00490776875867, 35.29128729757679],
      },
      properties: {
        title: 'Mt.Kintoki',
        description: 'Mount Kintoki',
        distance: 2.5,
        courseTime: 4.5,
        routeName: "Kintoki shrine loop",
        elevation: 539,
        summit: 1213,
        carPark: "https://maps.app.goo.gl/4JaEwRXxGWo3sP4g6",
        routeApiUrl: "/api/kintokiGeoJson",
        carParkCoordinates: [139.00254682976754, 35.278273848045835], 
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [138.62557411143555, 35.87264656520422], 
      },
      properties: {
        title: 'Mt.Kinpu',
        description: 'Mount Kinpu',
        distance: 3,
        courseTime: 4.5,
        routeName: "Odarumi pass start",
        elevation: 538,
        summit: 2599,
        carPark: "https://maps.app.goo.gl/1DS4SRiBYSKB4cPM6",
        routeApiUrl: "/api/kinpuGeoJson",
        carParkCoordinates: [138.66295337618013, 35.87344639129921], 
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [139.4907250423291, 36.766102722061035],
      },
      properties: {
        title: 'Mt.Nantai',
        description: 'Mount Nantai',
        distance: 2.5,
        courseTime: 7,
        routeName: "",
        elevation: 1230,
        summit: 2486,
        carPark: "https://maps.app.goo.gl/oXNErHN3ASRJWksDA",
        routeApiUrl: "/api/nantaiGeoJson",
        carParkCoordinates: [139.48799315790674, 36.741902686946624], 
      }
    },
  ]
};
