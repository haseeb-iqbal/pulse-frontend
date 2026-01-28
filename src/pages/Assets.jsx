import { useState, useEffect } from "react";
import { getStocks, getCrypto } from "@services/api";
import AssetsTable from "@components/Assets/AssetsTable";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("all"); // all, stocks, crypto

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        const [stocksResponse, cryptoResponse] = await Promise.all([
          getStocks(),
          getCrypto(),
        ]);

        const stocks = stocksResponse?.data || [];
        const crypto = cryptoResponse?.data || [];

        // Combine and add asset type
        const combinedAssets = [
          ...stocks.map((asset) => ({ ...asset, type: "stock" })),
          ...crypto.map((asset) => ({ ...asset, type: "crypto" })),
        ];

        setAssets(combinedAssets);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch assets");
        console.error("Assets fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // Filter assets based on selected filter
  const filteredAssets = assets.filter((asset) => {
    if (filterType === "stocks") return asset.type === "stock";
    if (filterType === "crypto") return asset.type === "crypto";
    return true;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Assets</h1>

      {error && (
        <div className="bg-red-50 p-6 rounded-lg shadow border border-red-200 mb-6">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilterType("all")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterType === "all"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          All Assets ({assets.length})
        </button>
        <button
          onClick={() => setFilterType("stocks")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterType === "stocks"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Stocks ({assets.filter((a) => a.type === "stock").length})
        </button>
        <button
          onClick={() => setFilterType("crypto")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterType === "crypto"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Crypto ({assets.filter((a) => a.type === "crypto").length})
        </button>
      </div>

      <AssetsTable assets={filteredAssets} loading={loading} />
    </div>
  );
};

export default Assets;
