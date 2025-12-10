// components/InfoPanel/Filter/ClearButton.jsx
import { useIsMd } from "@/hooks/useIsMd";
import { useIsLandscape } from "@/hooks/useIsLandscape";

export function ClearButton({ onClear}) {
  const isMd = useIsMd();
  const isLandscape = useIsLandscape();

  return (
    <button
      className={`w-[90%] ${isMd || isLandscape ? "mt-2" : "mt-1/2"} py-1 text-xs border border-gray-300 text-gray-600 rounded-md bg-white hover:bg-gray-100 transition`}
      onClick={onClear}
    >
      Clear
    </button>
  );
}