// Utility to capitalize first letter
export const capitalize = (str) => {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Utility to convert snake_case or kebab-case to Title Case
export const formatLabel = (str) => {
  if (!str || typeof str !== "string") return "";
  return str
    .split(/[_-]/)
    .map((word) => capitalize(word))
    .join(" ");
};

// Utility to get abbreviation count
export const getAbbreviatedCount = (count) => {
  const num = Number(count);
  if (!Number.isFinite(num)) return "0";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

// Utility to format volume
export const formatVolume = (volume) => {
  const num = Number(volume);
  if (!Number.isFinite(num) || num === 0) return "N/A";
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K";
  }
  return num.toString();
};
