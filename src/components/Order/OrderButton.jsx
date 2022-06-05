import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function OrderButton() {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("order/");
  };

  return (
    <Button variant='contained' onClick={navigateTo} size='large'>
      <AttachMoneyIcon /> Order
    </Button>
  );
}

export default OrderButton;
