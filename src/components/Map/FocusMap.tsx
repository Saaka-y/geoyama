// components/Map/FocusMap.jsx

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState, useRef } from "react";
import { useMapUiStore } from "@/stores/mapUiStore";
import { useMountainStore } from "@/stores/mountainStore";
import { MapRef } from "@/types/mapbox";
import { useInitFocusView } from "@/hooks/useInitFocusView";
import { useSpotPins } from "@/hooks/useSpotPins";
import { useApplySpotPins } from "@/hooks/useApplySpotPins";
import { useRotateMap } from "@/hooks/useRotateMap";
import { MountainInfo } from "@/components/Map/MountainInfo";
import { RoutePreview } from "@/components/Map/RoutePreview";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function FocusMap({ focusMapRef }: { focusMapRef: MapRef }) {
  
  const [isMapReady, setIsMapReady] = useState(false); // a flag that shows if map is ready
  // Zustand store
  const { showFocusMap } = useMapUiStore();
  const { selectedMountain } = useMountainStore();
  // hooks
  const { center, zoom } = useInitFocusView();
  const spotPinsForEachMountain = useSpotPins();
  useRotateMap({ focusMapRef, ready: isMapReady });
  // Extract features from spot pins
  const features = spotPinsForEachMountain.features;
  // Apply spot pins to the map when ready
  useApplySpotPins({
    focusMapRef,
    features,
    ready: isMapReady,
  });

  const focusMapContainerRef = useRef(null);


  // FocusMap instance setup
  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    // Recreate the map instance every time the selectedMountain changes
    if (focusMapContainerRef.current) {
      focusMapRef.current = new mapboxgl.Map({
        container: focusMapContainerRef.current as HTMLElement,
        style: "mapbox://styles/mapbox/outdoors-v12",
        // @ts-ignore
        center: center,
        zoom: zoom,
        pitch: 40,
        bearing: -17,
        logoPosition: "top-left",
      });

      const map = focusMapRef.current;
      map.on("load", () => {
        setIsMapReady(true); // a flag that shows if map is ready

        // Add 3D source
        map.addSource("terrain-dem", {
          "type": "raster-dem",
          "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
          "tileSize": 512,
          "maxzoom": 14
        });
        // Set terrain with exaggeration
        map.setTerrain({ source: "terrain-dem", exaggeration: 1.4 });

        // Show spot pins
        // 👉 Refer to "useApplySpotPins.js"
      });

      return () => map?.remove();
    }
  }, [center, focusMapRef, selectedMountain, showFocusMap, zoom]);


  return (
    <>
      <div
        ref={focusMapContainerRef}
        style={{ width: "100%", height: "100%" }}
        className="focus-map"
      />

      {/* Show mountain info on top left */}
      {selectedMountain && (
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 10,
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: "8px",
            borderRadius: "6px",
            maxWidth: "220px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
          }}
        >
          <MountainInfo />
        </div>
      )}

      <RoutePreview
        focusMapRef={focusMapRef}
        ready={isMapReady}
      />
    </>
  );
}

