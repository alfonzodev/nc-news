import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RxChevronDown } from "react-icons/rx";

import { TopicsContext } from "../context/Topics";

const TopicsDropDown = () => {
  const [clicked, setClicked] = useState(false);
  const { topics } = useContext(TopicsContext);

  const handleClick = () => {
    setClicked((clicked) => !clicked);
  };

  return (
    <div className="topics-dropdown">
      <RxChevronDown className="topics-arrow" onClick={handleClick} />
      {clicked ? (
        <ul className="topics-dropdown-list">
          <Link key={"All"} to={"/articles"}>
            <li className="heading-s">All</li>
          </Link>
          {topics.map((topic) => {
            return (
              <Link key={topic.slug} to={`/articles?topic=${topic.slug}`}>
                <li className="heading-s">{topic.slug}</li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TopicsDropDown;
