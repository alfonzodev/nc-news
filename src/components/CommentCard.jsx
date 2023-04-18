import { timestampToDate } from "../utils/utils";

const CommentCard = ({ comment }) => {
  return (
    <li className="comment-card">
      <div className="comment-header">
        <span className="author-span">{comment.author}</span>
        <span className="comment-date">{timestampToDate(comment.created_at)}</span>
      </div>
      <div className="comment-container">
        <div className="comment-voting-container">
          {/* comment voting functionality */}
        </div>
        <div className="comment-body">
          <p>{comment.body}</p>
        </div>
      </div>
    </li>
  );
};

export default CommentCard;
