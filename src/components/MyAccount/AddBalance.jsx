import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function AddBalance() {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleIncrement = () => {
    setAmount(amount + 10);
  };

  const handleDecrement = () => {
    if (amount >= 10) {
      setAmount(amount - 10);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //const body = { number, name, expiry, cvc };
    const body = { amount };
    const getToken = localStorage.getItem("authToken");
    axios
      .put(`${process.env.REACT_APP_BASE_API_URL}/api/add-balance`, body, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((response) => {
        navigate("/my-account");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography
          variant='h5'
          sx={{
            my: 2,
            alignSelf: "center",
          }}>
          Add Balance
        </Typography>
        <Stack
          direction='row'
          sx={{ justifyContent: "center", alignItems: "center" }}
          spacing={1}>
          <IconButton
            onClick={handleDecrement}
            color='primary'
            aria-label='Decrement'>
            <RemoveCircleIcon sx={{ width: 72, height: 72 }} />
          </IconButton>
          <TextField
            value={amount}
            disabled
            label='Amount'
            onChange={handleAmount}
            variant='outlined'
            type='number'
            sx={{ width: "50%", fontSize: 50 }}
            InputLabelProps={{
              style: { fontSize: 20 },
              shrink: true,
            }}
            InputProps={{
              min: 0,
              style: { fontSize: 40 },
              startAdornment: (
                <InputAdornment position='start'>
                  <EuroIcon />
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            onClick={handleIncrement}
            color='primary'
            aria-label='Increment'>
            <AddCircleIcon sx={{ width: 72, height: 72 }} />
          </IconButton>
        </Stack>
        <Button
          sx={{
            my: 2,
            py: 2,
            width: "75%",
          }}
          type='submit'
          variant='contained'
          onClick={handleSubmit}
          color='primary'>
          <Typography variant='h5'>Pay</Typography>
        </Button>
      </Box>
    </Card>
  );
}
export default AddBalance;
