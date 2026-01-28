import { formatTimestamp } from "@utils/formatting";
import { getNewsCategoryColor } from "@utils/colors";
import { capitalize } from "@utils/stringUtils";

const NewsCard = ({ news }) => {
  // Validate news object
  if (!news || typeof news !== "object") return null;

  // Validate required fields
  if (!news.title || !news.summary) return null;

  const getImpactColor = (impact) => {
    const colors = {
      critical: "text-red-700 bg-red-50 border-red-200",
      high: "text-orange-700 bg-orange-50 border-orange-200",
      medium: "text-yellow-700 bg-yellow-50 border-yellow-200",
      low: "text-green-700 bg-green-50 border-green-200",
      default: "text-gray-700 bg-gray-50 border-gray-200",
    };
    return colors[impact?.toLowerCase()] || colors.default;
  };

  const getSentimentColor = (sentiment) => {
    const num = Number(sentiment);
    if (!Number.isFinite(num)) return "text-gray-600";
    if (num >= 0.7) return "text-green-600";
    if (num >= 0.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition p-6 border-l-4 border-l-blue-500">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {news.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{news.summary}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getNewsCategoryColor(news.category)}`}
        >
          {capitalize(news.category)}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getImpactColor(news.impact)}`}
        >
          {news.impact ? capitalize(news.impact) : "Unknown"}
        </span>
        {news.sentiment !== undefined && news.sentiment !== null && (
          <span
            className={`text-xs font-medium ${getSentimentColor(news.sentiment)}`}
          >
            Sentiment: {(Number(news.sentiment) * 100).toFixed(0)}%
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 border-t pt-3">
        <span className="font-medium">{news.source}</span>
        <span>{formatTimestamp(news.timestamp)}</span>
        {news.affectedAssets && news.affectedAssets.length > 0 && (
          <span className="text-gray-600">
            Assets: {news.affectedAssets.join(", ")}
          </span>
        )}
      </div>

      {news.tags && news.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {news.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsCard;
