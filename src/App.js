import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "./context/User.jsx";
import { TopicsProvider } from "./context/Topics.jsx";

import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import SingleArticle from "./pages/SingleArticle.jsx";
import Login from "./pages/Login.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

// import { useCookies } from "react-cookie";

import Header from "./components/Header.jsx";
import Register from "./pages/Register.jsx";

const App = () => {
  return (
    <div className="App">
      <TopicsProvider>
        <UserProvider>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ErrorPage error={404} />} />
          </Routes>
          <ToastContainer/>
        </UserProvider>
      </TopicsProvider>
    </div>
  );
};

export default App;
