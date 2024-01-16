import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
  makeStyles,
} from "@material-ui/core";
import { getPosts } from "../services/posts";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    maxWidth: 600,
    margin: "auto",
  },
  card: {
    maxWidth: 400,
    margin: "auto",
  },
  media: {
    height: 200,
  },
}));

const DetailData = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.find((p) => p._id === id));

  useEffect(() => {
    dispatch(getPosts(id));
  }, [dispatch, id]);

  if (!post) {
    return <Typography variant="h6">Post not found.</Typography>;
  }

  const lastUpdatedDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={post.storyCover}
          title={post.title}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Author:</strong> {post.author}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Synopsis:</strong> {post.synopsis}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Category:</strong> {post.category}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Status:</strong> {post.status}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Tags:</strong>{" "}
            {post.tags.map((tag, index) => (
              <span key={index}>{tag} </span>
            ))}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Chapter Title:</strong> {post.chaptertitle}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Story Chapter:</strong> {post.storychapter}
          </Typography>

          {post.updatedAt && (
            <Typography variant="body2" color="textSecondary">
              <strong>Last Updated:</strong> {lastUpdatedDate}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            style={{ marginTop: 20 }}
          >
            Go Back
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DetailData;
