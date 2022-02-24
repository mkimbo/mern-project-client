import React, { useState, useEffect } from "react";
import { Card, TextField, Button, Typography } from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UPDATE_POST_URL = "/updatePost";

const UpdatePost = ({ postToEdit, setPost, setPostToEdit, setOpenUpdate }) => {
  const [content, setContent] = useState("");
  const [errMsg, setErrMsg] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (postToEdit) {
      setContent(postToEdit?.content);
    }
  }, [postToEdit]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (content.trim() == "") return;
    try {
      const response = await axiosPrivate.post(
        UPDATE_POST_URL,
        JSON.stringify({ content, post_id: postToEdit?._id }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setPost(response.data);
      setContent("");
      setOpenUpdate(false);
      setPostToEdit();
      setErrMsg();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response.");
      } else if (err.response?.status === 403) {
        setErrMsg("This post can only be edited by the author!");
      } else {
        setErrMsg("Post Update Failed.");
      }
    }
  };
  return (
    <Card elevation={0}>
      {errMsg && (
        <Typography className="errmsg" variant="body2">
          {errMsg}
        </Typography>
      )}
      <TextField
        required
        fullWidth
        multiline
        name="update-post"
        //placeholder={"Whats on your mind"}
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
          onClick={handleUpdatePost}
          size="small"
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </div>
    </Card>
  );
};

export default UpdatePost;
