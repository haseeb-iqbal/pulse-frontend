import { useState, useEffect } from "react";
import { getStocks, getCrypto } from "@services/api";
import AssetsTable from "@components/Assets/AssetsTable";
import FilterButton from "@components/Common/FilterButton";
import { ErrorState } from "@components/Common/StateComponents";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("all"); // all, stocks, crypto

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        setError(null);

        const [stocksResponse, cryptoResponse] = await Promise.all([
          getStocks(),
          getCrypto(),
        ]);

        // Validate and extract data
        const stocks = Array.isArray(stocksResponse?.data)
          ? stocksResponse.data
          : [];
        const crypto = Array.isArray(cryptoResponse?.data)
          ? cryptoResponse.data
          : [];

        // Combine and add asset type with validation
        const combinedAssets = [
          ...stocks
            .filter(
              (asset) => asset && typeof asset === "object" && asset.symbol,
            )
            .map((asset) => ({ ...asset, type: "stock" })),
          ...crypto
            .filter(
              (asset) => asset && typeof asset === "object" && asset.symbol,
            )
            .map((asset) => ({ ...asset, type: "crypto" })),
        ];

        setAssets(combinedAssets);
      } catch (err) {
        setError(err.message || "Failed to fetch assets");
        console.error("Assets fetch error:", err);
        setAssets([]);
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

      {error && <ErrorState error={error} />}

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <FilterButton
          label="All Assets"
          count={assets.length}
          isActive={filterType === "all"}
          onClick={() => setFilterType("all")}
        />
        <FilterButton
          label="Stocks"
          count={assets.filter((a) => a.type === "stock").length}
          isActive={filterType === "stocks"}
          onClick={() => setFilterType("stocks")}
        />
        <FilterButton
          label="Crypto"
          count={assets.filter((a) => a.type === "crypto").length}
          isActive={filterType === "crypto"}
          onClick={() => setFilterType("crypto")}
        />
      </div>

      <AssetsTable assets={filteredAssets} loading={loading} />
    </div>
  );
};

export default Assets;
