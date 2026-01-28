import { formatCurrency } from "../../utils/formatting";
import { getChangeColor, getChangeBgColor } from "../../utils/colors";

const PortfolioSummaryCard = ({ portfolioData }) => {
  if (!portfolioData) {
    return null;
  }

  const isPositive = portfolioData.totalChange >= 0;
  const changeColor = getChangeColor(portfolioData.totalChange);
  const changeBgColor = getChangeBgColor(portfolioData.totalChange);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Portfolio Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Portfolio Value */}
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600 text-sm font-medium mb-2">
            Total Portfolio Value
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {formatCurrency(portfolioData.totalValue)}
          </p>
        </div>

        {/* Total Change */}
        <div className={`border rounded-lg p-4 ${changeBgColor}`}>
          <p className="text-gray-600 text-sm font-medium mb-2">Total Change</p>
          <div className="flex items-baseline gap-3">
            <p className={`text-3xl font-bold ${changeColor}`}>
              {formatCurrency(portfolioData.totalChange)}
            </p>
            <p className={`text-lg font-semibold ${changeColor}`}>
              ({isPositive ? "+" : ""}
              {portfolioData.totalChangePercent?.toFixed(2)}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummaryCard;
