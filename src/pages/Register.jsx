import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

import { UserContext } from "../context/User";
import { registerUser } from "../api";
import Spinner from "../components/Spinner";
import { validateUsername } from "../utils/utils";

const Register = () => {
  const {user, setUser} = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [isLoading, setIsLoading] = useState(false);
  const [usernameInvalid, setUsernameInvalid] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordCf, setPasswordCf] = useState("");

  // If user is logged in redirect to home page
  if(user) return <Navigate to="/" replace={true}/>

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
      .then(({user}) => {
        setUser(user);
        setCookie('user', user, {maxAge: 24 * 60 * 60 })
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.msg, { position: "bottom-right" });
      });
  };
  if (isLoading) return <Spinner />;

  return (
    <div className="registration">
      <form className="registration-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="off"
          placeholder="Enter first name"
          required={true}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          autoComplete="off"
          placeholder="Enter last name"
          required={true}
        />
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
          placeholder="Choose a username..."
          required={true}
        />
        {usernameInvalid && (
          <p className="invalid-username-error">
            Username must contain 8-25 characters, no capital letters and must
            not start with a number
          </p>
        )}
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
        <label htmlFor="password">Confirm Password</label>
        <input
          name="passwordcf"
          type="password"
          required={true}
          placeholder="Confirm password..."
          value={passwordCf}
          onChange={(e) => setPasswordCf(e.target.value)}
        />
        <input type="submit" className="btn btn-submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
