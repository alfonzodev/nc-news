import { useNavigate } from "react-router-dom";
import { timestampToDate } from "../utils/utils";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { deleteArticleById } from "../api";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ArticleCard = ({ article, editable, setMyArticles }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  let navigate = useNavigate();

  const handleClick = () => {
    navigate(`/articles/${article.article_id}`);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const deleteArticle = (id) => {
    handleMenuToggle();
    setIsDeleting(true);
    deleteArticleById(id)
      .then(() => {
        setIsDeleting(false);
        setMyArticles((articles) =>
          articles.filter((article) => article.article_id !== id)
        );
      })
      .catch((err) => {
        setIsDeleting(false);
        toast.error("Article could not be deleted.");
      });
  };

  return (
    <li className="article-card" data-article-id={article.article_id}>
      {editable && (
        <>
          <div
            className="menu-icon"
            style={{
              position: "absolute",
              top: "20px",
              right: "10px",
              cursor: "pointer",
              fontSize: "20px",
            }}
            onClick={handleMenuToggle}
          >
            <BiDotsVerticalRounded />
          </div>

          {isMenuOpen && (
            <div
              className="menu-options"
              style={{
                position: "absolute",
                top: "40px",
                right: "20px",
                width: "min(90%, 200px)",
                background: "white",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div
                onClick={() => {
                  deleteArticle(article.article_id);
                }}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  textAlign: "center",
                  color: "#f8333c",
                }}
              >
                Delete Article
              </div>
            </div>
          )}
        </>
      )}
      {isDeleting && <ClipLoader />}
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
