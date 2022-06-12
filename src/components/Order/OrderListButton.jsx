import React from "react";
import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

function OrderListButton({ event }) {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/orders/${event._id}`);
  };

  return (
    <Fab color='primary' variant='extended' onClick={navigateTo} size='large'>
      <FormatListBulletedIcon sx={{ mr: 1 }} />
      Orders
    </Fab>
  );
}

export default OrderListButton;
