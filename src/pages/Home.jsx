import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to={"/articles"}>
        <button>View All Articles</button>
      </Link>
    </>
  );
};

export default Home;
