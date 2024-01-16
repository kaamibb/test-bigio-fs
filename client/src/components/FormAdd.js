import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../services/posts.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FileBase from "react-file-base64";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import QuillEditor from "./QuillEditor";

const Form = ({ navigate }) => {
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

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
    clear();
    navigate("/");
  };

  const clear = () => {
    setPostData({
      title: "",
      author: "",
      synopsis: "",
      category: "",
      storyCover: "",
      tags: [],
      status: "",
    });
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          Add Story
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          name="author"
          variant="outlined"
          label="Author"
          fullWidth
          value={postData.author}
          onChange={(e) => setPostData({ ...postData, author: e.target.value })}
          style={{ marginBottom: "15px" }}
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
          style={{ marginBottom: "15px" }}
        />
        <FormControl
          fullWidth
          variant="outlined"
          style={{ marginBottom: "15px" }}
        >
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            label="Category"
            value={postData.category}
            onChange={(e) =>
              setPostData({ ...postData, category: e.target.value })
            }
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
          style={{ marginBottom: "15px" }}
        />
        <div style={{ marginBottom: "15px" }}>
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
          style={{ marginBottom: "15px" }}
        >
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            name="status"
            label="Status"
            value={postData.status}
            onChange={(e) =>
              setPostData({ ...postData, status: e.target.value })
            }
          >
            <MenuItem value="Publish">Publish</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
          </Select>
        </FormControl>
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          Add Chapter
        </Typography>
        <TextField
          name="chaptertitle"
          variant="outlined"
          label="Chapter Title"
          fullWidth
          value={postData.chaptertitle}
          onChange={(e) =>
            setPostData({ ...postData, chaptertitle: e.target.value })
          }
          style={{ marginBottom: "15px" }}
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
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
