import { Link } from "react-router-dom";

const FeaturedCard = ({ article }) => {
  return (
    <div className="featured-card">
      <div className="featured-card-img-container">
        <img className="featured-card-img" src={article.article_img_url} alt="" />
        <span>Author: {article.author}</span>
      </div>
      <section className="featured-card-text">
        <h2>{article.title}</h2>
        <p className="hidden">{article.body.slice(0, 100)}...</p>
      </section>
      <Link className="read-more-link" to={`/articles/${article.article_id}`}>Read Article</Link>
    </div>
  );
};

export default FeaturedCard;
