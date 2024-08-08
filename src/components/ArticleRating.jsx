import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { FaCircleUp, FaCircleDown } from "react-icons/fa6";

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
    <div className="w-full max-w-screen-sm flex gap-6 items-center ">
      <h2 className="text-xl">Article Rating</h2>
      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer text-xl text-gray-400 hover:text-gray-800"
          onClick={() => {
            decrementVote();
          }}
          disabled={hasVotedDown}
        >
          <FaCircleDown />
        </button>
        <span className="font-medium px-2">{votes}</span>
        <button
          className="cursor-pointer text-xl text-gray-400 hover:text-gray-800"
          onClick={() => {
            incrementVote();
          }}
          disabled={hasVotedUp}
        >
          <FaCircleUp />
        </button>
      </div>
    </div>
  );
};

export default ArticleRating;
