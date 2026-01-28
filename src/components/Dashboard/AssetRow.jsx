import { formatCurrency } from "@utils/formatting";
import { getChangeColor, getChangeBgColor } from "@utils/colors";

const AssetRow = ({ asset }) => {
  // Validate asset object
  if (!asset || typeof asset !== "object") return null;

  // Validate required fields
  if (!asset.symbol || !asset.name) return null;

  // Safely handle numeric values
  const changePercent = Number(asset.changePercent) || 0;
  const currentPrice = Number(asset.currentPrice) || 0;
  const isAssetPositive = changePercent >= 0;
  const assetChangeColor = getChangeColor(changePercent);

  return (
    <div
      key={asset.symbol}
      className={`flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 ${getChangeBgColor(changePercent)}`}
    >
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{asset.symbol}</p>
        <p className="text-sm text-gray-600">{asset.name || "Unknown"}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">
          {formatCurrency(currentPrice)}
        </p>
        <p className={`text-sm font-medium ${assetChangeColor}`}>
          {isAssetPositive ? "+" : ""}
          {changePercent.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default AssetRow;
