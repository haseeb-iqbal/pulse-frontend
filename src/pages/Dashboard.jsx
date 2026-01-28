import { useEffect, useMemo, useState } from "react";
import { getPortfolio } from "../services/api";

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchPortfolio = async () => {
      try {
        const response = await getPortfolio();
        const data = response?.data?.data ?? null;
        if (isMounted) {
          setPortfolio(data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError("Unable to load portfolio summary right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPortfolio();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatCurrency = useMemo(() => {
    return (value, options = {}) => {
      if (typeof value !== "number" || Number.isNaN(value)) return "—";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
        ...options,
      }).format(value);
    };
  }, []);

  const formatPercent = useMemo(() => {
    return (value, options = {}) => {
      if (typeof value !== "number" || Number.isNaN(value)) return "—";
      return new Intl.NumberFormat("en-US", {
        style: "percent",
        maximumFractionDigits: 2,
        ...options,
      }).format(value / 100);
    };
  }, []);

  const totalValue = portfolio?.totalValue;
  const totalChange = portfolio?.totalChange;
  const totalChangePercent = portfolio?.totalChangePercent;
  const isPositive = typeof totalChange === "number" ? totalChange >= 0 : true;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <span className="text-sm text-gray-500">Portfolio overview</span>
      </div>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Portfolio Summary
            </h2>
            <p className="text-sm text-gray-500">
              Total value and daily change
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">
            💼
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-8 bg-gray-100 rounded w-56"></div>
              <div className="h-5 bg-gray-100 rounded w-40"></div>
            </div>
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">
                {formatCurrency(totalValue)}
              </div>
              <div
                className={`text-sm font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}
              >
                {formatCurrency(totalChange, { signDisplay: "always" })}
                <span className="ml-2">
                  {formatPercent(totalChangePercent, { signDisplay: "always" })}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
