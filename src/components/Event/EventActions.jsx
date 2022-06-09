import React, { useState } from "react";
import { Stack } from "@mui/material";
import AttendEventButton from "./AttendEventButton";
import OrderButton from "../Order/OrderButton";
import OrderListButton from "../Order/OrderListButton";

function EventActions({ event, user }) {
  const [attending, setAttending] = useState(
    event.customers.some((customer) => customer._id === user._id) ||
      event.staff.some((staff) => staff._id === user._id)
  );

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
        <AttendEventButton
          user={user}
          event={event}
          setAttending={setAttending}
          attending={attending}
        />
      )}
      {user.role === "customer" && event.takeOrders && attending && (
        <OrderButton user={user} event={event} />
      )}
      {attending && <OrderListButton event={event} />}
    </Stack>
  );
}

export default EventActions;
