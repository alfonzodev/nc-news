import { useState } from "react";
import { loginUser } from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password).then((data) => {
      console.log(data)
    }).catch(({response}) => console.log(response?.data));
  };

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
        <input type="submit" className="btn-submit" value="Login"/>
      </form>
    </div>
  );
};

export default Login;
