import { useState } from "react";
import { toast } from "react-toastify";

import { loginUser } from "../api";

import Spinner from "../components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    loginUser(email, password)
      .then((data) => {
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
