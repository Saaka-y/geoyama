// hooks/useInitFocusView.jsx
import { useSpotPins } from "@/hooks/useSpotPins";

export function useInitFocusView() {
  const spotPinsForEachMountain = useSpotPins();
  const features = spotPinsForEachMountain?.features;

  if (!features || features.length < 3) {
    return { center: null, zoom: null };
  }

  const coords = features.map(f => f.geometry.coordinates);

  const center = [
    (coords[0][0] + coords[1][0] + coords[2][0]) / 3,
    (coords[0][1] + coords[1][1] + coords[2][1]) / 3
  ];

  const zoom = features[0].properties.zoom;

  return { center, zoom };
}
