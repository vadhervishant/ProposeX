import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Card, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { Buffer } from 'buffer';
import {
  Button,
  CssBaseline,
  Container,
  Box,
  ThemeProvider,
  TextField,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';


const PostsCard = ({ card, onPostClick }) => {
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
    if(comment && comment.length > 0) {
      setComments((prevComments) => ({
        ...prevComments,
        [cardId]: [...(prevComments[cardId] || []), comment],
      }));
    }
  };

  
    let imageSrc = '';
    if (card.image) {
      if (card.image.type === "Buffer") {
        imageSrc = `data:image/jpeg;base64,${Buffer.from(card.image).toString('base64')}`;
      } else {
        imageSrc = card.image;
      }
    } else{
      imageSrc = '';
    }

  return (

    <div key={card.id} style={{ marginBottom: '20px' }}>
    <Card onClick={ () => onPostClick(card._id) }
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
        image={imageSrc}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{ fontWeight: 'bold', marginBottom: '8px' }}
        >
          {card.title}
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
          Reviews
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
            placeholder="Write a review..."
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
            Post a review
          </Button>
        </CardContent>
      )}
    </Card>
  </div>
  );
};

export default PostsCard;
