// //Author - Rishi Vasa (B00902815)

// import React, { useEffect, useState, useContext } from 'react';
// import { TextField, Button, Grid, Card, InputLabel, Input, Typography, RadioGroup, 
//   FormControlLabel, CardMedia, CardContent, CardActions, Radio } from '@mui/material';
// import axios from "axios";
// // import { UserContext } from "../../../utils/UserContext";

// const AddBook = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [authors, setAuthors] = useState([]);
//   const [dateReleased, setDateReleased] = useState('');
//   const [image, setImage] = useState('');
//   const [publisher, setPublisher] = useState('');
//   const [summary, setSummary] = useState('');
//   const [isbn, setISBN] = useState('');
//   const [genres, setGenres] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState('');
//   const [previewImage, setPreviewImage] = useState('');

//   // const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } =
//   // useContext(UserContext);


//   useEffect(() => {
//     axios
//       .get(
//         `${process.env.REACT_APP_BASE_URL}` +
//         "/bookgenre",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*",
//             Accept: "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       )
//       .then((res) => {
//         setGenres(res.data);
//       })
//       .catch((error) => {
//         // setSnackbarSeverity('error');
//         // setSnackbarMessage(
//         //   "Error in fetching Genres: " + error,
//         // );
//         // setOpenSnackbar(true);
//       });
//   }, []);

//   const saveBook = () => {
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     authors.forEach((author) => formData.append("authors[]", author.name));
//     formData.append("dateReleased", dateReleased);
//     formData.append("image", image);
//     formData.append("publisher", publisher);
//     formData.append("isbn", isbn);
//     formData.append("summary", summary);
//     formData.append("genre", selectedGenre);

//     axios
//       .post(
//         `${process.env.REACT_APP_BASE_URL}/addBook`,
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
//         //   'Book Added!',
//         // );
//         // setOpenSnackbar(true);
//         setTitle('');
//         setDescription('');
//         setAuthors([]);
//         setDateReleased('');
//         setImage('');
//         setPublisher('');
//         setSummary('');
//         setISBN('');
//         setSelectedGenre('');
//         setPreviewImage('');
//       })
//       .catch((error) => {
//         // setSnackbarSeverity('error');
//         // setSnackbarMessage(
//         //   "Error in adding Book: " + error,
//         // );
//         // setOpenSnackbar(true);
//       });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     saveBook();
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setImage(file);
//     setPreviewImage(URL.createObjectURL(event.target.files[0]));
//   };

  // const handleImageRemove = () => {
  //   setPreviewImage(null);
  //   setImage(null);
  // };

//   const handleAuthorChange = (event) => {
//     const newAuthors = event.target.value.split(",").map((author) => ({
//       name: author,
//     }));
//     setAuthors(newAuthors);
//   };

//   return (
//     <Grid container justifyContent="center" spacing={4} sx={{ marginTop: 0 }}>
//     <Grid item xs={12} sm={8} md={6}>
//       <Card sx={{ padding: 3 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Add New Post
//         </Typography>

//         <form onSubmit={handleSubmit}>

//           <Grid item xs={12} sx={{ marginY: 2 }}>
//             <TextField
//               label="Title"
//               variant="outlined"
//               fullWidth
//               required
//               value={title}
//               onChange={(event) => setTitle(event.target.value)}
//             />
//           </Grid>

//           <Grid item xs={12} sx={{ marginY: 2 }}>
//             <TextField
//               label="Description"
//               variant="outlined"
//               multiline
//               required
//               rows={4}
//               fullWidth
//               value={description}
//               onChange={(event) => setDescription(event.target.value)}
//             />
//           </Grid>

//           <Grid item xs={12} sx={{ marginY: 2 }}>
//             <TextField
//               label="Authors"
//               variant="outlined"
//               fullWidth
//               required
//               value={authors.map((author) => author.name)}
//               onChange={handleAuthorChange}
//               inputProps={{ style: { textTransform: 'capitalize' } }}
//             />
//           </Grid>

//           <Grid item xs={12} sx={{ marginY: 2 }}>
//             <InputLabel>Release Date</InputLabel>
//             <Input
//               type="date"
//               fullWidth
//               required
//               value={dateReleased}
//               onChange={(event) => setDateReleased(event.target.value)}
//               inputProps={{ placeholder: "" }}
//             />
//           </Grid>

//           <Grid item xs={12} sx={{ marginY: 2 }}>
//               <InputLabel sx={{ marginTop: 2 }}>Upload Book Cover Image</InputLabel>
//               <input type="file" accept="image/*" onChange={handleImageChange} />
//             </Grid>

