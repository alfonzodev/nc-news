import { useContext } from "react";
import { TopicsContext } from "../context/Topics";

import { Link } from "react-router-dom";

const TopicsSidebar = () => {
  const { topics } = useContext(TopicsContext);

  return (
    <section className="topics-sidebar">
      <div className="sidebar-title-container">
        <h1 className="heading-m">TOPICS</h1>
      </div>
      <ul>
        <Link key={"All"} to={"/articles"}>
          <li className="heading-m">All</li>
        </Link>
        {topics.map((topic) => {
          return (
            <Link key={topic.slug} to={`/articles?topic=${topic.slug}`}>
              <li className="heading-m">{topic.slug}</li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default TopicsSidebar;
