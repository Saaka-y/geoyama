// @/hooks/useIsMd.js
import { useState, useEffect } from "react";

export function useIsMd() {
  const [isMd, setIsMd] = useState(
    typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handler = (e) => setIsMd(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isMd;
}
