import { useState, useEffect } from "react";
import PortfolioOverview from "@components/Portfolio/PortfolioOverview";
import PortfolioChart from "@components/Portfolio/PortfolioChart";
import PortfolioAssetsTable from "@components/Portfolio/PortfolioAssetsTable";
import WatchlistSection from "@components/Portfolio/WatchlistSection";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "@components/Common/StateComponents";
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
    return <LoadingState message="Loading portfolio..." />;
  }

  if (error) {
    return <ErrorState error={error} title="Error Loading Portfolio" />;
  }

  if (!portfolio) {
    return <EmptyState message="No portfolio data available" />;
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
