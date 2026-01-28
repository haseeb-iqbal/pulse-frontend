import { useState, useEffect } from "react";
import { getNews } from "@services/api";
import NewsFeed from "@components/News/NewsFeed";
import FilterButton from "@components/Common/FilterButton";
import { ErrorState } from "@components/Common/StateComponents";

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

      {error && <ErrorState error={error} />}

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <FilterButton
          label="All News"
          count={news.length}
          isActive={filterCategory === "all"}
          onClick={() => setFilterCategory("all")}
        />
        {categories.map((category) => (
          <FilterButton
            key={category}
            label={category.charAt(0).toUpperCase() + category.slice(1)}
            count={news.filter((item) => item.category === category).length}
            isActive={filterCategory === category}
            onClick={() => setFilterCategory(category)}
          />
        ))}
      </div>

      <NewsFeed news={filteredNews} loading={loading} categories={categories} />
    </div>
  );
};

export default News;
