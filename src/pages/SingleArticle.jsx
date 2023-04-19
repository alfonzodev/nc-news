import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchArticleComments } from "../api";

import LoadingBanner from "../components/LoadingBanner";
import CommentsList from "../components/CommentsList";
import ArticleRating from "../components/ArticleRating";
import CommentForm from "../components/CommentForm";

import {timestampToDate} from "../utils/utils.js"

const SingleArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  const { article_id } = useParams();

  const fetchData = () => {
    return Promise.all([fetchArticleById(article_id), fetchArticleComments(article_id)]);
  };
  useEffect(() => {
    setIsLoading(true);
    fetchData().then(([articleResponse, commentsResponse]) => {
      setArticle(articleResponse.article);
      setComments(commentsResponse.comments);
      setIsLoading(false);
    })
  }, [article_id]);

  if (isLoading) return <LoadingBanner typeOfData={"article"} />;

  return (
    <div className="single-article">
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
            alt={`${article.topic}`}
          />
        </div>
        <div className="article-body">
          <p>{article.body}</p>
        </div>
      </section>
      <section className="article-votes-section">
        <ArticleRating articleVotes={article.votes} articleId={article.article_id}/>
      </section>
      <section className="comments-section">
        <h2>Comments</h2>
        <CommentForm articleId={article_id} setComments={setComments}/>
        <CommentsList comments={comments}/>
      </section>
    </div>
  );
};

export default SingleArticle;
