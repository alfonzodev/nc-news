import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../api";

import LoadingBanner from "../components/LoadingBanner";
import CommentsList from "../components/CommentsList";

import {timestampToDate} from "../utils/utils.js"

const SingleArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState(null);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const articleData = await fetchArticleById(article_id);
      setArticle(articleData.article);
      setIsLoading(false);
    };
    fetchData();
  }, [article_id]);

  if (isLoading) return <LoadingBanner typeOfData={"article"} />;

  return (
    <>
      <section className="article-section">
        <header className="article-header">
          <h1 className="heading-m">{article.title}</h1>
          <p className="article-date">Posted on: {timestampToDate(article.created_at)}</p>
          <p className="article-author">Author: {article.author}</p>
        </header>
        <div className="article-img-container">
          <img
            className="article-img"
            src={article.article_img_url}
            alt={`image about ${article.topic}`}
          />
        </div>
        <div className="article-body">
          <p>{article.body}</p>
        </div>
      </section>
      <section className="comments-section">
        <h2>Comments</h2>
        <CommentsList articleId={article_id}/>
      </section>
    </>
  );
};

export default SingleArticle;
