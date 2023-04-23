import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

import Spinner from "../components/Spinner";

import {UserContext} from "../context/User";

import { loginUser } from "../api";


const Login = () => {
  const {user, setUser} = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If user is logged in redirect to home page
  if(user) return <Navigate to="/" replace={true}/>

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    loginUser(email, password)
      .then(({user}) => {
        setCookie('user', user, {maxAge: 24 * 60 * 60, path: '/'})
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
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          required={true}
          placeholder="Enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          required={true}
          placeholder="Enter password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" className="btn btn-submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
