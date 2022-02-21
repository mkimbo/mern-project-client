import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  user: null,
  persist: JSON.parse(localStorage.getItem("persist")) || false,
  posts: [],
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setUser(user) {
    dispatch({
      type: "SET_CURRENT_USER",
      payload: user,
    });
  }

  function setPersist(persist) {
    dispatch({
      type: "SET_PERSIST_LOGIN",
      payload: persist,
    });
  }

  function setPosts(posts) {
    dispatch({
      type: "SET_POSTS",
      payload: posts,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        persist: state.persist,
        posts: state.posts,
        setPosts,
        setPersist,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
