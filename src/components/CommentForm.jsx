import { useState } from "react";
import { postComment } from "../api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentForm = ({ articleId, setComments }) => {
  const [commentBody, setCommentBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // username is being hardcoded for now
    postComment(articleId, "weegembump", commentBody)
      .then(({ comment }) => {
        setIsSending(false);
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
      <ToastContainer />
    </>
  );
};

export default CommentForm;
