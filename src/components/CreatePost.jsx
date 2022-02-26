import React, { useState, useContext } from "react";
import { Card, TextField, Button, Divider } from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { GlobalContext } from "../context/GlobalState";

const CREATE_POST_URL = "/createPost";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const { posts, setPosts } = useContext(GlobalContext);
  const axiosPrivate = useAxiosPrivate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (content.trim() === "") return;
    try {
      const response = await axiosPrivate.post(
        CREATE_POST_URL,
        JSON.stringify({ content }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setPosts([response.data, ...posts]);
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card elevation={0}>
      <TextField
        required
        fullWidth
        multiline
        name="create-post"
        placeholder={"Whats on your mind"}
        rows={4}
        onChange={(e) =>
          setContent(
            content?.length >= 250
              ? e.target.value.substring(0, e.target.value.length - 1)
              : e.target.value.substring(0, 250)
          )
        }
        value={content}
      />
      <div style={{ margin: "5px 0px" }} className="space-between">
        <div></div>
        <Button
          onClick={handleCreatePost}
          size="small"
          variant="contained"
          color="primary"
        >
          Post
        </Button>
      </div>
      <Divider />
    </Card>
  );
};

export default CreatePost;
