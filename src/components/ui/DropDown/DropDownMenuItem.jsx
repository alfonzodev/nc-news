import { useNavigate } from "react-router-dom";

const DropDownMenuItem = ({ payload, action }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(payload.link);
    if (action) {
      action();
    }
  };

  return (
    <div
      className="px-4 py-1 w-full flex items-center justify-end font-medium border border-transparent rounded-md hover:bg-slate-300 cursor-pointer"
      onClick={handleClick}
    >
      {payload.value}
    </div>
  );
};

export default DropDownMenuItem;
