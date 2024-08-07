import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="w-full h-4/6 flex items-center justify-center">
      <ClipLoader color="#1b9db4" size={150} />
    </div>
  );
};

export default Spinner;
