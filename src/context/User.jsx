import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [user, setUser] = useState(cookies?.user);

  return (
    <UserContext.Provider value={{ user, setUser, setCookie, removeCookie }}>
      {children}
    </UserContext.Provider>
  );
};

