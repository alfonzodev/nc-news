const DropDownMenuContent = ({ isOpen, children }) => {
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } absolute right-0 mt-1 w-44 p-2 lg:w-56 shadow-sm border rounded-md border-gray-700 flex flex-col bg-white`}
    >
      {children}
    </div>
  );
};

export default DropDownMenuContent;
