import { FaRegNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";
import TopicsDropDown from "./TopicsDropDown";

const Header = () => {
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
        <Link>
          <button className="btn nav-btn">Login</button>
        </Link>
        <Link>
          <button className="btn nav-btn">Register</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
