import React from "react";
import { Stack } from "@mui/material";
import AttendEventButton from "./AttendEventButton";
import OrderButton from "../Order/OrderButton";
import OrderListButton from "../Order/OrderListButton";

function EventActions({ event, user }) {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      spacing={0.5}
      my={4}>
      {user.role === "customer" && (
        <AttendEventButton user={user} event={event} />
      )}
      {user.role === "customer" &&
        event.takeOrders &&
        event.customers.some((customer) => customer._id === user._id) && (
          <OrderButton user={user} event={event} />
        )}
      <OrderListButton event={event} />
    </Stack>
  );
}

export default EventActions;
