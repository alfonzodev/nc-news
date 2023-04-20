import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { fetchArticles } from "../api";

import ArticlesList from "../components/ArticlesList";
import LoadingBanner from "../components/LoadingBanner";
import TopicsSidebar from "../components/TopicsSidebar";

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const topic = searchParams.get("topic");

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(topic)
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [topic]);

  return (
    <div className="articles">
      <TopicsSidebar />
      <section className="articles-container">
        {isLoading ? (
          <LoadingBanner typeOfData={"articles"} />
        ) : (
          <>
            <h1 className="heading-l">Articles</h1>
            <ArticlesList articles={articles} />
          </>
        )}
      </section>
    </div>
  );
};

export default Articles;
