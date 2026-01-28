import { useState, useEffect } from "react";
import { getNews } from "@services/api";
import NewsFeed from "@components/News/NewsFeed";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await getNews();
        const newsData = response?.data?.data || [];
        setNews(newsData);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(newsData.map((item) => item.category)),
        ];
        setCategories(uniqueCategories.sort());
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch news");
        console.error("News fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Filter news based on selected category
  const filteredNews =
    filterCategory === "all"
      ? news
      : news.filter((item) => item.category === filterCategory);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">News</h1>

      {error && (
        <div className="bg-red-50 p-6 rounded-lg shadow border border-red-200 mb-6">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterCategory === "all"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          All News ({news.length})
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterCategory === category
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)} (
            {news.filter((item) => item.category === category).length})
          </button>
        ))}
      </div>

      <NewsFeed news={filteredNews} loading={loading} categories={categories} />
    </div>
  );
};

export default News;
