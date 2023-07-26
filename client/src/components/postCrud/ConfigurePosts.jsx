//Author - Rishi Vasa (B00902815)

import React, { useState } from 'react';
import { Grid, Card, Typography, CardContent, ThemeProvider, CssBaseline, Container, CardMedia } from '@mui/material';
import { appTheme } from '../../themes/theme';
import { useNavigate } from 'react-router';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';

const ConfigurePosts = () => {

    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ my: '1rem' }}>
          <Grid item xs={12}>
            <Typography variant="h2" color="primary">
              Configure Posts
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="primary">
              You can browse all posts, add new posts, update existing posts, or delete posts from here.
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" alignItems="center" spacing={3} sx={{ marginTop: 2 }}>
          {/* Card 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                borderRadius: '16px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => handleCardClick('/posts')}
            >
              <CardMedia
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pt: 8,
                }}
              >
                <AutoStoriesIcon sx={{ fontSize: '10rem' }} />
              </CardMedia>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Browse All Posts
                </Typography>
                <Typography color="textSecondary">
                  Browse ProposeX's Post Collection
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                borderRadius: '16px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => handleCardClick('/addpost')}
            >
              <CardMedia
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pt: 8,
                }}
              >
                <AddToPhotosOutlinedIcon sx={{ fontSize: '10rem' }} />
              </CardMedia>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Add New Post
                </Typography>
                <Typography color="textSecondary">
                  Add a new Post to ProposeX's collection
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                borderRadius: '16px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => handleCardClick('/updatepost')}
            >
              <CardMedia
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pt: 8,
                }}
              >
                <SettingsSuggestOutlinedIcon sx={{ fontSize: '10rem' }} />
              </CardMedia>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Edit / Delete Post
                </Typography>
                <Typography color="textSecondary">
                  Update or Delete an existing Post
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
    );
};

export default ConfigurePosts;