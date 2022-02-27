import React, { useEffect, useContext, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Post from "../components/Post";
import { Grid, Typography, CircularProgress } from "@mui/material";
import { GlobalContext } from "../context/GlobalState";

const PostList = () => {
  const [loading, setLoading] = useState();
  const { posts, setPosts } = useContext(GlobalContext);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPosts = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get("/getPosts", {
          signal: controller.signal,
        });
        setLoading(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && posts?.length < 1 && (
        <Grid align="center">
          <CircularProgress thickness={4} size={64} color="primary" />
        </Grid>
      )}
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
