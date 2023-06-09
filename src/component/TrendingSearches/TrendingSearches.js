import { useState, useEffect } from "react";
import getTrendingTermsService from "../../services/getTrendingTermsService";
import Category from "../Category";

const TrendingSearches = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    getTrendingTermsService().then(setTrends);
  }, []);

  return <Category options={trends} />;
};

export default TrendingSearches;
