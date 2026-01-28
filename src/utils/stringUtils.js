// Utility to capitalize first letter
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Utility to convert snake_case or kebab-case to Title Case
export const formatLabel = (str) => {
  if (!str) return "";
  return str
    .split(/[_-]/)
    .map((word) => capitalize(word))
    .join(" ");
};

// Utility to get abbreviation count
export const getAbbreviatedCount = (count) => {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return count.toString();
};

// Utility to format volume
export const formatVolume = (volume) => {
  if (!volume) return "N/A";
  if (volume >= 1000000000) {
    return (volume / 1000000000).toFixed(2) + "B";
  }
  if (volume >= 1000000) {
    return (volume / 1000000).toFixed(2) + "M";
  }
  if (volume >= 1000) {
    return (volume / 1000).toFixed(2) + "K";
  }
  return volume.toString();
};
