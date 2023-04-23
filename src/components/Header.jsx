import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { useCookies } from "react-cookie";

import { FaRegNewspaper } from "react-icons/fa";

import TopicsDropDown from "./TopicsDropDown";

import { UserContext } from "../context/User";

import { logoutUser } from "../api";

const Header = () => {
  const {user, setUser} = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const handleLogout = () => {
    removeCookie('user', { path: '/' });
    setUser(null);
    return logoutUser()
      .then(() => {
        return <Navigate to="/" replace={true} />
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to={"/"}>
          <div className="logo-container">
            <span id="logo-icon">
              <FaRegNewspaper />
            </span>
            <span id="logo-text">NC News</span>
          </div>
        </Link>
        <TopicsDropDown />
      </div>

      <div className="nav-btn-container">
        {user ? (
          <button onClick={handleLogout} className="btn nav-btn">
            Logout
          </button>
        ) : (
          <>
            <Link to={"/login"}>
              <button className="btn nav-btn">Login</button>
            </Link>
            <Link to={"/register"}>
              <button className="btn nav-btn">Register</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
