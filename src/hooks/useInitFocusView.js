// hooks/useInitFocusView.jsx

import { useCreateSpotPins } from "@/hooks/useCreateSpotPins";

export function useInitFocusView() {
  const spotPinsForEachMountain = useCreateSpotPins();

  // Decide zoom location
  const coords = spotPinsForEachMountain.features.map(f => f.geometry.coordinates);
  // Center of summit, start and goal 
  const center = [
    (coords[0][0] + coords[1][0] + coords[2][0]) / 3, // 経度の平均
    (coords[0][1] + coords[1][1] + coords[2][1]) / 3  // 緯度の平均
  ];

  const zoom = spotPinsForEachMountain.features[0].properties.zoom

  return { center, zoom };
}