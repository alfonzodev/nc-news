import { Link } from "react-router-dom";

const FeaturedCard = ({ article }) => {
  return (
    <div className="border-t border-gray-300 text-gray-700 pt-1 pb-4">
      <Link to={`/articles/${article.article_id}`}>
        <img
          className="h-24 w-24 mr-2 mb-2 float-left object-cover"
          src={article.article_img_url}
          alt=""
        />
      </Link>

      <Link to={`/articles/${article.article_id}`}>
        <h2 className="font-extralight text-xl hover:text-highlight my-1">{article.title}</h2>
      </Link>
      <Link to={`/articles/${article.article_id}`}>
        <p className="text-sm font-light hover:text-highlight text-justify">
          - {article.body.slice(0, 200).concat("...")}
        </p>
      </Link>
    </div>
  );
};

export default FeaturedCard;
