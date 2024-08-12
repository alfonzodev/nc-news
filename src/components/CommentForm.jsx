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
    if (!user) return toast.error(errorMessages[401]);

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
    <div className="w-full border-2 border-transparent focus-within:border-primary shadow-md shadow-gray-400 rounded-md p-2">
      {/* Show User Avatar and Name if Logged in */}
      {user && (
        <div className="flex justify-start items-center gap-2 mb-2">
          <img
            src={user.avatar_url}
            alt="user profile"
            className="w-8 border border-gray-400 rounded-full"
          />
          <span className="text-sm font-medium">{user.name}</span>
        </div>
      )}

      <form className="" onSubmit={handleSubmit}>
        <textarea
          className="w-full focus:outline-none p-1 resize-none overflow-y-auto min-h-20"
          value={commentBody}
          onChange={handleChange}
          placeholder="Share your thoughts..."
          required={true}
        ></textarea>
        <hr />
        <div className="flex justify-end mt-2">
          <input
            className="py-2 px-4 border-transparent bg-blue-600 hover:bg-blue-800 text-sm text-white font-medium rounded-sm cursor-pointer"
            type="submit"
            value="Comment"
            disabled={isSending}
          />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
