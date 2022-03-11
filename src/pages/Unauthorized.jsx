import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Unauthorized = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const handleSignOut = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <Container maxWidth="xl" component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          Oops, only admins can access this page!!
        </Typography>
        <Typography>
          Login with the credentials below to get admin access.
        </Typography>
        <Typography>
          Email:<em> Admin@email.com</em>
        </Typography>
        <Typography>
          Password: <em>Admin@2022</em>
        </Typography>
        <Typography component="div" className="space-between">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(-1)}
            style={{ marginRight: "3px" }}
          >
            Go Back
          </Button>
          <Button variant="outlined" color="primary" onClick={handleSignOut}>
            Logout
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Unauthorized;
