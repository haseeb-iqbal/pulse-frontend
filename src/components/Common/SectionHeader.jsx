// Reusable section header with count badge for grouped data
const SectionHeader = ({ title, count, color = "gray" }) => {
  const colorClasses = {
    gray: { text: "text-gray-700", badge: "bg-gray-100 text-gray-700" },
    red: { text: "text-red-700", badge: "bg-red-100 text-red-700" },
    orange: { text: "text-orange-700", badge: "bg-orange-100 text-orange-700" },
    yellow: { text: "text-yellow-700", badge: "bg-yellow-100 text-yellow-700" },
    green: { text: "text-green-700", badge: "bg-green-100 text-green-700" },
    blue: { text: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
  };

  const colors = colorClasses[color] || colorClasses.gray;

  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className={`text-xl font-bold ${colors.text}`}>{title}</h2>
      <span
        className={`px-3 py-1 ${colors.badge} rounded-full text-sm font-semibold`}
      >
        {count}
      </span>
    </div>
  );
};

export default SectionHeader;
