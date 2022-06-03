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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Stack direction='row' spacing={1}>
          <IconButton
            onClick={handleDecrement}
            color='primary'
            aria-label='add to shopping cart'>
            <RemoveCircleIcon fontSize='large' />
          </IconButton>
          <TextField
            value={amount}
            disabled
            label='Add Amount'
            onChange={handleAmount}
            variant='outlined'
            type='number'
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: { min: 0 },
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
            aria-label='add to shopping cart'>
            <AddCircleIcon fontSize='large' />
          </IconButton>
        </Stack>
        <Button type='submit' fullWidth onClick={handleSubmit} color='primary'>
          Pay
        </Button>
      </Box>
    </Card>
  );
}
export default AddBalance;
