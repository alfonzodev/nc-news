import { Link } from "react-router-dom";

import TopicsSidebar from "../components/TopicsSidebar.jsx";

const Home = () => {
  return (
    <div className="home">
      <TopicsSidebar />
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
