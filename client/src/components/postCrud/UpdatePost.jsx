import React, { useEffect, useState, useCallback, useContext } from 'react';
import {
  TextField,
  Button,
  Grid,
  Card,
  InputLabel,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Buffer } from 'buffer';
import axios from 'axios';
import DeletePost from './DeletePost';
import { UserContext } from "../../utils/UserContext";

const UpdatePost = () => {
  const [posts, setPosts] = useState([]);
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(UserContext);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    description: '',
    dateofPost: '',
    image: '',
    location: '',
    summary: '',
  });


  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error in Fetching Book:', error);
    }
  }, []);

  const handleEditClick = (id) => {
    const selectedPost = posts.find((post) => post._id === id);
    const initialFormData = {
      _id: selectedPost._id,
      title: selectedPost.title,
      description: selectedPost.description,
      dateofPost: new Date(selectedPost.dateofPost).toISOString().substr(0, 10),
      image: selectedPost.image,
      location: selectedPost.location,
      summary: selectedPost.summary,
    };
    setFormData(initialFormData);
    setOpenEditForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeletingPostId(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setDeletingPostId(null);
    setOpenDeleteModal(false);
  };

  const handleFormClose = () => {
    setOpenEditForm(false);
    setFormData({
      _id: '',
      title: '',
      description: '',
      dateofPost: '',
      image: '',
      location: '',
      summary: '',
    });
  };

  return (
    <Grid
      container
      sx={{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
        width: '80%',
        padding: 2,
        borderRadius: 8,
        boxShadow: 4,
        justifyContent: 'center',
      }}
    >
      <Grid item xs={12} md={8}>
        <Card elevation={0} sx={{ padding: 2 }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h4" align="center" gutterBottom sx={{ whiteSpace: 'nowrap' }}>
                Select a Post to Update
              </Typography>
            </Grid>
            <Grid item>
              <ConfigurableListOfPosts posts={posts} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {openDeleteModal && (
        <DeletePost bookID={deletingPostId} open={openDeleteModal} onClose={handleDeleteModalClose} fetchPosts={fetchPosts} />
      )}
      <EditPostForm open={openEditForm} onClose={handleFormClose} formData={formData} setFormData={setFormData} />
    </Grid>
  );
};

const ConfigurableListOfPosts = React.memo(({ posts, onEditClick, onDeleteClick }) => {
  const filteredPosts = posts.filter((post) => post.title.toLowerCase());

  return (
    <List sx={{ padding: 0 }}>
      {filteredPosts.map((post) => (
        <ListItem key={post._id} sx={{ paddingLeft: 0 }}>
          <ListItemText primary={<Typography noWrap>{post.title}</Typography>} secondary={post.dateReleased} />
          <ListItemSecondaryAction sx={{ marginRight: 0 }}>
            <IconButton onClick={() => onEditClick(post._id)} edge="end" aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDeleteClick(post._id)} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
});

const EditPostForm = React.memo(({ open, onClose, formData, setFormData }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(UserContext);


  useEffect(() => {
    let imageSrc = null;
    if (formData.image) {
      if (formData.image.type === "Buffer") {
        imageSrc = `data:image/jpeg;base64,${Buffer.from(formData.image).toString('base64')}`;
      } else {
        imageSrc = formData.image;
      }
    }
    setPreviewImage(imageSrc);
  }, [formData.image]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleAuthorsChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      authors: event.target.value.split(', '),
    }))
  }

  const handleImageRemove = () => {
    setPreviewImage(null);
    setFormData((prevFormData) => ({ ...prevFormData, image: null }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    update();
   
  };

  const update = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/updatePost/` + formData._id,
        formData,
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
          'Post Updated!',
        );
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setSnackbarSeverity('error');
        setSnackbarMessage(
          "Error in Updating Post: " + error,
        );
        setOpenSnackbar(true);
      });
      onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} >
    <DialogTitle>Edit Book</DialogTitle>
    <DialogContent>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              fullWidth
              required
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Release Date"
              type="date"
              required
              value={formData.dateofPost}
              onChange={(e) => setFormData({ ...formData, dateofPost: e.target.value })}
              fullWidth
            />
          </Grid>

          <Grid item sx={{ marginTop: 2 }}>
            <InputLabel>Upload Book Cover Image</InputLabel>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </Grid>

          {previewImage && (
            <Grid item sx={{ marginTop: 2 }}>
              <img src={previewImage} alt="Cover Image" style={{
                maxWidth: '100%',
                maxHeight: '200px',
                objectFit: 'cover',
                objectPosition: 'center'
              }} /> <br/>
              <Button onClick={handleImageRemove}>Remove Image</Button>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Summary"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              fullWidth
              required
              label="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Update</Button>
          </Grid>
        </Grid>

      </form>
    </DialogContent>
  </Dialog>
  );
})

export { UpdatePost, ConfigurableListOfPosts, EditPostForm };
