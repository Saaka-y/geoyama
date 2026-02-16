// allMountains.json 用の型定義

export interface MountainFeatureCollection {
  type: "FeatureCollection";
  features: MountainFeature[];
}

export interface MountainFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: MountainProperties;
}

export interface MountainProperties {
  title: string;
  routeKey: string;
  distance: number;
  courseTime: number;
  routeName: string;
  elevation: number;
  summit: number;
  carPark: string;
  station: string;
}
