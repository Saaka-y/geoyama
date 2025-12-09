// components/MainView.jsx
"use client";
import { JapanMap } from "@/components/Map/JapanMap";
import { FocusMap } from "@/components/Map/FocusMap";
import { InfoPanel } from "@/components/InfoPanel/InfoPanel";
import { useUiStore } from "@/stores/uiStore";
import { useIsLandscape } from "@/hooks/useIsLandscape";

export function MainView({ japanMapRef, focusMapRef }) {
  const { showFocusMap, backToMap, japanMapInitialView } = useUiStore();
  const isLandscape = useIsLandscape();

  const handleBackToMap = () => {
    backToMap();
    japanMapRef.current.flyTo({
      ...japanMapInitialView,
    });
  };

  return (
    <div className={`w-screen h-dvh flex flex-col ${isLandscape &&  "flex-row-reverse"} md:flex-row-reverse bg-(--color-background)`}>

      {/* Map */}
      <div className="relative flex-2 z-10">
        {!showFocusMap ? (
          <JapanMap
            japanMapRef={japanMapRef}
          />
        ) : (
          <FocusMap
            focusMapRef={focusMapRef}
          />
        )}
      </div>

      {/* Back button */}
      {showFocusMap && (
        <button
          className={`
          bg-white/90 backdrop-blur-sm border border-gray-300 shadow-md
            px-4 py-1/2 md:w-25 ${isLandscape && "w-25"} flex items-center justify-center gap-1
            text-sm font-semibold
          hover:bg-white hover:shadow-lg cursor-pointer
          `}
          onClick={handleBackToMap}
        >
          <span className="text-xs">&lt; &nbsp;</span> Back
        </button>
      )}

      {/* Info Panel */}
      <div className="flex-1">
        <InfoPanel />
      </div>
    </div>
  );
}
