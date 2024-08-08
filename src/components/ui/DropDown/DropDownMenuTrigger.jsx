const DropDownMenuTrigger = ({ children }) => {
  return <div onClick={() => console.log("trigger clicked")}>{children}</div>;
};

export default DropDownMenuTrigger;
