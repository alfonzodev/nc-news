import { useEffect, useState } from "react";
import { fetchMyArticles } from "../api.js";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import LoadingBanner from "../components/LoadingBanner.jsx";
import ArticleCard from "../components/ArticleCard.jsx";
import PostArticleModal from "../components/PostArticleModal.jsx";

const MyArticles = ({ topics }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostArticleModalOpen, setIsPostArticleModalOpen] = useState(false);
  const [myArticles, setMyArticles] = useState(null);

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
      <div className="flex items-center gap-3  lg:gap-4 mb-8">
        <h1 className=" text-2xl leading-none">My Articles</h1>
        <button
          className="bg-transparent border border-primary text-primary text-sm font-semibold py-1 px-2 rounded-sm hover:bg-slate-100 transition duration-300 self-start"
          onClick={() => setIsPostArticleModalOpen(!isPostArticleModalOpen)}
        >
          Post Article
        </button>
      </div>
      {/* Post Article Modal */}
      {isPostArticleModalOpen && (
        <PostArticleModal
          closeModal={() => setIsPostArticleModalOpen(false)}
          topics={topics}
          setMyArticles={setMyArticles}
        />
      )}

      {/* User's Posted Articles */}
      {myArticles?.length === 0 ? (
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-center text-lg font-light">You have no published articles.</h2>
        </section>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-10">
          {myArticles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </div>
      )}
    </div>
  );
};

export default MyArticles;
