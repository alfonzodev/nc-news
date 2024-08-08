import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

import { UserContext } from "../context/User";
import { registerUser } from "../api";
import Spinner from "../components/Spinner";
import { validateUsername } from "../utils/utils";

const Register = () => {
  const { user, setUser } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const [isLoading, setIsLoading] = useState(false);
  const [usernameInvalid, setUsernameInvalid] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordCf, setPasswordCf] = useState("");

  // If user is logged in redirect to home page
  if (user) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordCf) {
      return toast.error("Passwords do not match", {
        position: "bottom-right",
      });
    }
    if (!validateUsername(username)) {
      return setUsernameInvalid(true);
    }
    setIsLoading(true);
    const name = firstName + " " + lastName;
    return registerUser({ name, username, email, password })
      .then(({ user }) => {
        setUser(user);
        setCookie("user", user, { maxAge: 24 * 60 * 60, path: "/" });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.msg, { position: "bottom-right" });
      });
  };
  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-100 py-10">
      <div className="max-w-md bg-white w-full rounded-lg shadow-md flex flex-col p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="off"
              placeholder="Enter first name"
              required={true}
              className="block w-full border rounded-md px-3 py-2 mt-1 shadow-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700 text-sm">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="off"
              placeholder="Enter last name"
              required={true}
              className="w-full border rounded-md mt-1 px-3 py-2 shadow-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm text-gray-700">
              Username
            </label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              placeholder="Choose a username..."
              required={true}
              className="block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:border-primary"
            />
          </div>
          {usernameInvalid && (
            <p className="invalid-username-error">
              Username must contain 8-25 characters, no capital letters and must not start with a
              number
            </p>
          )}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required={true}
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="block w-full border rounded-md mt-1 p-3 py-2 shadow-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              required={true}
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border rounded-md mt-1 p-3 py-2 shadow-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-gray-700 block">
              Confirm Password
            </label>
            <input
              name="passwordcf"
              type="password"
              required={true}
              placeholder="Confirm password..."
              value={passwordCf}
              onChange={(e) => setPasswordCf(e.target.value)}
              className="block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white font-medium py-2 px-3 border border-transparent rounded-md  bg-green-500 hover:bg-green-600 focus:outline-none shadow-sm"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
