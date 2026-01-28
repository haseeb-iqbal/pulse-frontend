import { formatTimestamp } from "../../utils/formatting";
import { getSeverityColor, getSeverityBorder } from "../../utils/colors";

const ActiveAlertsSummary = ({ dashboardData }) => {
  if (
    !dashboardData ||
    !Array.isArray(dashboardData.activeAlerts) ||
    dashboardData.activeAlerts.length === 0
  ) {
    return null;
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
      <div className="bg-red-50 px-6 py-4 border-b border-red-200">
        <h2 className="text-lg font-semibold text-red-900">Active Alerts</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {dashboardData.activeAlerts.slice(0, 5).map((alert) => (
          <div
            key={alert.id}
            className={`p-6 hover:bg-gray-50 transition ${getSeverityBorder(alert.severity)}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-2">
                  {alert.message}
                </p>
                {alert.title && (
                  <p className="text-sm text-gray-600 mb-3">{alert.title}</p>
                )}
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(alert.severity)}`}
                  >
                    {alert.severity
                      ? alert.severity.charAt(0).toUpperCase() +
                        alert.severity.slice(1)
                      : "Unknown"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {alert.type
                      ? alert.type
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(" ")
                      : ""}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTimestamp(alert.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveAlertsSummary;
