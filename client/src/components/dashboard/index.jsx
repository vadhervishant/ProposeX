import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Container,
  Typography,
  Box,
  ThemeProvider,
  TextField,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const defaultTheme = createTheme();

const Dashboard = () => {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [activeCard, setActiveCard] = useState(null);

  const handleLike = (cardId) => {
    setLikes((prevLikes) => {
      if (prevLikes[cardId]) {
        const newLikes = { ...prevLikes };
        newLikes[cardId] -= 1;
        return newLikes;
      } else {
        return { ...prevLikes, [cardId]: 1 };
      }
    });
  };

  const getLikeCount = (cardId) => {
    return likes[cardId] || 0;
  };

  const handleComment = (cardId, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [cardId]: [...(prevComments[cardId] || []), comment],
    }));
  };

  const cards = [
    {
      id: 1,
      heading: 'Card 1',
      description: 'This is card 1 description',
      image: 'https://source.unsplash.com/random?wallpapers',
    },
    {
      id: 2,
      heading: 'Card 2',
      description: 'This is card 2 description',
      image: 'https://source.unsplash.com/random?nature',
    },
    {
      id: 3,
      heading: 'Card 3',
      description: 'This is card 3 description',
      image: 'https://source.unsplash.com/random?mountains',
    },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Dashboard
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <div style={{ marginBottom: '20px' }}>
            {cards.map((card) => (
              <div key={card.id} style={{ marginBottom: '20px' }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%',
                      borderRadius: '12px 12px 0 0',
                    }}
                    image={card.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{ fontWeight: 'bold', marginBottom: '8px' }}
                    >
                      {card.heading}
                    </Typography>
                    <Typography sx={{ fontSize: '14px' }}>{card.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleLike(card.id)}
                      startIcon={likes[card.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    >
                      {getLikeCount(card.id)} Likes
                    </Button>
                    <Button
                      size="small"
                      startIcon={<CommentIcon />}
                      onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
                    >
                      Comment
                    </Button>
                  </CardActions>
                  {activeCard === card.id && (
                    <CardContent>
                      {comments[card.id] &&
                        comments[card.id].map((comment, index) => (
                          <Typography key={index} variant="body2" color="text.secondary">
                            {comment}
                          </Typography>
                        ))}
                      <TextField
                        id={`comment-${card.id}`}
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Write a comment..."
                        fullWidth
                        sx={{ marginBottom: '10px' }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleComment(card.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleComment(card.id, document.getElementById(`comment-${card.id}`).value)
                        }
                      >
                        Post Comment
                      </Button>
                    </CardContent>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
