// Reusable filter button component for consistent styling
const FilterButton = ({
  label,
  count,
  isActive = false,
  onClick,
  showCount = true,
}) => {
  // Validate required props
  if (!label || typeof label !== "string") return null;
  if (typeof onClick !== "function") return null;

  // Safely handle count value
  const displayCount = Number.isFinite(Number(count)) ? count : 0;

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition ${
        isActive
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      }`}
    >
      {label}
      {showCount && count !== undefined && ` (${displayCount})`}
    </button>
  );
};

export default FilterButton;
