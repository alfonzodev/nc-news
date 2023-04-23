import { useContext, useState } from "react";
import { toast } from "react-toastify";

import { UserContext } from "../context/User";
import { postComment } from "../api";
import errorMessages from "../utils/errorMessages";


const CommentForm = ({ articleId, setComments }) => {
  const { user } = useContext(UserContext);

  const [commentBody, setCommentBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentBody.trim()) {
      setCommentBody("");
      return toast.warning("Invalid: empty comment");
    }
    if(!user) return toast.error(errorMessages[401]);

    setIsSending(true);

    postComment(articleId, user?.username, commentBody)
      .then(({ comment }) => {
        setIsSending(false);
        setCommentBody("");
        setComments((comments) => [comment, ...comments]);
      })
      .catch((err) => {
        setIsSending(false);
        toast.error(errorMessages[err.response.status]);
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
