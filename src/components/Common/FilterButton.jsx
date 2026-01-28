// Reusable filter button component for consistent styling
const FilterButton = ({
  label,
  count,
  isActive,
  onClick,
  showCount = true,
}) => {
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
      {showCount && count !== undefined && ` (${count})`}
    </button>
  );
};

export default FilterButton;
