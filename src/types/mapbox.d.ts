// Mapbox GL JS 型定義

export interface MapboxGeoJSONFeature {
  type: "Feature";
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
  properties: Record<string, any>;
  id?: string | number;
}

export interface Coordinates {
  lng: number;
  lat: number;
}

export interface MapboxCamera {
  center: [number, number];
  zoom: number;
  pitch?: number;
  bearing?: number;
}

// 必要に応じて追加