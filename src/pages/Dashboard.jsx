import { useState, useEffect } from "react";
import { getPortfolio, getDashboard } from "@services/api";
import PortfolioSummaryCard from "@components/Dashboard/PortfolioSummaryCard";
import TopGainersLosers from "@components/Dashboard/TopGainersLosers";
import RecentNewsFeed from "@components/Dashboard/RecentNewsFeed";
import ActiveAlertsSummary from "@components/Dashboard/ActiveAlertsSummary";

const Dashboard = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [portfolioResponse, dashboardResponse] = await Promise.all([
          getPortfolio(),
          getDashboard(),
        ]);

        // Validate responses
        const portfolio = portfolioResponse?.data?.data;
        const dashboard = dashboardResponse?.data?.data;

        if (!portfolio && !dashboard) {
          setError("No data available from server");
        } else {
          setPortfolioData(portfolio);
          setDashboardData(dashboard);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Portfolio</h1>

      {loading && (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Loading portfolio data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 p-6 rounded-lg shadow border border-red-200">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}

      {!loading && !error && portfolioData && (
        <PortfolioSummaryCard portfolioData={portfolioData} />
      )}

      {!loading && !error && dashboardData && (
        <div className="mt-8">
          <TopGainersLosers dashboardData={dashboardData} />
          <RecentNewsFeed dashboardData={dashboardData} />
          <ActiveAlertsSummary dashboardData={dashboardData} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
