import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/User";

const Dashboard = () => {
  let navigate = useNavigate();
  const { user } = useContext(UserContext);

  if (!user) return <Navigate to="/" />;

  return (
    <div className="min-h-[calc(100vh-4rem)] py-10 max-w-screen-lg w-[95%] m-auto">
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <img
            src={user.avatar_url}
            alt="user profile"
            className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-lg"
          />
        </div>
        <div className="text-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">@{user.username}</h1>
            <p className="text-xl text-gray-600">{user.name}</p>
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            onClick={() => {
              navigate("/profile/my-articles");
            }}
          >
            My Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
