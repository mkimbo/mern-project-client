import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
const DELETE_POST_URL = "/deletePost";

const DeletePost = ({ setOpenDelete, openDelete, post }) => {
  const [errMsg, setErrMsg] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const handleDeletePost = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.post(
        DELETE_POST_URL,
        JSON.stringify({ post_id: post?._id }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setOpenDelete(false);
      navigate("/home");
      setErrMsg();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response.");
      } else if (err.response?.status === 403) {
        setErrMsg("This post can only be deleted by the author!");
      } else {
        setErrMsg("Post Delete Failed.");
      }
    }
  };
  return (
    <Dialog
      open={openDelete}
      onClose={() => setOpenDelete(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete this post?"}</DialogTitle>
      <DialogContent>
        {errMsg && (
          <Typography className="errmsg" variant="body2">
            {errMsg}
          </Typography>
        )}
        <DialogContentText id="alert-dialog-description">
          This can’t be undone and it will be removed from your timeline!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDelete(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeletePost} style={{ color: "red" }} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePost;
