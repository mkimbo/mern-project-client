import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Profile = () => {
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
        <Typography>Profile Page</Typography>
      </Box>
    </Container>
  );
};

export default Profile;
