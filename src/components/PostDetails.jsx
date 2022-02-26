import React, { useState, useEffect } from "react";
import {
  Card,
  Divider,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  Grid,
  Button,
  IconButton,
  CardActions,
  Tooltip,
} from "@mui/material";
import { getDistanceToNowWithSuffix } from "../utils/dateFunctions";
import { getUserInitials } from "../utils/helperFunctions";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeletePost from "./DeletePost";
const POST_URL = "/getPostById";
const LIKE_POST_URL = "/likePost";
const UNLIKE_POST_URL = "/removeLike";

const PostDetails = ({
  post_id,
  post,
  setPost,
  loading,
  setLoading,
  setOpenUpdate,
  setPostToEdit,
}) => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [openDelete, setOpenDelete] = useState(false);
  const [errmsg, setErrMsg] = useState(false);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();
    const getPostById = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(
          POST_URL,
          { params: { post_id } },
          {
            signal: controller.signal,
          }
        );
        setLoading(false);
        isMounted && setPost(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getPostById();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [post_id, setPost, axiosPrivate, setLoading]);

  useEffect(() => {
    const likedUsers = [];
    post?.likes?.forEach((like) => likedUsers.push(like.user_id));
    if (likedUsers.includes(user?.email)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [setLiked, post, user]);

  const handleLikePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        LIKE_POST_URL,
        JSON.stringify({ post_id: post?._id }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setPost(response.data);
      setErrMsg();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response.");
        console.log(errmsg);
      } else {
        setErrMsg("Post Like Failed.");
      }
    }
  };

  const handleRemoveLike = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        UNLIKE_POST_URL,
        JSON.stringify({ post_id: post?._id }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setPost(response.data);
      setErrMsg();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response.");
      } else {
        setErrMsg("Remove Like Failed.");
      }
    }
  };

  const authorInitials = getUserInitials(post?.author?.name);
  return (
    <>
      {loading && (
        <Grid align="center">
          <CircularProgress thickness={4} size={64} color="primary" />
        </Grid>
      )}
      {post && (
        <Card style={{ marginBottom: 16 }} elevation={1}>
          <CardHeader
            avatar={
              <Avatar
                src={post?.author?.email}
                sx={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "#3e78ff",
                }}
                alt={post?.author?.email}
                color="primary"
              >
                <Typography variant="body2">{authorInitials}</Typography>
              </Avatar>
            }
            title={
              <div className="d-flex align-items-center">
                <Typography
                  component="a"
                  color="primary"
                  style={{ marginRight: 8, zIndex: 3, cursor: "pointer" }}
                  variant="body2"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/users/${post?.author?._id}`);
                  }}
                >
                  {` @${post?.author?.name}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post?.date && getDistanceToNowWithSuffix(post?.date)}
                </Typography>
              </div>
            }
            subheader={
              <Typography
                component="span"
                color="textSecondary"
                variant="body2"
              >
                {/*  {getDistanceToNowWithSuffix(post?.createdAt)} */}
              </Typography>
            }
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="div">
              <Typography
                variant="body2"
                style={{
                  zIndex: 2,
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                }}
              >
                {post?.content}
              </Typography>
              <br />
              <Typography component="div" variant="body2" display="inline">
                <Typography variant="body2" display="inline">
                  {`${post?.likes?.length} ${
                    post?.likes?.length === 1 ? "Like" : "Likes"
                  }`}
                </Typography>
              </Typography>
            </Typography>
          </CardContent>
          <CardActions>
            <Typography
              component="div"
              style={{ width: "100%" }}
              className="space-between"
            >
              <Typography component="div">
                <Tooltip title={liked ? "Unlike" : "Like"}>
                  <IconButton
                    style={{ color: liked && "red" }}
                    aria-label="add to favorites"
                    onClick={liked ? handleRemoveLike : handleLikePost}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Typography component="div">
                {user?.email === post?.author?.email && (
                  <Typography component="div">
                    <Button
                      onClick={() => {
                        setPostToEdit(post);
                        setOpenUpdate(true);
                      }}
                      size="small"
                      variant="outlined"
                      style={{ marginRight: "3px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setOpenDelete(true);
                      }}
                      size="small"
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  </Typography>
                )}
              </Typography>
            </Typography>
          </CardActions>
          <Divider />
        </Card>
      )}
      <DeletePost
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        post={post}
      />
    </>
  );
};

export default PostDetails;
