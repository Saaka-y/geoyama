// pages/index.jsx

import { useRef, useEffect } from "react";
import { useFilterStore } from "@/stores/filterStore";
import { MainView } from "@/components/MainView/MainView";

export default function Home() {
  const { initDateOptions } = useFilterStore();

  //**************************/
  // Mapbox instance /
  //**************************/
  const japanMapRef = useRef(null);
  const focusMapRef = useRef(null);

  useEffect(() => {
    initDateOptions();
  }, [initDateOptions]);

  return (
    <MainView
      japanMapRef={japanMapRef}
      focusMapRef={focusMapRef}
    />
  );
}
