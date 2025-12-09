// components/InfoPanel/InfoPanel.jsx
"use client";
import { useUiStore } from "@/stores/uiStore";
import { Filter } from "@/components/InfoPanel/Filter/Filter";
import { ShowWeather } from "@/components/InfoPanel/ShowWeather";
import { FloatDateSelect } from "@/components/InfoPanel/Filter/FloatDateSelect";

export function InfoPanel({ japanMapRef }) {
  const showFocusMap = useUiStore((state) => state.showFocusMap);

  return (
    <>
      {showFocusMap ? (
        <>
          <FloatDateSelect />
          <ShowWeather />
        </>
      ) : (
        <Filter japanMapRef={japanMapRef} />
      )
      }
    </>
  );
}
