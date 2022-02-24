import React, { useState } from "react";
import {
  Container,
  Modal,
  Card,
  Typography,
  Grid,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import PostDetails from "../components/PostDetails";
import CloseRounded from "@mui/icons-material/CloseRounded";
import UpdatePost from "../components/UpdatePost";

const PostView = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [postToEdit, setPostToEdit] = useState();
  const { post_id } = useParams();

  return (
    <>
      <Container sx={{ marginTop: 8 }} component="main" maxWidth="sm">
        <PostDetails
          loading={loading}
          setLoading={setLoading}
          post={post}
          setPost={setPost}
          setPostToEdit={setPostToEdit}
          setOpenUpdate={setOpenUpdate}
          post_id={post_id}
        />
      </Container>
      <UpdatePostModal
        setPost={setPost}
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        setPostToEdit={setPostToEdit}
        postToEdit={postToEdit}
      />
    </>
  );
};

export default PostView;

const UpdatePostModal = ({
  openUpdate,
  setOpenUpdate,
  setPostToEdit,
  postToEdit,
  setPost,
}) => {
  const handleCloseModal = () => {
    setOpenUpdate(!openUpdate);
    setPostToEdit(null);
  };

  return (
    <Modal
      style={{
        outline: "none",

        "&:focusVisible": {
          outline: "none",
        },
      }}
      className="center-horizontal center-vertical w-100"
      open={openUpdate}
    >
      <Grid container>
        <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
        <Grid item lg={6} md={8} sm={10} xs={10}>
          <Card>
            <div className="space-between mx-3 my-2">
              <Typography variant="body2"></Typography>
              <Typography variant="body1">Update Post</Typography>
              <IconButton
                onClick={() => {
                  handleCloseModal();
                }}
                size="small"
                className="m-1 p-1"
              >
                <CloseRounded />
              </IconButton>
            </div>

            <Divider />
            <CardContent style={{ maxHeight: "85vh", overflowY: "auto" }}>
              <UpdatePost
                setPost={setPost}
                postToEdit={postToEdit}
                setOpenUpdate={setOpenUpdate}
                setPostToEdit={setPostToEdit}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
};
