import { COLOR_MAPPINGS } from "@utils/colorConstants";

export const getSeverityColor = (severity) => {
  return (
    COLOR_MAPPINGS.severity[severity?.toLowerCase()] ||
    COLOR_MAPPINGS.severity.default
  );
};

export const getSeverityBorder = (severity) => {
  return (
    COLOR_MAPPINGS.severityBorder[severity?.toLowerCase()] ||
    COLOR_MAPPINGS.severityBorder.default
  );
};

export const getNewsCategoryColor = (category) => {
  return (
    COLOR_MAPPINGS.newsCategory[category?.toLowerCase()] ||
    COLOR_MAPPINGS.newsCategory.default
  );
};

export const getChangeColor = (change) => {
  const num = Number(change);
  if (!Number.isFinite(num))
    return COLOR_MAPPINGS.change.neutral || "text-gray-700";
  return num >= 0
    ? COLOR_MAPPINGS.change.positive
    : COLOR_MAPPINGS.change.negative;
};

export const getChangeBgColor = (change) => {
  const num = Number(change);
  if (!Number.isFinite(num))
    return COLOR_MAPPINGS.changeBg.neutral || "bg-gray-50";
  return num >= 0
    ? COLOR_MAPPINGS.changeBg.positive
    : COLOR_MAPPINGS.changeBg.negative;
};
