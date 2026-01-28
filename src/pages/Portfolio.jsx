import { useState, useEffect } from "react";
import PortfolioOverview from "@components/Portfolio/PortfolioOverview";
import PortfolioChart from "@components/Portfolio/PortfolioChart";
import PortfolioAssetsTable from "@components/Portfolio/PortfolioAssetsTable";
import WatchlistSection from "@components/Portfolio/WatchlistSection";
import { getPortfolio } from "@services/api";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await getPortfolio();
        const portfolioData = response?.data?.data;

        if (portfolioData) {
          setPortfolio(portfolioData);
          setError(null);
        } else {
          setError("No portfolio data received");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch portfolio data");
        setPortfolio(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-600">Loading portfolio...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
        <h2 className="text-lg font-semibold mb-2">Error Loading Portfolio</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-yellow-700">
        <p>No portfolio data available</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Portfolio</h1>

      <PortfolioOverview portfolio={portfolio} />

      <PortfolioChart assets={portfolio.assets} />

      <PortfolioAssetsTable assets={portfolio.assets} />

      <WatchlistSection watchlist={portfolio.watchlist} />
    </div>
  );
};

export default Portfolio;
