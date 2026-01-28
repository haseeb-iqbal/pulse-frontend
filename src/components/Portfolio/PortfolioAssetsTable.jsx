import { formatCurrency } from "@utils/formatting";
import { getChangeColor, getChangeBgColor } from "@utils/colors";

const PortfolioAssetsTable = ({ assets }) => {
  if (!assets || assets.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Portfolio Holdings</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Asset
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Avg Buy Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Current Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Current Value
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Gain/Loss
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Return %
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assets.map((asset) => {
              const isPositive = asset.change >= 0;
              return (
                <tr
                  key={asset.assetId}
                  className={`hover:bg-gray-50 transition ${isPositive ? "bg-green-50" : "bg-red-50"}`}
                >
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {asset.assetId}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-600">
                    {parseFloat(asset.quantity)?.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-600">
                    {formatCurrency(asset.avgBuyPrice)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-600">
                    {formatCurrency(asset.currentPrice)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {formatCurrency(asset.value)}
                  </td>
                  <td
                    className={`px-6 py-4 text-right text-sm font-semibold ${getChangeColor(asset.change)}`}
                  >
                    {isPositive ? "+" : ""}
                    {formatCurrency(asset.change)}
                  </td>
                  <td
                    className={`px-6 py-4 text-right text-sm font-semibold ${getChangeColor(asset.change)}`}
                  >
                    {isPositive ? "+" : ""}
                    {asset.changePercent?.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioAssetsTable;
