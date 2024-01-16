import React from "react";
import {
  Modal,
  Paper,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    maxWidth: "400px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const DeleteConfirmationModal = ({ open, handleClose, handleDelete }) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper className={classes.paper}>
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          Confirm Delete
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "20px" }}>
          Are you sure you want to delete this post?
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
            onClick={handleDelete}
          >
            <DeleteIcon fontSize="small" /> Confirm Delete
          </Button>
          <Button
            variant="outlined"
            color="default"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

export default DeleteConfirmationModal;
