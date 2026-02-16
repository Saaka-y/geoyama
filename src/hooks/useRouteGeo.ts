// hooks/useRouteGeo.js

import "mapbox-gl/dist/mapbox-gl.css";
import * as routes from "@/data/routeGeojson"; // Import each routeGeojson via index.js
import { useMemo } from "react";

import { MountainFeature } from "@/types/mountain";
import { useMountainStore } from "@/stores/mountainStore";


export function useRouteGeo() {
  const { selectedMountain } = useMountainStore();

  const routeGeo = useMemo(() => {
    if (!selectedMountain) return null;
    const routeKey = selectedMountain.properties.routeKey as keyof typeof routes;
    return routes[routeKey] || { type: "FeatureCollection", features: [] };
  }, [selectedMountain]);

  console.log("routeGeo:", routeGeo)
  return routeGeo;
}


