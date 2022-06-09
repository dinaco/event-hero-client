import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function AddFunds() {
  const [amount, setAmount] = useState(10);
  const navigate = useNavigate();

  const handleIncrement = () => {
    setAmount(amount + 10);
  };

  const handleDecrement = () => {
    if (amount > 10) {
      setAmount(amount - 10);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //const body = { number, name, expiry, cvc };
    const body = { amount };
    const getToken = localStorage.getItem("authToken");
    axios
      .put(`${process.env.REACT_APP_BASE_API_URL}/api/add-funds`, body, {
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
          Add Funds
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
          <Typography px={4} variant='h2' component='div' gutterBottom>
            € {amount}
          </Typography>
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
export default AddFunds;
