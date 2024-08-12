import { useNavigate } from "react-router-dom";
import { timestampToDate } from "../utils/utils";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-sm group cursor-pointer hover:underline decoration-highlight"
      data-article-id={article.article_id}
      onClick={() => navigate(`/articles/${article.article_id}`)}
    >
      <img
        className="w-full h-36 sm:h-44 md:h-52 object-cover mb-1"
        src={article.img_url}
        alt={article.topic}
      />
      <h1 className="text-lg font-bold group-hover:text-highlight mb-2">{article.title}</h1>
      <span className="text-sm font-extralight text-gray-600">
        On: {timestampToDate(article.created_at)}
      </span>
    </div>
  );
};

export default ArticleCard;
