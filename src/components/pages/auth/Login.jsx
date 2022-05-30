import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
const Login = ({ handleChange }) => {
  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { email, password };
    axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/auth/login`, body)
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((err) => console.warn(err));
  };
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label='Email'
          placeholder='Enter email'
          value={email}
          onChange={handleEmail}
          fullWidth
          required
        />
        <TextField
          label='Password'
          placeholder='Enter password'
          type='password'
          value={password}
          onChange={handlePassword}
          fullWidth
          required
        />
        <FormControlLabel
          control={<Checkbox name='checkedB' color='primary' />}
          label='Remember me'
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          style={btnstyle}
          onClick={handleSubmit}
          fullWidth>
          Sign in
        </Button>
        <Typography>
          Do you have an account ?
          <Link onClick={(e) => handleChange(e, 1)}>Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
