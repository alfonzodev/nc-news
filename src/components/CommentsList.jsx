import CommentCard from "./CommentCard";

const CommentsList = ({comments, setComments}) => {

  if (comments?.length === 0) {
    return <p>This article has no comments.</p>;
  } else {
    return (
      <ul className="comments-list">
        {comments.map((comment, index) => {
          return <CommentCard key={index} comment={comment} setComments={setComments}/>;
        })}
      </ul>
    );
  }
};

export default CommentsList;
