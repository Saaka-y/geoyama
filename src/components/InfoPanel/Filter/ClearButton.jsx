// components/InfoPanel/Filter/ClearButton.jsx

export function ClearButton({ onClear }) {

  return (
    <button
      className="w-full max-w-md px-6 py-3 text-sm font-medium text-(--primary) bg-white border-2 border-(--primary) rounded-lg hover:bg-(--primary) hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
      onClick={onClear}
    >
      Clear Filters
    </button>
  );
}