import { Link } from "react-router-dom";

import TopicsSidebar from "../components/TopicsSidebar.jsx";

const Home = ({topics}) => {
  return (
    <div className="home">
      <TopicsSidebar topics={topics}/>
      <section className="home-container">
        <h1 className="heading-l">Home</h1>
        <Link to={"/articles"}>
          <button className="btn">View All Articles</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
