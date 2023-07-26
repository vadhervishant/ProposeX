import { useEffect } from "react";
import { useNavigate } from "react-router";
import React from 'react';
import { Grid, Typography, Button } from '@mui/material';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate(user.role === "admin" ? "/AdminDashboard" : "/posts");
    }
  }, []);

  return (
    <Grid container sx={{
      height: '100vh',
    }}>
      <Grid item xs={12} sm={6} md={6} sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `url("https://images.unsplash.com/photo-1578406843566-2ceb04c80e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1045&q=80") no-repeat center center/cover`,
      }}></Grid>
      <Grid item xs={12} sm={6} md={6} sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
      }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          height="100%"
        >
          <Typography variant="h2" sx={{
            marginBottom: 5,
          }}>
            {/* Welcome to reporting platform */}
          </Typography>
          <Typography variant="h2" sx={{
            fontWeight: 'bold',
            marginBottom: 5,
          }}>
            ProposeX
          </Typography>
          <Typography variant="h5" sx={{
            marginBottom: 5,
          }}>
            A Centralized Platform for Reporting and Managing Damaged Public Property.<br/>
            Uniting Communities for Public Property Restoration
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/Login")}
          >
            Join Us
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}