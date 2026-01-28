import NewsCard from "./NewsCard";

const NewsFeed = ({ news, loading, categories }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Loading news...</p>
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">No news available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {news.map((newsItem, index) => (
        <NewsCard key={newsItem.id || `news-${index}`} news={newsItem} />
      ))}
    </div>
  );
};

export default NewsFeed;
