// FilterModal.js
import React from "react";
import { Modal, Paper, Typography, TextField, Button } from "@material-ui/core";

const FilterModal = ({
  open,
  handleClose,
  handleApplyFilters,
  handleResetFilters,
  handleFilterChange,
  filters,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Paper style={{ padding: "20px", margin: "20px", maxWidth: "400px" }}>
        <Typography variant="h6" gutterBottom>
          Filter Posts
        </Typography>
        <TextField
          label="Category"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyFilters}
          style={{ marginRight: "10px" }}
        >
          Apply Filters
        </Button>
        <Button variant="outlined" color="default" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </Paper>
    </Modal>
  );
};

export default FilterModal;
