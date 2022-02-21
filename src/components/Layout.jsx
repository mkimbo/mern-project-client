import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import NavBar from "./AppBar";

const Layout = () => {
  return (
    <Container maxWidth="xl" component="main">
      <NavBar />
      <Outlet />
    </Container>
  );
};

export default Layout;
