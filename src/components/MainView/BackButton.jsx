// components/MainView/BackButton.jsx
"use client";
import { useMapUiStore } from "@/stores/mapUiStore";

export function BackButton({ japanMapRef }) {
  const { showFocusMap, backToMap, japanMapInitialView } = useMapUiStore();

  const handleBackToMap = () => {
    backToMap();
    japanMapRef?.current.flyTo({
      ...japanMapInitialView,
    });
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
