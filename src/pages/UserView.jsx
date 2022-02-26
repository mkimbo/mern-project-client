import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Avatar,
  IconButton,
  useMediaQuery,
  Button,
} from "@mui/material";
import {
  ArrowBack,
  CollectionsBookmarkRounded,
  PersonRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getUserInitials } from "../utils/helperFunctions";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { format } from "date-fns/esm";
const PROFILE_URL = "/getUserById";
const FOLLOW_URL = "/followUser";
const UNFOLLOW_URL = "/unFollowUser";
const UserView = () => {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState();
  const [followed, setFollowed] = useState();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { user_id } = useParams();
  const { user } = useAuth();
  const mdDown = useMediaQuery("(max-width:1279px)");

  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();
    const getUserById = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(
          PROFILE_URL,
          { params: { user_id } },
          {
            signal: controller.signal,
          }
        );
        setLoading(false);
        isMounted && setProfile(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUserById();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [user_id, setProfile]);

  useEffect(() => {
    const followers = [];
    profile?.followers?.forEach((follow) =>
      followers.push(follow.user_id.email)
    );
    if (followers.includes(user?.email)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [setFollowed, profile]);

  const handleFollowUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        FOLLOW_URL,
        JSON.stringify({ user_id }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setProfile(response.data);
      setFollowed(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnFollowUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        UNFOLLOW_URL,
        JSON.stringify({ user_id }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setProfile(response.data);
      setFollowed(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} style={{ marginBottom: 12, marginTop: 12 }}>
        {!mdDown && (
          <Grid item lg={3}>
            <Card variant="outlined" style={{ marginBottom: 12 }}>
              <CardHeader
                avatar={
                  <IconButton
                    size="small"
                    aria-label="back"
                    color="inherit"
                    onClick={() => navigate(-1)}
                  >
                    <ArrowBack />
                  </IconButton>
                }
              />
            </Card>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={8} lg={7}>
          <Card className="mb-3" variant={"outlined"}>
            <CardMedia
              style={{
                height: 200,
                backgroundColor: "#ddd",
              }}
              component="img"
              // title='Contemplative Reptile'
            />
            <CardContent
              style={{
                position: "relative",
                top: -60,
                marginBottom: -60,
              }}
            >
              <div style={{ display: "flex" }}>
                <div>
                  <Avatar
                    variant="rounded"
                    style={{
                      backgroundColor: "#3e78ff",
                      marginRight: 12,
                      marginBottom: 12,
                      width: 80,
                      height: 80,
                    }}
                  >
                    {getUserInitials(profile?.email)}
                  </Avatar>

                  <Typography
                    gutterBottom
                    color="textSecondary"
                    variant="body1"
                  >
                    {profile?.email}
                  </Typography>
                  <Typography
                    gutterBottom
                    color="textSecondary"
                    variant="body2"
                  >
                    {`@${profile?.name}`}
                  </Typography>
                </div>

                <div
                  style={{
                    flex: 1,
                    position: "relative",
                    top: 60,
                  }}
                  className="space-between"
                >
                  <Typography></Typography>
                  <Typography variant="body2" component="div">
                    {user?.email !== profile?.email && (
                      <Button
                        color="primary"
                        onClick={
                          followed ? handleUnFollowUser : handleFollowUser
                        }
                        variant="outlined"
                        size="small"
                      >
                        {followed ? "Unfollow" : "Follow"}
                      </Button>
                    )}
                  </Typography>
                </div>
              </div>
            </CardContent>
            <CardActions>
              <div
                className="center-horizontal space-between"
                style={{ width: "100%" }}
              >
                <div
                //onClick={() => history.push('/profile/posts')}
                //className={classes.clickableTypography}
                >
                  <Typography variant="body2">Posts</Typography>
                  <div className="center-horizontal">
                    <CollectionsBookmarkRounded
                      color="primary"
                      className="mx-2"
                      fontSize="small"
                    />
                    <Typography variant="body2">{profile?.posts}</Typography>
                  </div>
                </div>

                <div
                //onClick={() => history.push('/profile/posts')}
                //className={classes.clickableTypography}
                >
                  <Typography variant="body2">Followers</Typography>
                  <div className="center-horizontal">
                    <PersonRounded
                      color="primary"
                      className="mx-2"
                      fontSize="small"
                    />
                    <Typography variant="body2">
                      {profile?.followers?.length}
                    </Typography>
                  </div>
                </div>

                <div
                //onClick={() => history.push('/profile/posts')}
                //className={classes.clickableTypography}
                >
                  <Typography variant="body2">Following</Typography>
                  <div className="center-horizontal">
                    <PersonRounded
                      color="primary"
                      className="mx-2"
                      fontSize="small"
                    />
                    <Typography variant="body2">
                      {profile?.following?.length}
                    </Typography>
                  </div>
                </div>
              </div>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={4} lg={2}></Grid>
      </Grid>
    </Container>
  );
};

export default UserView;
