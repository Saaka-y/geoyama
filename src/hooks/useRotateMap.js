// hooks/useRotateMap.js

import { useEffect, useRef } from "react";

export function useRotateMap({ focusMapRef, ready }) {
  const rafIdRef = useRef(null);
  
  useEffect(() => {
    if (!focusMapRef.current || !ready) return;

    let bearing = focusMapRef.current.getBearing();
    const rotate = () => {
      bearing += 0.2; // Rotate speed
      focusMapRef.current.easeTo({ bearing, duration: 50, easing: t => t });
      rafIdRef.current = requestAnimationFrame(rotate); // Loop for animation
    };
    rotate();

    return () => {
      if(rafIdRef.current)
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, [focusMapRef, ready]);
}
