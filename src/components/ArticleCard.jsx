import { useNavigate } from "react-router-dom";

const ArticleCard = ({ article }) => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/articles/${article.article_id}`);
  };

  return (
    <li className="article-card" data-article-id={article.article_id}>
        <div className="title-container">
            <h1 className="heading-m">{article.title}</h1>
        </div>
      <div className="img-container">
        <img src={article.article_img_url} alt={article.topic} />
      </div>
      <span className="author-span">Author: {article.author}</span>
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
