import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getUserInitials } from "../utils/helperFunctions";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {users?.map((user, i) => (
        <div key={i}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                sx={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "#3e78ff",
                }}
                alt={user?.email}
                src="/static/images/avatar/2.jpg"
              >
                <Typography variant="body2">
                  {getUserInitials(user?.email)}
                </Typography>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user?.email} secondary={`@${user?.name}`} />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
};

export default Users;
