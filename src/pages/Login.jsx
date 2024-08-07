import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

import Spinner from "../components/Spinner";

import { UserContext } from "../context/User";

import { loginUser } from "../api";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If user is logged in redirect to home page
  if (user) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    loginUser(email, password)
      .then(({ user }) => {
        setCookie("user", user, { maxAge: 24 * 60 * 60, path: "/" });
        setUser(user);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.msg, { position: "bottom-right" });
      });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-700 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none"
          >
            Log in
          </button>
          <hr />
          <button
            className="w-full px-4 py-2 font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none"
            onClick={() => navigate("/register")}
          >
            Create a New Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
