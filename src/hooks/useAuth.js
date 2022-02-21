import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const useAuth = () => {
  return useContext(GlobalContext);
};

export default useAuth;
