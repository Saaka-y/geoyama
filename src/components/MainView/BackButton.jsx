// components/MainView/BackButton.jsx
"use client";
import { useUiStore } from "@/stores/uiStore";
import { useIsLandscape } from "@/hooks/useIsLandscape";

export function BackButton({ japanMapRef }) {
  const { showFocusMap, backToMap, japanMapInitialView } = useUiStore();
  const isLandscape = useIsLandscape();

  const handleBackToMap = () => {
    backToMap();
    japanMapRef.current.flyTo({
      ...japanMapInitialView,
    });
  };

  return (
    <>
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
    </>
  );
}
