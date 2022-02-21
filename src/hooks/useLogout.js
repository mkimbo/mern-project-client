import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setUser } = useAuth();

  const logout = async () => {
    setUser({});
    try {
      const response = await axios.get("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
