// components/MainView/BackButton.jsx

import { useMapUiStore } from "@/stores/mapUiStore";
import { useMountainStore } from "@/stores/mountainStore";

export function BackButton({ japanMapRef }) {
  const { showFocusMap, backToMap, japanMapInitialView } = useMapUiStore();
  const { setSelectedMountain } = useMountainStore();

  const handleBackToMap = () => {
    backToMap();
    setSelectedMountain(null);
    if (japanMapRef.current) {
      japanMapRef.current.flyTo({
        ...japanMapInitialView,
      });
    }
  };

  const className = [
    "bg-(--card-bg) backdrop-blur-sm",
    "border-2 border-(--border) shadow-(--card-shadow)",
    "flex items-center justify-center gap-2",
    "px-5 py-2",
    "w-full md:w-28 landscape:w-28",
    "text-sm font-semibold text-(--text-primary)",
    "hover:bg-(--primary) hover:text-white hover:border-(--primary) hover:shadow-(--card-shadow-hover)",
    "transition-all duration-300",
    "cursor-pointer",
    "rounded-lg md:rounded-full landscape:rounded-full"
  ].join(" ");

  return (
    <>
      {showFocusMap && (
        <button
          className={className}
          onClick={handleBackToMap}
        >
          <span className="text-base">&larr;</span>
          <span>Back</span>
        </button>
      )}
    </>
  );
}
