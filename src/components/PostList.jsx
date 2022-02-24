import React, { useEffect, useContext } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Post from "../components/Post";
import { Grid, Typography } from "@mui/material";
import { GlobalContext } from "../context/GlobalState";

const PostList = () => {
  const { posts, setPosts } = useContext(GlobalContext);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPosts = async () => {
      try {
        const response = await axiosPrivate.get("/getPosts", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getPosts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      {posts?.map((post) => (
        <Post post={post} key={post?._id} />
      ))}
      {posts?.length < 1 && (
        <Grid align="center">
          <Typography>There are no posts yet.</Typography>
        </Grid>
      )}
    </>
  );
};

export default PostList;
