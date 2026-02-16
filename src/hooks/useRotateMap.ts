// hooks/useRotateMap.js

import { useEffect, useRef } from "react";
import { MapRef } from "@/types/mapbox";

export function useRotateMap({ focusMapRef, ready }: { focusMapRef: MapRef, ready: boolean }) {
  const rafIdRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!focusMapRef.current || !ready) return;

    let bearing = focusMapRef.current.getBearing();
    const rotate = () => {
      bearing += 0.2; // Rotate speed
      focusMapRef.current.easeTo({ bearing, duration: 50, easing: (t: any) => t });
      rafIdRef.current = requestAnimationFrame(rotate); // Loop for animation
    };
    rotate();

    return () => {
      if(rafIdRef.current !== null)
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, [focusMapRef, ready]);
}
