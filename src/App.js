import {Routes, Route} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import SingleArticle from "./pages/SingleArticle.jsx";

import Header from "./components/Header.jsx";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/articles" element={<Articles/>}/>
        <Route path="/articles/:article_id" element={<SingleArticle/>}/>
      </Routes>
    </div>
  );
}

export default App;
