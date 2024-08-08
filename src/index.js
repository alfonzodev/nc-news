import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./style/index.css";
import App from "./App";

import { UserProvider } from "./context/User.jsx";
import { CookiesProvider } from "react-cookie";
import { MenuProvider } from "./context/Menu.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <MenuProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </MenuProvider>
  </CookiesProvider>
);
