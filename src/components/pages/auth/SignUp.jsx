import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Link,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
const Signup = ({ handleChange }) => {
  const errorHandle = (message) => {
    toast.error(message, {
      position: "top-left",
      autoClose: 1000,
      closeOnClick: true,
      //hideProgressBar: true,
    });
  };

  const headerStyle = { margin: 0 };
  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { email, password, name };
    axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/auth/signup`, body)
      .then(() => {
        setEmail("");
        setName("");
        setPassword("");
        handleChange(e, 0);
      })
      .catch((err) => errorHandle(err.response.data.errorMessage));
  };

  return (
    <Grid>
      <ToastContainer />
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
        </Grid>
        <Stack spacing={1}>
          <TextField
            fullWidth
            label='Full Name'
            value={name}
            onChange={handleName}
            placeholder='Enter your full name'
            required
          />
          <TextField
            fullWidth
            label='Email'
            value={email}
            onChange={handleEmail}
            placeholder='Enter your email'
            required
          />
          <TextField
            fullWidth
            label='Password'
            type='password'
            value={password}
            onChange={handlePassword}
            placeholder='Enter your password'
            required
          />
        </Stack>
        <Button
          type='submit'
          style={btnstyle}
          fullWidth
          onClick={handleSubmit}
          variant='contained'
          color='primary'>
          Sign up
        </Button>
        <Typography>
          Already a member?{" "}
          <Link onClick={(e) => handleChange(e, 0)}>Login</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Signup;
