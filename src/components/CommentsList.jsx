import { useEffect, useState } from "react";
import { fetchArticleComments } from "../api";

import LoadingBanner from "./LoadingBanner";
import CommentCard from "./CommentCard";

const CommentsList = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const commentsData = await fetchArticleComments(articleId);
      setComments(commentsData.comments);
      setIsLoading(false);
    };
    fetchData();
  }, [articleId]);

  if (isLoading) return <LoadingBanner typeOfData={"comments"} />;

  if (comments.length === 0) {
    return <p>This article has no comments.</p>;
  } else {
    return (
      <ul className="comments-list">
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })}
      </ul>
    );
  }
};

export default CommentsList;
