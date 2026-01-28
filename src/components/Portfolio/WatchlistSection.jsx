const WatchlistSection = ({ watchlist }) => {
  if (!watchlist || watchlist.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Watchlist</h2>
      <div className="flex flex-wrap gap-3">
        {watchlist.map((symbol) => (
          <div
            key={symbol}
            className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-semibold text-blue-700 hover:bg-blue-100 transition cursor-pointer"
          >
            {symbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistSection;
