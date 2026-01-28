// Custom hook for common data fetching pattern
import { useState, useEffect } from "react";

const useDataFetch = (fetchFn, transformFn = (data) => data) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchFn();
        const processedData = transformFn(response);
        setData(processedData);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useDataFetch;
