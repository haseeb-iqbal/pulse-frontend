import { formatCurrency } from "@utils/formatting";
import { getChangeColor, getChangeBgColor } from "@utils/colors";

const AssetRow = ({ asset }) => {
  if (!asset) return null;

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

export default AssetRow;
