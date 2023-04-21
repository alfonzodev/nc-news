import { useContext, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

import { UserContext } from "../context/User";
import { timestampToDate } from "../utils/utils";
import { deleteCommentById } from "../api";

const CommentCard = ({ comment, setComments }) => {
  const [clicked, setClicked] = useState(false);
  const { user } = useContext(UserContext);

  const handleClick = (e) => {
    setClicked(true);
    if (user !== comment.author) {
      toast.error("You are not the author of this comment.");
    } else {
      deleteCommentById(comment.comment_id).then(() => {
        toast.success('Comment deleted!')
        setComments((comments) => {
          return comments.filter(
            (com) => com.comment_id !== comment.comment_id
          );
        });
      }).catch(err => {
        console.log(err)
      })
    }
    setClicked(false);
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
        <button
          className="btn-comment-del"
          disabled={clicked}
          onClick={handleClick}
        >
          <MdOutlineDeleteOutline />
        </button>
      </div>
    </li>
  );
};

export default CommentCard;
