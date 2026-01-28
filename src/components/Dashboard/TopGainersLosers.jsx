import { formatCurrency } from "../../utils/formatting";

const TopGainersLosers = ({ dashboardData }) => {
  const getChangeColor = (change) => {
    return change >= 0 ? "text-green-600" : "text-red-600";
  };

  const getChangeBgColor = (change) => {
    return change >= 0 ? "bg-green-50" : "bg-red-50";
  };

  const renderAssetRow = (asset) => {
    const isAssetPositive = asset.changePercent >= 0;
    const assetChangeColor = getChangeColor(asset.changePercent);
    return (
      <div
        key={asset.symbol}
        className={`flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 ${getChangeBgColor(asset.changePercent)}`}
      >
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{asset.symbol}</p>
          <p className="text-sm text-gray-600">{asset.name}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900">
            {formatCurrency(asset.currentPrice)}
          </p>
          <p className={`text-sm font-medium ${assetChangeColor}`}>
            {isAssetPositive ? "+" : ""}
            {asset.changePercent?.toFixed(2)}%
          </p>
        </div>
      </div>
    );
  };

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
          {dashboardData.topGainers &&
            dashboardData.topGainers
              .slice(0, 3)
              .map((asset) => renderAssetRow(asset))}
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-red-50 px-6 py-4 border-b border-red-200">
          <h2 className="text-lg font-semibold text-red-900">Top 3 Losers</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {dashboardData.topLosers &&
            dashboardData.topLosers
              .slice(0, 3)
              .map((asset) => renderAssetRow(asset))}
        </div>
      </div>
    </div>
  );
};

export default TopGainersLosers;
