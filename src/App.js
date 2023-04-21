import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "./context/User.jsx";
import { TopicsProvider } from "./context/Topics.jsx";


import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import SingleArticle from "./pages/SingleArticle.jsx";
import Login from "./pages/Login.jsx";

import Header from "./components/Header.jsx";

const App = () => {
  return (
    <div className="App">
      <TopicsProvider>
        <Header />
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <ToastContainer />
        </UserProvider>
      </TopicsProvider>
    </div>
  );
};

export default App;
