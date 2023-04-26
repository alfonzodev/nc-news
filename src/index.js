import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./style/index.css";
import App from "./App";

import { UserProvider } from "./context/User.jsx";
import { TopicsProvider } from "./context/Topics.jsx";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <TopicsProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </TopicsProvider>
  </CookiesProvider>
);
