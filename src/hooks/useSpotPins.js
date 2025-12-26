// hooks/useSpotPins.js
"use client"
import * as mountains from "@/data/spotPins"; // Import all spot pin data via index.js 
import { useMemo } from "react";
import { useMountainStore } from "@/stores/mountainStore";

const spotPins = {
  "jinba": mountains.jinba,
  "chausu": mountains.chausu,
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
    return spotPins[selectedMountain?.properties?.description] || {
      type: "FeatureCollection",
      features: []
    };
  }, [selectedMountain]);

  return spotPinsForEachMountain;

}


