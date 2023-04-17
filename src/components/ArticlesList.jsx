import ArticleCard from "./ArticleCard";

const ArticlesList = ({ articles }) => {
  console.log(articles)
  return (
    <ul className="articles-list">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />
      })}
    </ul>
  );
};

export default ArticlesList;
