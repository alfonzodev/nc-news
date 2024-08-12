import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/User";

const Dashboard = () => {
  let navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  if (!user) return <Navigate to="/" />;

  return (
    <div className="min-h-[calc(100vh-4rem) py-10 max-w-screen-lg w-[95%] m-auto">
      <div className="profile-img">
        <img src={user.avatar_url} alt="user profile" />
      </div>
      <div className="dashboard-info">
        <div className="profile-info">
          <h1>@{user.username}</h1>
          <p>{user.name}</p>
        </div>
        <div className="options">
          <button
            className="btn"
            onClick={() => {
              navigate("/profile/my-articles");
            }}
          >
            My Articles
          </button>
          <button
            className="btn"
            onClick={() => {
              navigate("/articles/create");
            }}
          >
            Post Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
