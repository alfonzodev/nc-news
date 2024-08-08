import { useState, useRef, useEffect } from "react";
import DropDownMenuContent from "./DropDownMenuContent";
import DropDownMenuItem from "./DropDownMenuItem";

const DropDownMenu = ({ trigger, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    // Handle Clicks Outside Dropdown
    const handleClick = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div
      className="relative inline-block h-full"
      ref={dropDownRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="group flex h-full items-center gap-2 py-2 px-2 cursor-pointer hover:bg-[#003870]">
        {trigger}
      </div>
      <DropDownMenuContent isOpen={isOpen} setIsOpen={setIsOpen}>
        {options.map(({ payload, action }, index) => {
          return <DropDownMenuItem key={index} payload={payload} action={action} />;
        })}
      </DropDownMenuContent>
    </div>
  );
};

export default DropDownMenu;
