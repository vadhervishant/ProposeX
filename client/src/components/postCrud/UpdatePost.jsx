//Author - Rishi Vasa (B00902815)

import React, { useEffect, useState, useContext } from 'react';
import { TextField, Button, Grid, Card, InputLabel, Typography, List, ListItem, IconButton, ListItemText, ListItemSecondaryAction, Dialog, DialogTitle, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Buffer } from "buffer";
import axios from 'axios';
import DeletePost from './DeletePost';
// import { UserContext } from "../../../utils/UserContext";

const UpdatePost = () => {

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState(null);

  // const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } =
  // useContext(UserContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    authors: [],
    dateReleased: '',
    image: '',
    publisher: '',
    summary: '',
    isbn: '',
    genre: ''
  });

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}` + "/posts"
        , {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      // setSnackbarSeverity('error');
      // setSnackbarMessage(
      //   "Error in Fetching Book: " + error,
      // );
      // setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    console.log('useeffect called')
    fetchPosts();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_BASE_URL}` +
  //       "/bookgenre",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //           Accept: "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       // setGenres(res.data);
  //     })
  //     .catch((error) => {
  //       // setSnackbarSeverity('error');
  //       // setSnackbarMessage(
  //       //   "Error in Fetching Genres: " + error,
  //       // );
  //       // setOpenSnackbar(true);
  //     });
  // }, []);

  const handleEditClick = (id) => {
    const selectedBook = posts.find(book => book._id === id);

    const initialFormData = {
      _id: selectedBook._id,
      title: selectedBook.title,
      description: selectedBook.description,
      authors: selectedBook.authors,
      dateReleased: new Date(selectedBook.dateReleased).toISOString().substr(0, 10),
      image: selectedBook.image,
      publisher: selectedBook.publisher,
      summary: selectedBook.summary,
      isbn: selectedBook.isbn,
      genre: selectedBook.genre
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

  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // }

  const handleFormClose = () => {
    setOpenEditForm(false);
    setFormData({
      title: '',
      description: '',
      authors: [],
      dateReleased: '',
      image: '',
      publisher: '',
      summary: '',
      isbn: '',
      genre: ''
    });
  };

  return (
    <Grid container sx={{
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 5,
      width: '80%',
      padding: 2,
      borderRadius: 8, // Apply the desired rounded corners
      boxShadow: 4, // Apply the desired elevation
      justifyContent: 'center', // Center the entire grid
    }}>
      <Grid item xs={12} md={8}>
        <Card elevation={0} sx={{ padding: 2 }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h4" align="center" gutterBottom sx={{ whiteSpace: 'nowrap' }}>
                Select a Post to Update
              </Typography>
            </Grid>
            <Grid item>
              <ConfigurableListOfPosts books={posts} searchTerm={searchTerm} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {openDeleteModal && (
        <DeletePost bookID={deletingPostId} open={openDeleteModal} onClose={handleDeleteModalClose} fetchPosts={fetchPosts}/>
      )}
      {/* <EditPostForm open={openEditForm} onClose={handleFormClose} formData={formData} setFormData={setFormData} genres={genres} /> */}
    </Grid>
  );
};

const ConfigurableListOfPosts = ({ books, searchTerm, onEditClick, onDeleteClick }) => {
  let filteredBooks = []
  if (books && books.length > 0) {
    filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  return (
    <List sx={{ padding: 0 }}>
      {filteredBooks.map((book) => (
        <ListItem key={book._id} sx={{ paddingLeft: 0 }}>
          <ListItemText primary={<Typography noWrap>{book.title}</Typography>} secondary={book.dateReleased} />
          <ListItemSecondaryAction sx={{ marginRight: 0 }}>
            <IconButton onClick={() => onEditClick(book._id)} edge="end" aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => onDeleteClick(book._id)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

// const EditPostForm = ({ open, onClose, formData, setFormData, genres }) => {

//   const [previewImage, setPreviewImage] = useState(null);

//   useEffect(() => {
//     let imageSrc = null;
//     if (formData.image) {
//       if (formData.image.type === "Buffer") {
//         imageSrc = `data:image/jpeg;base64,${Buffer.from(formData.image).toString('base64')}`;
//       } else {
//         imageSrc = formData.image;
//       }
//     }
//     setPreviewImage(imageSrc);
//   }, [formData.image]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setFormData((prevFormData) => ({ ...prevFormData, image: file }));
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   const handleAuthorsChange = (event) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       authors: event.target.value.split(', '),
//     }))
//   }

//   const handleImageRemove = () => {
//     setPreviewImage(null);
//     setFormData((prevFormData) => ({ ...prevFormData, image: null }));
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     update();
//     onClose();
//   };

//   const update = () => {

//     axios
//       .put(
//         `${process.env.REACT_APP_BASE_URL}/updateBook/` + formData._id,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             "Access-Control-Allow-Origin": "*",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       )
//       .then((res) => {
//         // setSnackbarSeverity('success');
//         // setSnackbarMessage(
//         //   'Book Updated!',
//         // );
//         // setOpenSnackbar(true);
//       })
//       .catch((error) => {
//         // setSnackbarSeverity('error');
//         // setSnackbarMessage(
//         //   "Error in Updating Book: " + error,
//         // );
//         // setOpenSnackbar(true);
//       });
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="xs">
//       <DialogTitle>Edit Book</DialogTitle>
//       <DialogContent>
//         <form onSubmit={handleFormSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sx={{ marginTop: 2 }}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 multiline
//                 rows={4}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 label="Authors"
//                 name="authors"
//                 fullWidth
//                 required
//                 value={formData.authors.join(', ')}
//                 onChange={handleAuthorsChange}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 label="Release Date"
//                 type="date"
//                 required
//                 value={formData.dateReleased}
//                 onChange={(e) => setFormData({ ...formData, dateReleased: e.target.value })}
//                 fullWidth
//               />
//             </Grid>

//             <Grid item sx={{ marginTop: 2 }}>
//               <InputLabel>Upload Book Cover Image</InputLabel>
//               <input type="file" accept="image/*" onChange={handleImageChange} />
//             </Grid>

//             {previewImage && (
//               <Grid item sx={{ marginTop: 2 }}>
//                 <img src={previewImage} alt="Cover Image" style={{
//                   maxWidth: '100%',
//                   maxHeight: '200px',
//                   objectFit: 'cover',
//                   objectPosition: 'center'
//                 }} />
//                 <Button onClick={handleImageRemove}>Remove Image</Button>
//               </Grid>
//             )}

//             <Grid item xs={12} sx={{ marginTop: 2 }}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Publisher"
//                 name="publisher"
//                 value={formData.publisher}
//                 onChange={handleInputChange}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Summary"
//                 name="summary"
//                 value={formData.summary}
//                 onChange={handleInputChange}
//                 multiline
//                 rows={4}
//               />
//             </Grid>


//             <Grid item xs={12} sx={{ marginTop: 2 }}>
//               <TextField
//                 fullWidth
//                 required
//                 label="ISBN"
//                 name="isbn"
//                 value={formData.isbn}
//                 onChange={handleInputChange}
//               />
//             </Grid>

//             <Grid item sx={{ marginTop: 2 }}>
//               <InputLabel id="genre-label">Select applicable Genre</InputLabel>
//               {/* {genres.map((currentGenre) => (
//                 <div key={currentGenre.genre}>
//                   <input type="radio" name="genre" checked={formData.genre && formData.genre === currentGenre.genre } value={currentGenre.genre} onChange={handleInputChange} />
//                   <label>{currentGenre.genre}</label>
//                 </div>
//               ))} */}
//             </Grid>

//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Update</Button>
//             </Grid>
//           </Grid>

//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };


export  {
  UpdatePost,
  ConfigurableListOfPosts,
  // EditPostForm,
}