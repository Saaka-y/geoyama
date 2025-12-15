// components/InfoPanel/Filter/ClearButton.jsx

export function ClearButton({ onClear}) {

  return (
    <button
      className="
        w-[90%] py-1 text-xs
        border border-gray-300 rounded-md
        text-gray-600 
        bg-white
        hover:bg-gray-100
        transition
        mt-0.5
        md:mt-2
        landscape:mt-2
      "
      onClick={onClear}
    >
      Clear
    </button>
  );
}