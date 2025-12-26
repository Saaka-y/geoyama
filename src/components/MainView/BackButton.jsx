// components/MainView/BackButton.jsx

import { useMapUiStore } from "@/stores/mapUiStore";
import { useEffect } from "react";

export function BackButton({ japanMapRef }) {
  const { showFocusMap, backToMap, japanMapInitialView } = useMapUiStore();

  useEffect(() => {
    if (!showFocusMap && japanMapRef.current) {
      japanMapRef?.current?.flyTo({
        ...japanMapInitialView,
      });
    }
  }, [showFocusMap, japanMapInitialView, japanMapRef])

  const handleBackToMap = () => {
    backToMap();
  };

  const className = [
    "bg-white/90 backdrop-blur-sm",
    "border border-gray-300 shadow-md",
    "flex items-center justify-center gap-1",
    "px-4 py-1",
    "w-full md:w-24 landscape:w-24",
    "text-sm font-semibold",
    "hover:bg-white hover:shadow-lg cursor-pointer",
  ].join(" ");

  return (
    <>
      {showFocusMap && (
        <button
          className={className}
          onClick={handleBackToMap}
        >
          <span className="text-xs">&lt; &nbsp;</span> Back
        </button>
      )}
    </>
  );
}
