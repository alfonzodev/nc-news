import { useContext, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

import { UserContext } from "../context/User";
import { timestampToDate } from "../utils/utils";
import { deleteCommentById } from "../api";

const CommentCard = ({ comment, setComments }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  const handleClick = (e) => {
    if (user !== comment.author) {
      toast.error("You are not the author of this comment.");
    } else {
      setIsLoading(true)
      deleteCommentById(comment.comment_id)
        .then(() => {
          setComments((comments) => {
            return comments.filter(
              (com) => com.comment_id !== comment.comment_id
            );
          });
          setIsLoading(false);
          toast.success("Comment deleted!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <li className="comment-card">
      <div className="comment-header">
        <p className="comment-author">{comment.author}</p>
        <p className="comment-date">{timestampToDate(comment.created_at)}</p>
      </div>
      <div className="comment-container">
        <div className="comment-voting-container">
          {/* comment voting functionality */}
        </div>
        <div className="comment-body">
          <p>{comment.body}</p>
        </div>
        {!isLoading ? (
          <button
            className="btn-comment-del"
            onClick={handleClick}
          >
            <MdOutlineDeleteOutline />
          </button>
        ) : (
          <ClipLoader className="spinner-comment-del" color="#1b9db4" />
        )}
      </div>
    </li>
  );
};

export default CommentCard;
