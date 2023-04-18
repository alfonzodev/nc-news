import { useEffect, useState } from "react";
import { fetchArticles } from "../api";

import ArticlesList from "../components/ArticlesList";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const articlesData = await fetchArticles();
      setArticles(articlesData.articles);
    };
    fetchData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-banner">
        <p>Loading...</p>
        <p>Please wait while we fetch your articles.</p>
      </div>
    );
  }
  return(
    <div className="Articles">
        <h1 className="heading-l">Articles</h1>
        <ArticlesList articles={articles}/>
    </div>
  );
};

export default Articles;
