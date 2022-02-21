import React from "react";
import {
  Card,
  Divider,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import { getDistanceToNowWithSuffix } from "../utils/dateFunctions";
import { getUserInitials } from "../utils/helperFunctions";

const Post = ({ post }) => {
  const authorInitials = getUserInitials(post?.author?.name);
  return (
    <Card style={{ marginTop: 16, marginBottom: 16 }} elevation={1}>
      <CardHeader
        avatar={
          <Avatar
            src={post?.author?.email}
            sx={{ width: "28px", height: "28px", backgroundColor: "#3e78ff" }}
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
              style={{ marginRight: 8, zIndex: 3 }}
              /* onClick={(e) => {
                        e.stopPropagation();
                        history.push(
                            `/users/${scroll?.author?._id}`
                        );
                    }} */
              variant="body2"
            >
              {` @${post?.author?.name}`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {getDistanceToNowWithSuffix(new Date(post?.date).getTime())}
            </Typography>
          </div>
        }
        subheader={
          <Typography component="span" color="textSecondary" variant="body2">
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
      <Divider />
    </Card>
  );
};

export default Post;
