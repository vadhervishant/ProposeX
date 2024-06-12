//Author - Rishi Vasa (B00902815)

import React, { useContext } from 'react';
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { UserContext } from "../../utils/UserContext";


const DeletePost = ({ bookID, open, onClose, fetchPosts }) => {

  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } =
  useContext(UserContext);

  const handleDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/deletePost/` + bookID,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSnackbarSeverity('success');
        setSnackbarMessage(
          'Post Deleted!',
        );
        setOpenSnackbar(true);
        fetchPosts();
        onClose();
      })
      .catch((error) => {
        setSnackbarSeverity('error');
        setSnackbarMessage(
          "Error in Deleting Post: " + error,
        );
        setOpenSnackbar(true);
      });
  };

  return (
    <Dialog open={true}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this Post?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}> No </Button>
        <Button onClick={handleDelete}> Yes </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePost;