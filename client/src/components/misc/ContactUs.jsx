import React from 'react';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';

const ContactUs = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await axios
    //     .post(`${process.env.REACT_APP_BASE_URL}` + `/login`, {
    //       email: form.email.toLowerCase(),
    //       password: form.password,
    //     }, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //         "Accept": "application/json",
    //       }
    //     });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Us
      </Typography>

      <Typography variant="body1" paragraph>
        Have questions or feedback? Fill out the form below and we'll get back to you as soon as possible.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField type="email" label="Email" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              multiline
              rows={4}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default ContactUs;
