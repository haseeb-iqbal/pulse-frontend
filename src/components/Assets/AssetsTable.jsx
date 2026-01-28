import { formatCurrency } from "@utils/formatting";
import { getChangeColor, getChangeBgColor } from "@utils/colors";

const AssetsTable = ({ assets, loading }) => {
  const formatVolume = (volume) => {
    if (!volume) return "N/A";
    if (volume >= 1000000000) {
      return (volume / 1000000000).toFixed(2) + "B";
    }
    if (volume >= 1000000) {
      return (volume / 1000000).toFixed(2) + "M";
    }
    if (volume >= 1000) {
      return (volume / 1000).toFixed(2) + "K";
    }
    return volume.toString();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Loading assets...</p>
      </div>
    );
  }

  if (!assets || assets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">No assets available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Symbol
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Name
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                Current Price
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                Change
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                Volume
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assets.map((asset) => {
              const isPositive = asset.changePercent >= 0;
              const changeColor = getChangeColor(asset.changePercent);

              return (
                <tr
                  key={asset.id}
                  className={`hover:bg-gray-50 transition ${getChangeBgColor(asset.changePercent)}`}
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">
                      {asset.symbol}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{asset.name}</p>
                      {asset.sector && (
                        <p className="text-xs text-gray-500">{asset.sector}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(asset.currentPrice)}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <p className={`font-semibold ${changeColor}`}>
                        {isPositive ? "+" : ""}
                        {asset.changeAmount?.toFixed(2)}
                      </p>
                      <p className={`text-sm font-medium ${changeColor}`}>
                        ({isPositive ? "+" : ""}
                        {asset.changePercent?.toFixed(2)}%)
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-medium text-gray-900">
                      {formatVolume(asset.volume)}
                    </p>
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

export default AssetsTable;
