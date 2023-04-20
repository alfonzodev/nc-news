import { Routes, Route } from "react-router-dom";

import { UserProvider } from "./context/User.jsx";
import { TopicsProvider } from "./context/Topics.jsx";

import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import SingleArticle from "./pages/SingleArticle.jsx";

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
          </Routes>
        </UserProvider>
      </TopicsProvider>
    </div>
  );
};

export default App;
