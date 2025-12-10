// components/InfoPanel/InfoPanel.jsx
"use client";
import { useMapUiStore } from "@/stores/mapUiStore";
import { Filter } from "@/components/InfoPanel/Filter/Filter";
import { WeatherPanel } from "@/components/InfoPanel/Weather/WeatherPanel";
import { FloatDateSelect } from "@/components/InfoPanel/Filter/FloatDateSelect";

export function InfoPanel({ japanMapRef }) {
  const showFocusMap = useMapUiStore((state) => state.showFocusMap);

  return (
    <>
      {showFocusMap ? (
        <>
          <FloatDateSelect />
          <WeatherPanel />
        </>
      ) : (
        <Filter japanMapRef={japanMapRef} />
      )
      }
    </>
  );
}
