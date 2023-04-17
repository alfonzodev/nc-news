const ArticleCard = ({ article }) => {
  const handleClick = (e) => {
    // redirect user to /articles/:article_id
  };

  return (
    <li className="article-card" data-article-id={article.article_id}>
        <div className="title-container">
            <h1>{article.title}</h1>
        </div>
      <div className="img-container">
        <img src={article.article_img_url} />
      </div>
      <span className="author-span">Author: {article.author}</span>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
        className="btn btn-read-article"
      >
        Read Article
      </button>
    </li>
  );
};

export default ArticleCard;
