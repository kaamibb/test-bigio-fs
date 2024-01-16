import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updatePost, getPosts } from "../services/posts";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FileBase from "react-file-base64";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import QuillEditor from "./QuillEditor";

const EditForm = ({ navigate }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.find((p) => p._id === id));

  const [postData, setPostData] = useState({
    title: "",
    author: "",
    synopsis: "",
    category: "",
    storyCover: "",
    tags: [],
    status: "",
    chaptertitle: "",
    storychapter: "",
  });

  useEffect(() => {
    if (post) {
      setPostData({
        title: post.title,
        author: post.author,
        synopsis: post.synopsis,
        category: post.category,
        storyCover: post.storyCover,
        tags: post.tags.join(", "),
        status: post.status,
        chaptertitle: post.chaptertitle,
        storychapter: post.storychapter,
      });
    } else {
      dispatch(getPosts(id));
    }
  }, [dispatch, id, post]);

  const handleInputChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePost(id, postData));
    navigate("/");
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "600px", margin: "20px auto" }}>
      <form autoComplete="off" noValidate onSubmit={handleUpdate}>
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          Editing a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleInputChange}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          name="author"
          variant="outlined"
          label="Author"
          fullWidth
          value={postData.author}
          onChange={handleInputChange}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          name="synopsis"
          variant="outlined"
          label="Synopsis"
          fullWidth
          multiline
          minRows={4}
          value={postData.synopsis}
          onChange={(e) =>
            setPostData({ ...postData, synopsis: e.target.value })
          }
          style={{ marginBottom: "20px" }}
        />
        <FormControl
          fullWidth
          variant="outlined"
          style={{ marginBottom: "20px" }}
        >
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            label="Category"
            value={postData.category}
            onChange={handleInputChange}
          >
            <MenuItem value="Financial">Financial</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
          style={{ marginBottom: "20px" }}
        />
        <div style={{ marginBottom: "20px" }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, storyCover: base64 })
            }
          />
        </div>
        <FormControl
          fullWidth
          variant="outlined"
          style={{ marginBottom: "20px" }}
        >
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            name="status"
            label="Status"
            value={postData.status}
            onChange={handleInputChange}
          >
            <MenuItem value="Publish">Publish</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="chaptertitle"
          variant="outlined"
          label="Chapter Title"
          fullWidth
          value={postData.chaptertitle}
          onChange={handleInputChange}
          style={{ marginBottom: "20px" }}
        />
        <QuillEditor
          value={postData.storychapter}
          onChange={(value) =>
            setPostData({ ...postData, storychapter: value })
          }
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Update Memory
        </Button>
      </form>
    </Paper>
  );
};

export default EditForm;
