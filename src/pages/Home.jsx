import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { fetchArticles } from "../api.js";
import ErrorPage from "./ErrorPage.jsx";
import FeaturedCard from "../components/FeaturedCard.jsx";

const Home = ({ topics }) => {
  const [error, setError] = useState(null);
  const [featuredArticles, setFeaturedArticles] = useState(null);
  const [mostVotedArticle, setMostVotedArticle] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Get 5 most voted articles
    fetchArticles({ sort_by: "votes", limit: 5, order: "desc" })
      .then((data) => {
        setMostVotedArticle(data.articles[0]);
        setFeaturedArticles(data.articles.slice(1));
      })
      .catch((err) => setError(err));
  }, []);

  if (error) return <ErrorPage error={error} />;

  return (
    <main className="min-h-[calc(100vh-4rem) py-10 max-w-screen-lg w-[95%] m-auto">
      {/* Most Voted Article */}
      <section
        className="flex flex-col gap-4 w-full hover:text-highlight hover:underline cursor-pointer mb-5"
        onClick={() => navigate(`/articles/${mostVotedArticle.article_id}`)}
      >
        <h1 className=" py-2 text-3xl text-center font-bold">{mostVotedArticle?.title}</h1>
        <div className="flex items-center justify-center">
          <img src={mostVotedArticle?.article_img_url} alt="" />
        </div>
        <div>
          <p className="font-medium text-justify">
            {mostVotedArticle?.body.slice(0, 200).concat("...")}
          </p>
        </div>
      </section>
      <section className="grid grid-rows-1 md:grid-flow-col md:grid-rows-2 gap-x-5">
        {featuredArticles?.map((article) => {
          return <FeaturedCard key={article.article_id} article={article} editable={false} />;
        })}
      </section>
    </main>
  );
};

export default Home;
