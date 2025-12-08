//@/hooks/useIsLandscape.js
"use client";
import { useEffect, useState } from "react";

export function useIsLandscape() {
  const [isLandscape, setIsLandscape] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: landscape)");
    const update = () => setIsLandscape(mq.matches);

    update(); // 初回実行
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isLandscape;
}