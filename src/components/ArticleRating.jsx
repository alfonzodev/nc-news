import { useState, useEffect } from "react";
import { incrementArticleVotes } from "../api";

const ArticleRating = ({articleId, articleVotes}) => {
    const [votes, setVotes] = useState(articleVotes);
    const [hasVotedUp, setHasVotedUp] = useState(null);
    const [increment, setIncrement] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const postData = async () => {
            const response = await incrementArticleVotes(articleId, increment);
            if(response.hasOwnProperty('msg')) setError(response.msg)
        }
        postData();
    }, [votes, increment, articleId])

    const handleClick = (vote) => {
        if(hasVotedUp === false && vote === 1){
            setVotes((votes) => votes + vote);
            setIncrement(vote)
            setHasVotedUp(true)
        }
        else if(hasVotedUp === true && vote === -1){
            setVotes((votes) => votes + vote);
            setIncrement(vote)
            setHasVotedUp(false)
        }else if(hasVotedUp === null && vote === 1){
            setVotes((votes) => votes + vote);
            setIncrement(vote)
            setHasVotedUp(true)
        }else if(hasVotedUp === null && vote === -1){
            setVotes((votes) => votes + vote);
            setIncrement(vote)
            setHasVotedUp(false)
        }
        console.log(votes, "<-- votes");
    }
  return (<>
    <h2>Article Votes</h2>
    {error && <p>{error}</p>}
    <div className="article-rating">
        <button className="btn-article-vote" onClick={() => {handleClick(-1)}}>-</button>
        <input type="text" className="article-vote-count" value={votes} disabled={true}/>
        <button className="btn-article-vote" onClick={() => {handleClick(1)}}>+</button>
    </div>
  </>
  )
}

export default ArticleRating