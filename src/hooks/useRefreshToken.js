import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setUser } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refreshToken", {
      withCredentials: true,
    });
    setUser({
      email: response.data.email,
      roles: response.data.roles,
      accessToken: response.data.accessToken,
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
