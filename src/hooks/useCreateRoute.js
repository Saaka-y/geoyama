// hooks/useCreateRoute.js
"use client"
import "mapbox-gl/dist/mapbox-gl.css";
import * as routes from "@/data/routeGeojson"; // Import each routeGeojson via index.js
import { useEffect, useState } from "react";
import { useMountainStore } from "@/stores/mountainStore";


export function useCreateRoute() {
  const { selectedMountain } = useMountainStore();
  const [routeGeo, setRouteGeo] = useState(null);

  useEffect(() => {
    if (!selectedMountain) return;
    const mountainName = selectedMountain.properties.description;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRouteGeo(routes[mountainName] || { type: "FeatureCollection", features: [] });
  }, [selectedMountain]);

  return routeGeo;
}


