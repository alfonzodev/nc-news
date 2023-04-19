import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import { UserContext } from "./context/UserContext.js";

import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import SingleArticle from "./pages/SingleArticle.jsx";

import Header from "./components/Header.jsx";

function App() {
  const [user, setUser] = useState("weegembump");
  return (
    <div className="App">
      <Header />
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
