import React from "react";
import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function OrderButton() {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("order/");
  };

  return (
    <Fab color='primary' variant='extended' onClick={navigateTo} size='large'>
      <AttachMoneyIcon />
      Order
    </Fab>
  );
}

export default OrderButton;
