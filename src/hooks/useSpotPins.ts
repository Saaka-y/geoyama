// hooks/useSpotPins.ts

import * as mountains from "@/data/spotPins"; // Import all spot pin data via index.ts
import { useMemo } from "react";
import { useMountainStore } from "@/stores/mountainStore";

const spotPins: Record<string, any> = {
  "kinpu": mountains.kinpu,
  "kintoki": mountains.kintoki,
  "nabewari": mountains.nabewari,
  "nantai": mountains.nantai,
  "ono": mountains.ono,
  // Add other mountains
};

export function useSpotPins() {
  const { selectedMountain } = useMountainStore();

  const spotPinsForEachMountain = useMemo(() => {
    return spotPins[selectedMountain?.properties?.routeKey] || {
      type: "FeatureCollection",
      features: []
    };
  }, [selectedMountain]);

  return spotPinsForEachMountain;

}


