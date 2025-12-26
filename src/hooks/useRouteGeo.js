// hooks/useRouteGeo.js

import "mapbox-gl/dist/mapbox-gl.css";
import * as routes from "@/data/routeGeojson"; // Import each routeGeojson via index.js
import { useMemo } from "react";
import { useMountainStore } from "@/stores/mountainStore";


export function useRouteGeo() {
  const { selectedMountain } = useMountainStore();

  const routeGeo = useMemo(() => {
    if (!selectedMountain) return null;
    return routes[selectedMountain.properties.description] || { type: "FeatureCollection", features: [] }
  }, [selectedMountain])

  return routeGeo;
}


