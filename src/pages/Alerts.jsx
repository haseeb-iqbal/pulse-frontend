import { useState, useEffect } from "react";
import AlertCard from "@components/Alerts/AlertCard";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "@components/Common/StateComponents";
import SectionHeader from "@components/Common/SectionHeader";
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
        setError(null);

        const response = await getAlerts();
        const alertsData = Array.isArray(response?.data?.data)
          ? response.data.data
          : [];

        // Filter out invalid alerts (must have id, severity, and message)
        const validAlerts = alertsData.filter(
          (alert) =>
            alert &&
            typeof alert === "object" &&
            alert.id &&
            alert.severity &&
            alert.message,
        );

        // Group by severity with validation
        const grouped = {
          critical: validAlerts.filter((a) => a.severity === "critical"),
          high: validAlerts.filter((a) => a.severity === "high"),
          medium: validAlerts.filter((a) => a.severity === "medium"),
          low: validAlerts.filter((a) => a.severity === "low"),
        };

        setAlertsByGroup(grouped);
      } catch (err) {
        setError(err.message || "Failed to fetch alerts");
        setAlertsByGroup({ critical: [], high: [], medium: [], low: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) return <LoadingState message="Loading alerts..." />;
  if (error) return <ErrorState error={error} title="Error Loading Alerts" />;

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
        <EmptyState message="No alerts at the moment" />
      ) : (
        <div className="space-y-8">
          {getTotalCount("critical") > 0 && (
            <div>
              <SectionHeader
                title="Critical"
                count={getTotalCount("critical")}
                color="red"
              />
              <div className="grid gap-4">
                {alertsByGroup.critical.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {getTotalCount("high") > 0 && (
            <div>
              <SectionHeader
                title="High"
                count={getTotalCount("high")}
                color="orange"
              />
              <div className="grid gap-4">
                {alertsByGroup.high.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {getTotalCount("medium") > 0 && (
            <div>
              <SectionHeader
                title="Medium"
                count={getTotalCount("medium")}
                color="yellow"
              />
              <div className="grid gap-4">
                {alertsByGroup.medium.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {getTotalCount("low") > 0 && (
            <div>
              <SectionHeader
                title="Low"
                count={getTotalCount("low")}
                color="green"
              />
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
