import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home">
      <h1>Home</h1>
      <Link to={"/articles"}>
        <button className="btn">View All Articles</button>
      </Link>
    </div>
  );
};

export default Home;
