import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PortfolioChart = ({ assets }) => {
  if (!assets || assets.length === 0) return null;

  const chartData = assets.map((asset) => ({
    name: asset.assetId,
    value: parseFloat(asset.value) || 0,
  }));

  // Color palette for chart
  const COLORS = [
    "#3b82f6", // blue
    "#ef4444", // red
    "#10b981", // green
    "#f59e0b", // amber
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#14b8a6", // teal
    "#f97316", // orange
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-blue-600">
            ${payload[0].value.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">
            {(
              (payload[0].value /
                chartData.reduce((sum, d) => sum + d.value, 0)) *
              100
            ).toFixed(1)}
            %
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Portfolio Allocation
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value, index }) => {
              const total = chartData.reduce((sum, d) => sum + d.value, 0);
              const percent = ((value / total) * 100).toFixed(1);
              return `${name} ${percent}%`;
            }}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => {
              const total = chartData.reduce((sum, d) => sum + d.value, 0);
              const item = chartData.find((d) => d.name === value);
              if (!item) return value;
              const percent = ((item.value / total) * 100).toFixed(1);
              return `${value} - $${item.value.toFixed(0)} (${percent}%)`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
