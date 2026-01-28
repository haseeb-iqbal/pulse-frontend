import { formatCurrency } from "../../utils/formatting";
import { getChangeColor, getChangeBgColor } from "../../utils/colors";
import AssetRow from "./AssetRow";

const TopGainersLosers = ({ dashboardData }) => {
  if (!dashboardData) {
    return null;
  }

  const hasGainers =
    Array.isArray(dashboardData.topGainers) &&
    dashboardData.topGainers.length > 0;
  const hasLosers =
    Array.isArray(dashboardData.topLosers) &&
    dashboardData.topLosers.length > 0;

  if (!hasGainers && !hasLosers) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Top Gainers */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-green-50 px-6 py-4 border-b border-green-200">
          <h2 className="text-lg font-semibold text-green-900">
            Top 3 Gainers
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {hasGainers &&
            dashboardData.topGainers
              .slice(0, 3)
              .map((asset) => <AssetRow key={asset.symbol} asset={asset} />)}
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-red-50 px-6 py-4 border-b border-red-200">
          <h2 className="text-lg font-semibold text-red-900">Top 3 Losers</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {hasLosers &&
            dashboardData.topLosers
              .slice(0, 3)
              .map((asset) => <AssetRow key={asset.symbol} asset={asset} />)}
        </div>
      </div>
    </div>
  );
};

export default TopGainersLosers;
