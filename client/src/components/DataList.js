import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Badge,
  CircularProgress,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { deletePost, getPosts } from "../services/posts";
import DeleteConfirmationModal from "./DeleteModal";
import FilterModal from "./FilterModal";

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setPostToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      dispatch(deletePost(postToDelete));
      setPostToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setPostToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterOpen = () => {
    setFilterModalOpen(true);
  };

  const handleFilterClose = () => {
    setFilterModalOpen(false);
  };

  const handleApplyFilters = () => {
    dispatch(getPosts(filters));
    handleFilterClose();
  };

  const handleResetFilters = () => {
    setFilters({
      category: "",
      status: "",
    });
    dispatch(getPosts());
    handleFilterClose();
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (filters.category && post.category === filters.category) ||
      (filters.status && post.status === filters.status)
    );
  });

  return (
    <div
      style={{ margin: "20px", padding: "20px", backgroundColor: "#f5f5f5" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h4"
          style={{
            paddingTop: "20px",
            marginBottom: "20px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            color: "#333",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            marginRight: "auto",
          }}
        >
          List Story
        </Typography>

        <TextField
          label="Search by Name or Author"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginRight: "10px" }}
        />
        <Button
          component={Link}
          variant="contained"
          color="primary"
          to="/form"
          style={{ marginLeft: "10px" }}
        >
          Add Story
        </Button>
      </div>

      {isLoading ? (
        <CircularProgress />
      ) : !filteredPosts.length ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Data sedang kosong :({" "}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPosts
                .slice()
                .reverse()
                .map((post) => (
                  <TableRow key={post._id}>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "2px",
                        }}
                      >
                        {post.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            color="primary"
                            badgeContent={tag}
                            style={{
                              fontSize: "14px",
                              borderRadius: "4px",
                              minWidth: "50px",
                            }}
                          />
                        ))}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        style={{ paddingRight: "20px", fontSize: "14px" }}
                        color={
                          post.status === "Publish" ? "primary" : "secondary"
                        }
                        badgeContent={post.status}
                      />
                    </TableCell>

                    <TableCell>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => handleDeleteClick(post._id)}
                        style={{ marginRight: "10px" }}
                      >
                        <DeleteIcon fontSize="small" /> Delete
                      </Button>
                      <Button
                        size="small"
                        color="default"
                        component={Link}
                        to={`/edit/${post._id}`}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="default"
                        component={Link}
                        to={`/detail/${post._id}`}
                      >
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        handleClose={handleDeleteCancel}
        handleDelete={handleDeleteConfirm}
      />
      <FilterModal
        open={filterModalOpen}
        handleClose={handleFilterClose}
        handleApplyFilters={handleApplyFilters}
        handleResetFilters={handleResetFilters}
        handleFilterChange={handleFilterChange}
        filters={filters}
      />
    </div>
  );
};

export default Posts;