//             {previewImage && (
//               <Grid item xs={12} sx={{ marginY: 2 }}>
//                 <Card sx={{ maxWidth: 400 }}>
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={previewImage}
//                     alt="Preview"
//                   />
//                   <CardContent>
//                     <Typography variant="body2" color="textSecondary" component="p">
//                       Book Cover Preview
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Button variant="contained" color="primary" onClick={handleImageRemove}>
//                       Remove Image
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             )}


//           <Grid item xs={12} sx={{ marginY: 2 }}>
//             <TextField
//               label="Publisher"
//               variant="outlined"
//               fullWidth
//               value={publisher}
//               onChange={(event) => setPublisher(event.target.value)}
//             />
//           </Grid>

//           <Grid item xs={12} sx={{ marginY: 2 }}>
//             <TextField
//               label="Summary"
//               variant="outlined"
//               multiline
//               rows={4}
//               fullWidth
//               value={summary}
//               onChange={(event) => setSummary(event.target.value)}
//             />
//           </Grid>

//           <Grid item xs={12} sx={{ marginY: 2 }}>
//             <TextField
//               label="ISBN"
//               variant="outlined"
//               fullWidth
//               value={isbn}
//               onChange={(event) => setISBN(event.target.value)}
//             />
//           </Grid>

//           <Grid item xs={12} sx={{ marginY: 2 }}>
//             <InputLabel id="genre-label">Select applicable Genre</InputLabel>
//             <RadioGroup
//               aria-label="genre"
//               value={selectedGenre}
//               onChange={(event) => setSelectedGenre(event.target.value)}
//             >
//               {/* {genres.map((genre) => (
//                 <FormControlLabel
//                   key={genre._id}
//                   value={genre.genre}
//                   control={<Radio />}
//                   label={genre.genre}
//                 />
//               ))} */}
//             </RadioGroup>
//           </Grid>

//           <Grid item xs={12} sx={{ marginY: 2 }}>
//             <Button variant="contained" color="primary" type="submit" fullWidth>
//               Add Book
//             </Button>
//           </Grid>

//         </form>
//       </Card>
//     </Grid>
//   </Grid>
//   );
// };

// export default AddBook;



import React, { useState } from 'react';
import { TextField, Button, Grid, Card, Typography, InputLabel, CardMedia, CardContent, CardActions} from '@mui/material';
import axios from "axios";

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const user = JSON.parse(localStorage.getItem("user")); 
  const [userId, setUserId] = useState(user._id); // Assuming you have a way to get the user ID
  const [dateofPost, setDateofPost] = useState(''); // Assuming you have a way to get the post date
  const [location, setLocation] = useState(''); // Assuming you have a way to get the post location
  const [previewImage, setPreviewImage] = useState('');
  const [image, setImage] = useState('');


  const savePost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("summary", summary);
      formData.append("userId", userId);
      formData.append("dateofPost", dateofPost);
      formData.append("location", location);
      formData.append("image", image);

      await axios.post(`${process.env.REACT_APP_BASE_URL}/addPost`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      setTitle('');
      setDescription('');
      setSummary('');
      setDateofPost('');
      setLocation('');
      setImage('');
      setPreviewImage('');

    } catch (error) {
      console.log("Error in creating post: ", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    savePost();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleImageRemove = () => {
    setPreviewImage(null);
    setImage(null);
  };

  return (


    <Grid container justifyContent="center" spacing={4} sx={{ marginTop: 0 }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card sx={{ padding: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Create New Post
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid item xs={12} sx={{ marginY: 2 }}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sx={{ marginY: 2 }}>
              <TextField
                label="Description"
                variant="outlined"
                multiline
                required
                rows={4}
                fullWidth
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sx={{ marginY: 2 }}>
              <TextField
                label="Summary"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
              />
            </Grid>

             <Grid item xs={12} sx={{ marginY: 2 }}>
               <InputLabel sx={{ marginTop: 2 }}>Upload Post Image </InputLabel>
               <input type="file" accept="image/*" onChange={handleImageChange} />
             </Grid>

             {previewImage && (
              <Grid item xs={12} sx={{ marginY: 2 }}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={previewImage}
                    alt="Preview"
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Book Cover Preview
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary" onClick={handleImageRemove}>
                      Remove Image
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )}


            {/* Add fields for userId, dateofPost, and location as needed
            <Grid item xs={12} sx={{ marginY: 2 }}>
              <TextField
                label="User ID"
                variant="outlined"
                fullWidth
                required
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
              />
            </Grid> */}

            

            <Grid item xs={12} sx={{ marginY: 2 }}>
              <TextField
                variant="outlined"
                type="date"
                fullWidth
                required
                value={dateofPost}
                onChange={(event) => setDateofPost(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sx={{ marginY: 2 }}>
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                required
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sx={{ marginY: 2 }}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Create Post
              </Button>
            </Grid>

          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddPost;
