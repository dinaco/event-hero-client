import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
const Signup = () => {
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { email, password };
    axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/auth/signup`, body)
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
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant='caption' gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form>
          <TextField fullWidth label='Name' placeholder='Enter your name' />
          <TextField
            fullWidth
            label='Email'
            value={email}
            onChange={handleEmail}
            placeholder='Enter your email'
          />
          <FormControl component='fieldset' style={marginTop}>
            <FormLabel component='legend'>Gender</FormLabel>
            <RadioGroup
              aria-label='gender'
              name='gender'
              style={{ display: "initial" }}>
              <FormControlLabel
                value='female'
                control={<Radio />}
                label='Female'
              />
              <FormControlLabel value='male' control={<Radio />} label='Male' />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            label='Phone Number'
            placeholder='Enter your phone number'
          />
          <TextField
            fullWidth
            label='Password'
            type='password'
            value={password}
            onChange={handlePassword}
            placeholder='Enter your password'
          />
          {/*           <TextField
            fullWidth
            label='Confirm Password'
            placeholder='Confirm your password'
          /> */}
          <FormControlLabel
            control={<Checkbox name='checkedA' />}
            label='I accept the terms and conditions.'
          />
          <Button
            type='submit'
            onClick={handleSubmit}
            variant='contained'
            color='primary'>
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;
