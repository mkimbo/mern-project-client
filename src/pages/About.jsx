import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "@mui/icons-material";

const About = () => {
  const navigate = useNavigate();
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
        <Typography>
          A simple MERN Stack application with CRUD operations and
          authentication using JWT.
        </Typography>
        <Button
          color="primary"
          onClick={() => navigate("/home")}
          endIcon={<ArrowRight />}
        >
          Explore
        </Button>
      </Box>
    </Container>
  );
};

export default About;
