import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Stack, Paper, Chip, Box } from "@mui/material";
import axios from "axios";
import moment from "moment";
import EventCard from "../Event/EventCard";
import LoadingImg from "../LoadingImg";

function OrderList() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [ordersInfo, setOrdersInfo] = useState(null);
  const [totalSpent, setTotalSpent] = useState(0);
  const [countCompleted, setCountCompleted] = useState(0);
  const { user } = useContext(AuthContext);
  const getToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/orders/${eventId}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((response) => {
        const { orders } = response.data;
        let completed = 0;
        const total = orders.reduce((a, b) => {
          if (b.status === "completed") {
            completed++;
            return a + b.total;
          } else return a;
        }, 0);
        setCountCompleted(completed);
        setTotalSpent(total);
        setUserInfo(response.data);
        setOrdersInfo(orders.reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOrderDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div>
      {!userInfo && <LoadingImg />}
      {userInfo && (
        <Box>
          <EventCard eventInfo={userInfo.events[0]} />
          <Stack spacing={2}>
            <Typography px={4} variant='h5' gutterBottom>
              {user.role === "customer" && (
                <span>Total spent: € {totalSpent.toFixed(2)}</span>
              )}
              {user.role === "event-staff" && (
                <>
                  <span>All Orders: {ordersInfo.length}</span> |
                  <span>
                    Processing Orders: {ordersInfo.length - countCompleted}
                  </span>{" "}
                  |<span>Completed Orders: {countCompleted}</span>
                </>
              )}
            </Typography>
            {ordersInfo.map((order) => {
              return (
                <Paper
                  onClick={() => handleOrderDetails(order._id)}
                  key={order._id}
                  elevation={20}>
                  <Stack
                    px={4}
                    py={1}
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'>
                    <Typography variant='h6' gutterBottom>
                      #{order._id.slice(-6)}
                    </Typography>
                    <Chip
                      label={order.status}
                      color={
                        order.status === "completed" ? "success" : "warning"
                      }
                    />
                  </Stack>
                  <Typography
                    px={4}
                    py={1}
                    variant='h6'
                    component='div'
                    gutterBottom>
                    {moment(order.createdAt).format("DD/MM/YYYY | HH:mm")}
                  </Typography>
                  <Typography
                    px={4}
                    py={1}
                    variant='h6'
                    component='div'
                    gutterBottom>
                    € {order.total.toFixed(2)}
                  </Typography>
                </Paper>
              );
            })}
            {ordersInfo < 1 && (
              <p>
                <b>No orders found for this event</b>
              </p>
            )}
          </Stack>
        </Box>
      )}
    </div>
  );
}

export default OrderList;
