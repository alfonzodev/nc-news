import { useNavigate } from "react-router-dom";
import { timestampToDate } from "../utils/utils";

const ArticleCard = ({ article }) => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/articles/${article.article_id}`);
  };

  return (
    <li className="article-card" data-article-id={article.article_id}>
        <div className="title-container">
            <h1>{article.title}</h1>
        </div>
      <div className="img-container">
        <img src={article.article_img_url} alt={article.topic} />
      </div>
      <div className="article-card-info">
      <span className="info-span">By: {article.author}</span>
      <span className="info-span">{timestampToDate(article.created_at)}</span>
      </div>
      <button
        onClick={() => {
          handleClick();
        }}
        className="btn btn-read-article"
      >
        Read Article
      </button>
    </li>
  );
};

export default ArticleCard;
