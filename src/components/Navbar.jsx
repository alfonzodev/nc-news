import { Navigate, useNavigate, useSearchParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { capitalizeString } from "../utils/utils";

import { FaRegNewspaper, FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

import { UserContext } from "../context/User";

import { logoutUser } from "../api";

import { MenuContext } from "../context/Menu";

import DropDownMenu from "./ui/DropDown/DropDownMenu";

const Navbar = ({ topics }) => {
  const { user, setUser } = useContext(UserContext);

  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const [searchParams, _] = useSearchParams();
  const [scrolling, setScrolling] = useState(false);

  const currentTopic = capitalizeString(searchParams.get("topic"));

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const navigate = useNavigate();

  useEffect(() => {
    // Scroll Event Listener for Navbar Shrink Animation
    const handleScroll = () => {
      setScrolling(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    removeCookie("user", { path: "/" });
    setUser(null);
    return logoutUser()
      .then(() => {
        return <Navigate to="/" replace={true} />;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-16 transition-all duration-100 ease-in-out w-full px-4 sticky top-0 left-0 bg-primary z-20 select-none">
      <nav className="flex relative h-full justify-between items-center">
        {/* Hamburger Menu Button */}
        {isMenuOpen ? (
          <FaX
            className="text-2xl text-white hover:cursor-pointer hover:text-slate-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        ) : (
          <FaBars
            className="text-2xl text-white hover:cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
        {/* Logo */}
        <div
          className={`${
            scrolling ? "h-16" : "h-20"
          } absolute top-0 left-10 bg-highlight transition-all duration-100 ease-in-out w-auto p-4 flex items-center justify-center z-50 hover:cursor-pointer`}
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/");
          }}
        >
          <FaRegNewspaper className={`${scrolling ? "text-2xl" : "text-4xl"} text-white`} />
          <span
            className={`${
              scrolling ? "text-[8px]" : "text-[10px]"
            } absolute font-medium bottom-[2px] text-white`}
          >
            NC NEWS
          </span>
        </div>
        {/* Current Topic */}
        <div className="absolute left-32">
          <h2 className="text-white font-bold">{currentTopic}</h2>
        </div>

        {/* User Login */}
        {user ? (
          <>
            <DropDownMenu
              trigger={
                <>
                  <span className="hidden lg:block text-white text-sm font-light">{user.name}</span>
                  <img
                    className="w-10 h-10 object-cover border-2 border-slate-500 rounded-full group-hover:border-highlight"
                    src={user.avatar_url}
                    alt="user profile"
                  />
                </>
              }
              options={[
                { payload: { value: "My Profile", link: "/profile" } },
                { payload: { value: "Log Out", link: "/" }, action: handleLogout },
              ]}
            />
          </>
        ) : (
          <Link className="text-sm text-white hover:text-highlight" to="/login">
            LOGIN
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
