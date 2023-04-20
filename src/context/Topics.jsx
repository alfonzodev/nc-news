import { createContext, useEffect, useState } from "react";
import { getTopics } from "../api";

export const TopicsContext = createContext();

export const TopicsProvider = ({ children }) => {
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTopics();
      setTopics(response.topics);
    };
    fetchData();
  }, []);

  if (topics) {
    return (
      <TopicsContext.Provider value={{ topics, setTopics }}>
        {children}
      </TopicsContext.Provider>
    );
  }
};


