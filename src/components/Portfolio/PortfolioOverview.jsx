import { formatCurrency } from "@utils/formatting";
import { getChangeColor, getChangeBgColor } from "@utils/colors";

const PortfolioOverview = ({ portfolio }) => {
  if (!portfolio) return null;

  const { totalValue, totalChange, totalChangePercent } = portfolio;
  const isPositive = totalChange >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Total Portfolio Value
        </h3>
        <p className="text-4xl font-bold text-gray-900">
          {formatCurrency(totalValue)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Total Change (Amount)
        </h3>
        <p className={`text-4xl font-bold ${getChangeColor(totalChange)}`}>
          {isPositive ? "+" : ""}
          {formatCurrency(totalChange)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Total Change (Percent)
        </h3>
        <div className={`text-4xl font-bold ${getChangeColor(totalChange)}`}>
          {isPositive ? "+" : ""}
          {totalChangePercent?.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;
