import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ArticleCard from "./ArticleCard";
import LoadingBanner from "./LoadingBanner";


import { fetchArticles } from "../api";

const ArticlesList = ({setError}) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const topic = searchParams.get("topic");
  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(topic, sort_by, order)
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [topic, sort_by, order, searchParams, setError]);

  if(isLoading) return <LoadingBanner typeOfData={"articles"} />
  
  return (
    <ul className="articles-list">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />
      })}
    </ul>
  );
};

export default ArticlesList;
