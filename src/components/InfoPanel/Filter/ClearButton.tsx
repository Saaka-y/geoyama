// components/InfoPanel/Filter/ClearButton.jsx

type ClearButtonProps = {
  onClear: () => void;
};

export function ClearButton({ onClear }: ClearButtonProps) {

  return (
    <button
      className="w-full max-w-md px-6 py-3.5 text-sm font-semibold text-(--primary) bg-white border-2 border-(--primary) rounded-lg hover:bg-(--primary) hover:text-white transition-all duration-300 shadow-sm hover:shadow-md tracking-tight backdrop-blur-sm"
      onClick={onClear}
    >
      Clear All Filters
    </button>
  );
}