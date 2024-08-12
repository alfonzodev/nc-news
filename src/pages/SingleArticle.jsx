import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchArticleComments } from "../api";

import LoadingBanner from "../components/LoadingBanner";
import CommentCard from "../components/CommentCard.jsx";
import ArticleRating from "../components/ArticleRating";
import CommentForm from "../components/CommentForm";

import ErrorPage from "./ErrorPage";

import { timestampToDate } from "../utils/utils.js";

const SingleArticle = ({ topics }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchArticleById(article_id), fetchArticleComments(article_id)])
      .then(([articleResponse, commentsResponse]) => {
        setArticle(articleResponse.article);
        setComments(commentsResponse.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [article_id]);

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] py-10 max-w-screen-lg w-[95%] m-auto">
      <section className="bg-white p-6">
        {isLoading ? (
          <LoadingBanner typeOfData={"articles"} />
        ) : (
          <>
            <section className="mb-6">
              <header className="mb-4 border-b pb-4">
                <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
                <p className="font-light text-gray-800">
                  Posted on: {timestampToDate(article.created_at)}
                </p>
                <p className="text-gray-500">Author: {article.author}</p>
              </header>
              <div className="mb-4">
                <img
                  className="w-full h-auto object-cover rounded-sm"
                  src={article.article_img_url}
                  alt={`${article.topic}`}
                />
              </div>
              <div>
                <p className="text-lg font-extralight text-justify leading-relaxed">
                  {article.body}
                </p>
              </div>
            </section>
            <section className="my-6">
              <ArticleRating articleVotes={article.votes} articleId={article.article_id} />
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Comments</h2>
              <div className="space-y-4">
                <CommentForm articleId={article_id} setComments={setComments} />
                {comments?.length === 0 ? (
                  <p>This article has no comments.</p>
                ) : (
                  comments.map((comment, index) => {
                    return <CommentCard key={index} comment={comment} setComments={setComments} />;
                  })
                )}
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
};

export default SingleArticle;
