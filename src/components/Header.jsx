import { FaRegNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="navbar">
      <Link to={"/"}>
        <div className="logo-container">
          <span id="logo-icon">
            <FaRegNewspaper />
          </span>
          <span id="logo-text">NC News</span>
        </div>
      </Link>
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
