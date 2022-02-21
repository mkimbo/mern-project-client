/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case "SET_PERSIST_LOGIN":
      return {
        ...state,
        persist: action.payload,
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};
