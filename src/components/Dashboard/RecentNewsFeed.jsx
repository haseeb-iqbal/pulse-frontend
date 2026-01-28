import { formatTimestamp } from "@utils/formatting";
import { getNewsCategoryColor } from "@utils/colors";

const RecentNewsFeed = ({ dashboardData }) => {
  if (
    !dashboardData ||
    !Array.isArray(dashboardData.recentNews) ||
    dashboardData.recentNews.length === 0
  ) {
    return null;
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
        <h2 className="text-lg font-semibold text-blue-900">Recent News</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {dashboardData.recentNews.slice(0, 5).map((news) => (
          <div key={news.id} className="p-6 hover:bg-gray-50 transition">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{news.summary}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getNewsCategoryColor(news.category)}`}
                  >
                    {news.category
                      ? news.category.charAt(0).toUpperCase() +
                        news.category.slice(1)
                      : "Unknown"}
                  </span>
                  <span className="text-xs text-gray-500">{news.source}</span>
                  <span className="text-xs text-gray-400">
                    {formatTimestamp(news.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNewsFeed;
