import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Stack,
  TextField,
  Grid,
  Avatar,
  Button,
  Badge,
} from "@mui/material";
import LoadingImg from "../LoadingImg";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import { deepOrange } from "@mui/material/colors";

const SmallAvatar = styled(Avatar)(() => ({
  width: 22,
  height: 22,
  // border: `2px solid #000000`,
}));

function Profile() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  const inputFile = useRef(null);

  const { logoutUser } = useContext(AuthContext);

  const getToken = localStorage.getItem("authToken");

  const errorHandle = (message) => {
    toast.error(message, {
      position: "top-left",
      autoClose: 1000,
      closeOnClick: true,
      //hideProgressBar: true,
    });
  };

  const successHandle = (message) => {
    toast.success(message, {
      position: "top-left",
      autoClose: 1000,
      closeOnClick: true,
      //hideProgressBar: true,
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/profile`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setName(response.data.name);
      setEmail(response.data.email);
      setProfileImg(response.data.profileImg);
    } catch (error) {
      errorHandle(error.response.data.errorMessage);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { email, password, name };
    axios
      .put(`${process.env.REACT_APP_BASE_API_URL}/api/profile`, body, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(() => {
        successHandle("Profile Updated!");
      })
      .catch((err) => errorHandle(err.response.data.errorMessage));
  };
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_BASE_API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(() => {
        successHandle("Account deleted! Hope to see you back soon!");
        logoutUser();
        navigate("/");
      })
      .catch((err) => errorHandle(err.response.data.errorMessage));
  };

  const handleProfileImg = () => {
    inputFile.current.click();
  };

  return (
    <div>
      <ToastContainer />
      {!name && <LoadingImg />}
      {name && (
        <Stack>
          <Paper elevation={20}>
            <Grid align='center'>
              <Typography variant='h6' pt={3} gutterBottom>
                Edit Profile
              </Typography>
              <Badge
                overlap='circular'
                onClick={handleProfileImg}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <SmallAvatar
                    sx={{ bgcolor: deepOrange[500] }}
                    alt='edit icon'>
                    <EditIcon />
                  </SmallAvatar>
                }>
                <Avatar
                  sx={{ width: 112, height: 112 }}
                  alt={name}
                  src={profileImg}
                />
              </Badge>
              <input
                type='file'
                accept='image/*'
                id='file'
                ref={inputFile}
                style={{ display: "none" }}
              />
            </Grid>
            <Stack sx={{ p: 4 }} spacing={1}>
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
              <Stack spacing={4}>
                <Button
                  type='submit'
                  fullWidth
                  onClick={handleSubmit}
                  variant='contained'
                  color='primary'>
                  Edit
                </Button>
                <Button
                  type='submit'
                  fullWidth
                  onClick={handleDelete}
                  variant='contained'
                  color='error'>
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      )}
    </div>
  );
}

export default Profile;
