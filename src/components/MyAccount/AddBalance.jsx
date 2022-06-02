import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { TextField, Button, InputAdornment } from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import CreditCardIcon from "@mui/icons-material/CreditCard";

function AddBalance() {
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleExpiry = (e) => {
    setExpiry(e.target.value);
  };
  const handleCvc = (e) => {
    setCvc(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
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
        <TextField
          value={amount}
          label='Add Amount'
          onChange={handleAmount}
          variant='outlined'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <EuroIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={number}
          label='Card Number'
          onChange={handleNumber}
          variant='outlined'
          type='number'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <CreditCardIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={name}
          label='Card Name'
          onChange={handleName}
          variant='outlined'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <CreditCardIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={expiry}
          label='Card Expiry Date'
          onChange={handleExpiry}
          variant='outlined'
          type='number'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <CreditCardIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={cvc}
          label='Card CVC'
          onChange={handleCvc}
          variant='outlined'
          type='number'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <CreditCardIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button type='submit' fullWidth onClick={handleSubmit} color='primary'>
          Pay
        </Button>
      </Box>
    </Card>
  );
}
export default AddBalance;
