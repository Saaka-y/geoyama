// hooks/useCreateSpotPins.js
"use client"
import * as mountains from "@/data/spotPins"; // index.js 経由で全山のピン情報を import
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
  // 他の山も同じように追加
};

export function useCreateSpotPins() {
  const { selectedMountain } = useMountainStore();

  const spotPinsForEachMountain = useMemo(() => {
    return spotPins[selectedMountain?.properties?.description] || {
      type: "FeatureCollection",
      features: []
    };
  }, [selectedMountain]);

  return spotPinsForEachMountain;

}


