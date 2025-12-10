// components/MainView/MainView.jsx
"use client";
import { useMapUiStore } from "@/stores/mapUiStore";
import { useIsLandscape } from "@/hooks/useIsLandscape";
import { JapanMap } from "@/components/Map/JapanMap";
import { FocusMap } from "@/components/Map/FocusMap";
import { InfoPanel } from "@/components/InfoPanel/InfoPanel";
import { BackButton } from "@/components/MainView/BackButton";

export function MainView({ japanMapRef, focusMapRef }) {
  const { showFocusMap } = useMapUiStore();
  const isLandscape = useIsLandscape();

  return (
    <div className={`w-dvw h-dvh flex flex-col ${isLandscape &&  "flex-row-reverse"} md:flex-row-reverse bg-(--color-background)`}>

      {/* Map */}
      <div className="relative flex-2 z-10">
        {!showFocusMap ? (
          <JapanMap japanMapRef={japanMapRef} />
        ) : (
          <FocusMap focusMapRef={focusMapRef} />
        )}
      </div>

      <BackButton japanMapRef={japanMapRef} />

      {/* Info Panel */}
      <div className="flex-1">
        <InfoPanel />
      </div>
    </div>
  );
}
