// components/InfoPanel/InfoPanel.jsx
"use client";

import { useUiStore } from "@/stores/uiStore";
import { Filter } from "@/components/InfoPanel/Filter";
import { ShowWeather } from "@/components/InfoPanel/ShowWeather";
import { FloatingDateSelect } from "@/components/InfoPanel/floatDateSelect";

export function InfoPanel({ japanMapRef }) {
  const showFocusMap = useUiStore((state) => state.showFocusMap);

  return (
    <>
      {showFocusMap ? (
        <>
          <FloatingDateSelect />
          <ShowWeather />
        </>
      ) : (
        <Filter japanMapRef={japanMapRef} />
      )
      }
    </>
  );
}
