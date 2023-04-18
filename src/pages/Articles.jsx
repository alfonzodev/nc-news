import { useEffect, useState } from "react";
import { fetchArticles } from "../api";

import ArticlesList from "../components/ArticlesList";
import LoadingBanner from "../components/LoadingBanner";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetchArticles();
      setArticles(response.articles);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) return <LoadingBanner typeOfData={'articles'}/>
  return(
    <div className="articles">
        <h1 className="heading-l">Articles</h1>
        <ArticlesList articles={articles}/>
    </div>
  );
};

export default Articles;
