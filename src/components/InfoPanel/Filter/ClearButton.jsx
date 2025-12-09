// components/InfoPanel/Filter/ClearButton.jsx

export function ClearButton({ onClear}) {

  return (
    <button
      className="w-[90%] mt-1/2 md:mt-2 py-1 text-xs border border-gray-300 text-gray-600 rounded-md bg-white hover:bg-gray-100 transition"
      onClick={onClear}
    >
      Clear
    </button>
  );
}