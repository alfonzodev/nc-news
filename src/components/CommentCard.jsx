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
    if (user.username !== comment.author) {
      toast.error("You are not the author of this comment.");
    } else {
      setIsLoading(true);
      deleteCommentById(comment.comment_id)
        .then(() => {
          setComments((comments) => {
            return comments.filter((com) => com.comment_id !== comment.comment_id);
          });
          setIsLoading(false);
          toast.success("Comment deleted!");
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <div className="p-1">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{comment.author}</span>
        <span className="text-sm font-extralight">{timestampToDate(comment.created_at)}</span>
      </div>
      <div className="relative pr-4">
        <p className="font-light break-words">{comment.body}</p>

        {/* Delete Comment Functionality*/}
        {comment.author === user?.username && !isLoading ? (
          <button
            className="absolute bottom-1 right-1 hover:text-red-600 text-lg"
            onClick={handleClick}
          >
            <MdOutlineDeleteOutline />
          </button>
        ) : comment.author === user?.username && isLoading ? (
          <ClipLoader className="absolute bottom-1 right-1" color="#003366" size={15} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
