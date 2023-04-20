import { useContext, useState } from "react";
import { toast } from "react-toastify";

import { UserContext } from "../context/User";
import { postComment } from "../api";


const CommentForm = ({ articleId, setComments }) => {
  const [commentBody, setCommentBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  const { user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentBody.trim()) {
      setCommentBody("");
      return toast.warning("Invalid empty comment");
    }
    setIsSending(true);

    postComment(articleId, user, commentBody)
      .then(({ comment }) => {
        setIsSending(false);
        setCommentBody("");
        setComments((comments) => [comment, ...comments]);
      })
      .catch((err) => {
        setIsSending(false);
        toast.error("Comment posting failed");
      });
  };
  const handleChange = (e) => {
    setCommentBody(e.target.value);
  };
  return (
    <>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          className="comment-form-body"
          value={commentBody}
          onChange={handleChange}
          placeholder="Share your thoughts..."
          required={true}
        ></textarea>
        <input
          className="btn comment-form-btn"
          type="submit"
          value="comment"
          disabled={isSending}
        />
      </form>
    </>
  );
};

export default CommentForm;
