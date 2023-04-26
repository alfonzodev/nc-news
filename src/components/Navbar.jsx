import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";

import { FaRegNewspaper } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxChevronDown } from "react-icons/rx";

import { UserContext } from "../context/User";
import { TopicsContext } from "../context/Topics";

import { logoutUser } from "../api";

import "../style/Navbar.css";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const { topics } = useContext(TopicsContext);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [profileClicked, setProfileClicked] = useState(false);
  const [topicsClicked, setTopicsClicked] = useState(false);

  const handleLogout = () => {
    setProfileClicked((profileClicked) => !profileClicked);
    removeCookie("user", { path: "/" });
    setUser(null);
    return logoutUser()
      .then(() => {
        return <Navigate to="/" replace={true} />;
      })
      .catch((err) => console.log(err));
  };

  const handleProfileClick = () => {
    setProfileClicked((profileClicked) => !profileClicked);
  };
  const handleTopicsClick = () => {
    setTopicsClicked((topicsClicked) => !topicsClicked);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to={"/"} id="logo-icon">
          <FaRegNewspaper />
        </Link>
        <div className="topics-dropdown">
          <div id="arrow-icon" onClick={handleTopicsClick}>
            <RxChevronDown />
          </div>
          <ul className={topicsClicked ? "nav-links active" : "nav-links"}>
            <Link key={"All"} to={"/articles"} onClick={handleTopicsClick}>
              <li className="nav-link">All</li>
            </Link>
            {topics.map((topic) => {
              return (
                <Link
                  key={topic.slug}
                  to={`/articles?topic=${topic.slug}`}
                  onClick={handleTopicsClick}
                >
                  <li className="nav-link">{topic.slug}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="profile-dropdown">
        <div id="person-icon" onClick={handleProfileClick}>
          <IoPersonCircleOutline />
        </div>
        <ul
          className={profileClicked ? "profile-links active" : "profile-links"}
        >
          {user ? (
            <Link to={"/"} onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <>
              <Link to={"/login"} onClick={handleProfileClick}>
                Login
              </Link>
              <Link to={"/register"} onClick={handleProfileClick}>
                Register
              </Link>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
