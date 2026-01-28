import { formatTimestamp } from "@utils/formatting";
import { getSeverityColor, getSeverityBorder } from "@utils/colors";

const AlertCard = ({ alert }) => {
  const getImpactColor = (impact) => {
    const colors = {
      positive: "text-green-700 bg-green-50",
      negative: "text-red-700 bg-red-50",
      neutral: "text-gray-700 bg-gray-50",
      default: "text-gray-700 bg-gray-50",
    };
    return colors[impact?.toLowerCase()] || colors.default;
  };

  const getTypeLabel = (type) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 hover:shadow-lg transition ${getSeverityBorder(alert.severity)}`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {alert.title || alert.message}
          </h3>
          {alert.title && (
            <p className="text-sm text-gray-600">{alert.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(alert.severity)}`}
        >
          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getImpactColor(alert.impact)}`}
        >
          {alert.impact
            ? alert.impact.charAt(0).toUpperCase() + alert.impact.slice(1)
            : "Unknown"}
        </span>
        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {getTypeLabel(alert.type)}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 border-t pt-3">
        <span>{formatTimestamp(alert.timestamp)}</span>
        {alert.assetId && (
          <span className="font-semibold text-gray-700">{alert.assetId}</span>
        )}
        {alert.affectedAssets && alert.affectedAssets.length > 0 && (
          <span className="text-gray-600">
            Assets: {alert.affectedAssets.join(", ")}
          </span>
        )}
        {alert.actionRequired && (
          <span className="font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
            Action Required
          </span>
        )}
        {alert.aiCoreAccuracy && (
          <span className="text-gray-600">
            AI Accuracy: {(alert.aiCoreAccuracy * 100).toFixed(0)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default AlertCard;
