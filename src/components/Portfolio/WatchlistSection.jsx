const WatchlistSection = ({ watchlist }) => {
  // Validate watchlist is an array
  if (!Array.isArray(watchlist) || watchlist.length === 0) return null;

  // Filter out invalid items (non-strings or empty strings)
  const validSymbols = watchlist.filter(
    (symbol) =>
      symbol && typeof symbol === "string" && symbol.trim().length > 0,
  );

  if (validSymbols.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Watchlist</h2>
      <div className="flex flex-wrap gap-3">
        {validSymbols.map((symbol, index) => (
          <div
            key={`${symbol}-${index}`}
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
