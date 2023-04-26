import { Link } from "react-router-dom";

import TopicsSidebar from "../components/TopicsSidebar.jsx";
import { useEffect, useState } from "react";
import { fetchArticles } from "../api.js";
import ErrorPage from "./ErrorPage.jsx";
import FeaturedCard from "../components/FeaturedCard.jsx";

const Home = ({topics}) => {
  const [error, setError] = useState(null);
  const [featuredArticles, setFeaturedArticles] = useState(null);

  useEffect(() => {
    // Get 3 most voted articles
    fetchArticles({sort_by: "votes", limit: 3, order: "desc"}).then((data) => {
      setFeaturedArticles(data.articles);
    }).catch(err => setError(err))
  },[])

  if(error) return <ErrorPage error={error}/>
  
  return (
    <div className="home">
      <TopicsSidebar topics={topics}/>
      <section className="home-container">
        <h1 className="heading-l">Featured Articles</h1>
        <ul className="featured-list">
          {featuredArticles?.map(article => {
            return <FeaturedCard key={article.article_id} article={article}/>
          })}
        </ul>
        <Link to={"/articles"} className="home-articles-link">View All Articles</Link>
      </section>
    </div>
  );
};

export default Home;
