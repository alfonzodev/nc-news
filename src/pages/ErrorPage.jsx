import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import errorMessages from "../utils/errorMessages";

const ErrorPage = ({ error }) => {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Handle custom FE error messages
    if (typeof error === "number") {
      setStatus(error);
      setMessage(errorMessages[error]);
    } else {
      // Handle BE error messages
      setStatus(error.response.status);
      setMessage(error.response.data.msg);
    }
  }, [error]);

  return (
    <div className="not-found-page">
      <div className="not-found-msg-container">
        <h1 className="heading-l">{status}</h1>
        <p>{message}</p>
        <Link to={"/"} className="back-home-link">
          <button className="btn">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
