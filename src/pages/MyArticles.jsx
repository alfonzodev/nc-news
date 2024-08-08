import { useEffect, useState } from "react";
import { fetchMyArticles } from "../api.js";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import FeaturedCard from "../components/FeaturedCard.jsx";
import LoadingBanner from "../components/LoadingBanner.jsx";
import ArticleCard from "../components/ArticleCard.jsx";

const MyArticles = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [myArticles, setMyArticles] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchMyArticles()
      .then((data) => {
        setMyArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => setError(err));
  }, []);

  if (error) return <ErrorPage error={error} />;

  if (isLoading) return <LoadingBanner typeOfData={"articles"} />;

  return (
    <div className="min-h-[calc(100vh-4rem) py-10 max-w-screen-lg w-[95%] m-auto">
      <h1 className="heading-l" style={{ textAlign: "center", marginBottom: "2rem " }}>
        My Articles
      </h1>
      {myArticles?.length === 0 ? (
        <section className="no-articles-container">
          <h2 style={{ textAlign: "center" }}>You have no published articles.</h2>
          <button
            className="btn"
            onClick={() => {
              navigate("/articles/create");
            }}
          >
            Create New Article
          </button>
        </section>
      ) : (
        <ul className="articles-list">
          {myArticles?.map((article) => {
            return (
              <ArticleCard
                key={article.article_id}
                article={article}
                editable={true}
                setMyArticles={setMyArticles}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MyArticles;
