import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Users from "../components/Users";

const Home = () => {
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
        <Typography>All Registered Users</Typography>
        <Users />
      </Box>
    </Container>
  );
};

export default Home;
