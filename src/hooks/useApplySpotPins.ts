// hooks/useApplySpotPins.js

import { useEffect } from "react";
import { MapRef } from "@/types/mapbox";

interface Props {
  focusMapRef: MapRef;
  features: any[];
  ready: boolean;
}

export function useApplySpotPins({ focusMapRef, features, ready }: Props) {

  useEffect(() => {
    if (!focusMapRef.current || !features || !ready) return;
    const map = focusMapRef.current;

    const layerOrder = ["mountain-icon", "goal-icon", "start-icon"];
    layerOrder.forEach(iconName => {
      const i = iconName === "mountain-icon" ? 0 : iconName === "start-icon" ? 1 : 2;
      const feature = features[i];
      const iconPath = `/icon/${iconName}.png`;

      // Load icon images
      map.loadImage(iconPath, (err: Error | null, image:  HTMLImageElement | ImageBitmap | null) => {
        if (err) throw err;
        if (!map.hasImage(iconName)) {
          map.addImage(iconName, image);
        }
        // Add source
        map.addSource(`${iconName}-source`, {
          type: "geojson",
          data: feature, //each geojson 
        });

        // Set up layer for icons
        map.addLayer({
          id: `${iconName}-layer`,
          type: "symbol",
          source: `${iconName}-source`,
          layout: {
            "icon-image": iconName,
            "icon-size": 0.3,
            "icon-anchor": "bottom",
            "icon-allow-overlap": true,
          },
        });
      });
    });

    return () => {
      // Clean up layers and sources
      layerOrder.forEach(iconName => {
        if (map.getLayer(`${iconName}-layer`)) {
          map.removeLayer(`${iconName}-layer`);
        }
        if (map.getSource(`${iconName}-source`)) {
          map.removeSource(`${iconName}-source`);
        }
        if (map.hasImage(iconName)) {
          map.removeImage(iconName);
        }
      }
      );
    }
  }, [focusMapRef, features, ready]);
}