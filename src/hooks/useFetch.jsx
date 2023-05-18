import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
function useFetch(url) {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);
    fetchDataFromApi(url)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError("Something went wrong!");
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
