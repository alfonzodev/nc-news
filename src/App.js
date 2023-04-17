import {Routes, Route} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/articles" element={<Articles/>}/>
      </Routes>
    </div>
  );
}

export default App;
