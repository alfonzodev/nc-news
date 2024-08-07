import { useContext } from "react";
import { MenuContext } from "../context/Menu";
import { Link } from "react-router-dom";
import { capitalizeString } from "../utils/utils";

const MobileMenu = ({ topics }) => {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

  return (
    <div
      className={`${
        isMenuOpen ? "block" : "hidden"
      } w-full bg-primary border-t fixed h-full top-16 left-0 overflow-auto z-10 select-none flex flex-col items-center gap-4 py-10`}
    >
      {topics?.map((topic) => {
        return (
          <Link
            className="text-white text-lg font-bold hover:underline decoration-highlight"
            key={topic.slug}
            to={`/articles?topic=${topic.slug}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {capitalizeString(topic.slug)}
          </Link>
        );
      })}
    </div>
  );
};

export default MobileMenu;
