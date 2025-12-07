// components/MainView.jsx
"use client";
import { JapanMap } from "@/components/Map/JapanMap";
import { FocusMap } from "@/components/Map/FocusMap";
import { InfoPanel } from "@/components/InfoPanel/InfoPanel";
import { useUiStore } from "@/stores/uiStore";
import { useMapStore } from "@/stores/mapStore";

export function MainView() {
  const { showFocusMap, backToMap, japanMapInitialView } = useUiStore();
  const japanMap = useMapStore(state => state.japanMap);

  const handleBackToMap = () => {
    backToMap();
    japanMap.flyTo({
      ...japanMapInitialView,
    });
  };
  // h-1/3 md:h-full w-full md:w-1/3
  // h-2/3 md:h-full w-full md:w-2/3

  return (
    <div className="w-screen h-dvh flex flex-col md:flex-row-reverse bg-(--color-background)">

      {/* Map */}
      <div className="relative flex-2 z-10">
        {!showFocusMap ? (
          <JapanMap />
        ) : (
          <FocusMap />
        )}
      </div>

      {/* Back button */}
      {showFocusMap && (
        <button
          className="
          bg-white/90 backdrop-blur-sm
            border border-gray-300 shadow-md
            px-4 py-2
            text-sm font-semibold
            flex items-center justify-center
            gap-1
            w-full md:w-25
          hover:bg-white
            hover:shadow-lg
            cursor-pointer
          "
          onClick={handleBackToMap}
        >
          <span className="text-lg">&lt; &nbsp;</span> Back
        </button>
      )}

      {/* Info Panel */}
      <div
        className={
          `flex-1 bg-(--color-surface)` +
          (showFocusMap
            ? ` pt-5`
            : ` flex flex-col pt-6 md:pt-10 items-center gap-5`
          )
        }
      >
        <InfoPanel />
      </div>
    </div>
  );
}
