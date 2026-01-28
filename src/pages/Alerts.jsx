import { useState, useEffect } from "react";
import AlertCard from "@components/Alerts/AlertCard";
import { getAlerts } from "@services/api";

const Alerts = () => {
  const [alertsByGroup, setAlertsByGroup] = useState({
    critical: [],
    high: [],
    medium: [],
    low: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const response = await getAlerts();
        const alertsData = response?.data?.data || [];

        const grouped = {
          critical: alertsData.filter((a) => a.severity === "critical"),
          high: alertsData.filter((a) => a.severity === "high"),
          medium: alertsData.filter((a) => a.severity === "medium"),
          low: alertsData.filter((a) => a.severity === "low"),
        };

        setAlertsByGroup(grouped);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch alerts");
        setAlertsByGroup({ critical: [], high: [], medium: [], low: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-600">Loading alerts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
        <h2 className="text-lg font-semibold mb-2">Error Loading Alerts</h2>
        <p>{error}</p>
      </div>
    );
  }

  const getTotalCount = (severity) => alertsByGroup[severity]?.length || 0;
  const hasAnyAlerts = Object.values(alertsByGroup).some(
    (group) => group.length > 0,
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Alerts</h1>
      <p className="text-gray-600 mb-6">
        Total alerts:{" "}
        {Object.values(alertsByGroup).reduce(
          (sum, group) => sum + group.length,
          0,
        )}
      </p>

      {!hasAnyAlerts ? (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <p className="text-gray-600">No alerts at the moment</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Critical Alerts */}
          {getTotalCount("critical") > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-red-700">Critical</h2>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                  {getTotalCount("critical")}
                </span>
              </div>
              <div className="grid gap-4">
                {alertsByGroup.critical.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {/* High Alerts */}
          {getTotalCount("high") > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-orange-700">High</h2>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                  {getTotalCount("high")}
                </span>
              </div>
              <div className="grid gap-4">
                {alertsByGroup.high.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {/* Medium Alerts */}
          {getTotalCount("medium") > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-yellow-700">Medium</h2>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                  {getTotalCount("medium")}
                </span>
              </div>
              <div className="grid gap-4">
                {alertsByGroup.medium.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {/* Low Alerts */}
          {getTotalCount("low") > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-green-700">Low</h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {getTotalCount("low")}
                </span>
              </div>
              <div className="grid gap-4">
                {alertsByGroup.low.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Alerts;
