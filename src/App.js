import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import SingleArticle from "./pages/SingleArticle.jsx";
import Login from "./pages/Login.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyArticles from "./pages/MyArticles.jsx";

import Navbar from "./components/Navbar.jsx";
import Spinner from "./components/Spinner.jsx";

import { getTopics } from "./api.js";

const App = () => {
  const [topics, setTopics] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((data) => {
        setIsLoading(false);
        setTopics(data.topics);
      })
      .catch((err) => setError(err));
  }, []);

  if (isLoading) return <Spinner />;

  if (error) return <ErrorPage error={error} />;

  return (
    <div className="App">
      <Navbar topics={topics} />
      <Routes>
        <Route path="/" element={<Home topics={topics} />} />
        <Route path="/articles" element={<Articles topics={topics} />} />
        <Route
          path="/articles/:article_id"
          element={<SingleArticle topics={topics} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/profile/my-articles" element={<MyArticles />} />
        <Route path="*" element={<ErrorPage error={404} />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
