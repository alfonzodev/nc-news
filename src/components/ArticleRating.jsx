import { useState, useEffect } from "react";
import { incrementArticleVotes } from "../api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ArticleRating = ({ articleId, articleVotes }) => {
  const [votes, setVotes] = useState(articleVotes);
  const [incVotes, setIncVotes] = useState(0);
  const [hasVotedUp, setHasVotedUp] = useState(false);
  const [hasVotedDown, setHasVotedDown] = useState(false);

  useEffect(() => {
    // Prevent incrementArticleVotes() from executing on first render
    if (incVotes !== 0) {
      incrementArticleVotes(articleId, incVotes)
        .then()
        .catch((err) => {
          toast.error("Article voting failed.");
          // reset votes in UI
          setVotes(articleVotes);
        });
    }
  }, [incVotes, articleVotes, articleId]);

  const incrementVote = () => {
    setVotes((votes) => votes + 1);
    setIncVotes(1);
    setHasVotedUp(true);
    setHasVotedDown(false);
  };
  
  const decrementVote = () => {
    setVotes((votes) => votes - 1);
    setIncVotes(-1);
    setHasVotedDown(true);
    setHasVotedUp(false);
  };

  return (
    <>
      <h2>Article Votes</h2>
      <div className="article-rating">
        <button
          className="btn-article-vote"
          onClick={() => {
            decrementVote();
          }}
          disabled={hasVotedDown}
        >
          -
        </button>
        <input
          type="text"
          className="article-vote-count"
          value={votes}
          disabled={true}
        />
        <button
          className="btn-article-vote"
          onClick={() => {
            incrementVote();
          }}
          disabled={hasVotedUp}
        >
          +
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default ArticleRating;
