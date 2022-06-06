import React from "react";
import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function NotFound() {
  return (
    <div>
      <Navbar />
      <Card sx={{ p: 4 }}>
        <Typography variant='h5' gutterBottom component='div'>
          404 - Page Not Found
        </Typography>
        <Typography variant='h5' gutterBottom component='div'>
          <Link to='/'>Click here to go back home!</Link>
        </Typography>
      </Card>
    </div>
  );
}

export default NotFound;
