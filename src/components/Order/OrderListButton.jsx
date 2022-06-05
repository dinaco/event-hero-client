import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

function OrderListButton({ event }) {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/orders/${event._id}`);
  };

  return (
    <Button variant='contained' onClick={navigateTo} size='large'>
      <FormatListBulletedIcon /> Orders
    </Button>
  );
}

export default OrderListButton;
