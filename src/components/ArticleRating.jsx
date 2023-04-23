import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";

import { UserContext } from "../context/User";

import { incrementArticleVotes } from "../api";

import errorMessages from "../utils/errorMessages";

const ArticleRating = ({ articleId, articleVotes }) => {
  const { user } = useContext(UserContext);

  const [votes, setVotes] = useState(articleVotes);
  const [incVotes, setIncVotes] = useState(0);
  const [hasVotedUp, setHasVotedUp] = useState(false);
  const [hasVotedDown, setHasVotedDown] = useState(false);

  useEffect(() => {
    // Prevent incrementArticleVotes() from executing on first render
    if (incVotes !== 0) {
      // If user not logged in
      if (!user) {
        // reset votes in UI
        setVotes(articleVotes);
        toast.error(errorMessages[401]);
        return;
      }

      incrementArticleVotes(articleId, incVotes)
        .then()
        .catch((err) => {
          toast.error(errorMessages[err.response.status]);
          // reset votes in UI
          setVotes(articleVotes);
        });
    }
  }, [incVotes, articleVotes, articleId, user]);

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
    </>
  );
};

export default ArticleRating;
