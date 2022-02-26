import React from "react";
import { Container, Box, Grid, useMediaQuery } from "@mui/material";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";

const Home = () => {
  const mdDown = useMediaQuery("(max-width:1279px)");

  return (
    <Container maxWidth="lg" component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container>
            {!mdDown && <Grid item lg={2}></Grid>}
            <Grid item xs={12} sm={12} md={8}>
              <CreatePost />
              <PostList />
            </Grid>
            {!mdDown && <Grid item lg={2}></Grid>}
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};

export default Home;
