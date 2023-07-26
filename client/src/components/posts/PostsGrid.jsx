import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  CssBaseline, Grid,
  Pagination,
  ThemeProvider,
  useMediaQuery
} from '@mui/material';
import { appTheme } from '../../themes/theme';

import { useNavigate } from "react-router";
import PostsCard from './PostsCard';
import { UserContext } from "../../utils/UserContext";

const bookData = require("../../data/db.json");
const items = bookData.books;


export default function PostCards() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(9);

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const totalPages = Math.ceil(books.length / booksPerPage);


  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        if (!localStorage.getItem("token")) { navigate("/"); };
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}` + "/posts"
            , {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
            });
          const datas = await response.json();
          setBooks(datas);
          setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setBooksPerPage(1);
    } else {
      setBooksPerPage(9);
    }
  }, [isSmallScreen]);


  const handlePostClick = (id) => {
    navigate("/PostDetail", { state: { id } });
    console.log(id);
  };

  return (

    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Container maxWidth="md" my={5} style={{ marginTop: '20px' }}>

        <Grid container spacing={4}>

          {books && books.slice(startIndex, endIndex).map((card) => (

            <Grid item key={card} md={12}>

              <PostsCard
                card={card}
                onPostClick={handlePostClick}
              />

            </Grid>
          ))}

        </Grid>

        {!isSmallScreen && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}
          />
        )}
        {isSmallScreen && (
          <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
            />
          </Grid>
        )}

      </Container>
    </ThemeProvider >
    
  );
}