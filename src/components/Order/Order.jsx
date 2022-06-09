import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { SocketIoContext } from "../../context/socket.context";
import QrCode from "./QrCode";
import axios from "axios";
import {
  Card,
  Typography,
  Stack,
  Paper,
  Chip,
  Box,
  Button,
  CardActions,
  Divider,
  Collapse,
  IconButton,
  CardContent,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingImg from "../LoadingImg";

const ExpandMore = styled(({ expand, ...other }) => {
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
}));

function Order() {
  const { socket } = useContext(SocketIoContext);
  let { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(1);

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const errorHandle = (message) => {
    toast.error(message, {
      position: "top-left",
      autoClose: 1000,
      closeOnClick: true,
      //hideProgressBar: true,
    });
  };
  const successHandle = (message) => {
    toast.success(message, {
      position: "top-left",
      autoClose: 1000,
      closeOnClick: true,
      //hideProgressBar: true,
    });
  };

  const infoHandle = (message) => {
    toast.info(message, {
      position: "top-left",
      autoClose: 1000,
      closeOnClick: true,
      //hideProgressBar: true,
    });
  };

  const getToken = localStorage.getItem("authToken");

  const getOrderInfo = async () => {
    if (!orderId) return;
    try {
      setPageLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/order/status/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );

      if (
        user._id === response.data.customer._id ||
        user._id === response.data.staff._id
      ) {
        setOrder(response.data);
        if (response.data.status === "processing") {
          setActiveStep(2);
        } else if (response.data.status === "completed") {
          setActiveStep(4);
        }
      }

      setPageLoading(false);
    } catch (err) {
      setOrder(null);
      errorHandle(err.response.data.errorMessage);
      setPageLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setPageLoading(true);
      await axios.delete(
        `${process.env.REACT_APP_BASE_API_URL}/api/order/delete/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setPageLoading(false);
      setOrder(null);
      navigate(`/event/${order.event._id}`);
    } catch (err) {
      errorHandle(err.response.data.errorMessage);
      setPageLoading(false);
    }
  };

  const handleCharge = async () => {
    const body = {};
    try {
      setPageLoading(true);
      await axios.put(
        `${process.env.REACT_APP_BASE_API_URL}/api/order/charge/${orderId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      successHandle("Order completed!");
      setPageLoading(false);
      navigate(`/orders/${order.event._id}`);
    } catch (err) {
      errorHandle(err.response.data.errorMessage);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("orderChange", () => {
        getOrderInfo();
        infoHandle("Order updated");
      });
    }
  }, []);

  useEffect(() => {
    getOrderInfo();
    return () => {
      orderId = null;
    };
  }, []);

  return (
    <Card sx={{ my: 2, px: 2 }}>
      <ToastContainer />
      {!pageLoading && !order && <h2>Order Not Found</h2>}
      {pageLoading && !order && <LoadingImg />}
      {order && (
        <Stack
          direction='column'
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
          spacing={0.5}>
          <Stepper activeStep={activeStep} sx={{ pt: 2 }} alternativeLabel>
            <Step>
              <StepLabel>Order</StepLabel>
            </Step>
            <Step>
              <StepLabel>Find Staff (Scan QRcode)</StepLabel>
            </Step>
            <Step>
              <StepLabel>Processing Order</StepLabel>
            </Step>
            <Step>
              <StepLabel>Paid</StepLabel>
            </Step>
          </Stepper>
          <Typography variant='h5' py={2} fontWeight={700}>
            Amount €{order.total.toFixed(2)} @ {order.event.name}
          </Typography>
          {order.status !== "completed" && user.role === "event-staff" && (
            <Typography variant='h5' py={2} fontWeight={700}>
              Customer: {order.customer.name}
            </Typography>
          )}
          {order.staff && user.role === "customer" && (
            <Typography variant='h5' py={2} fontWeight={700}>
              Staff: {order.staff.name}
            </Typography>
          )}
          <Typography variant='h5' py={2} fontWeight={700}>
            #{order._id.slice(-6)}{" "}
            <Chip
              label={order.status}
              color={order.status === "completed" ? "success" : "warning"}
            />{" "}
          </Typography>

          <Box
            py={4}
            sx={{
              backgroundColor: order.bgColor,
              width: "90%",
              display: "flex",
              justifyContent: "center",
              borderRadius: "15px",
            }}>
            {order.status === "pending" && user.role === "customer" && (
              <QrCode
                value={order._id}
                title={order.total.toFixed(2)}
                bgColor={order.bgColor}
              />
            )}
          </Box>

          {order.status !== "completed" && user.role === "customer" && (
            <Button
              sx={{
                py: 2,
                width: "75%",
                marginTop: "1em",
              }}
              variant='contained'
              color='error'
              onClick={handleDelete}
              startIcon={<DeleteIcon />}>
              Delete
            </Button>
          )}
          {order.status === "processing" &&
            order.event.takeOrders &&
            user.role === "event-staff" && (
              <Button
                sx={{
                  py: 2,
                  width: "75%",
                }}
                variant='contained'
                color='error'
                onClick={handleCharge}
                startIcon={<AttachMoneyIcon />}>
                Charge
              </Button>
            )}
          <Divider />
          <CardActions onClick={handleExpandClick} disableSpacing>
            <Typography variant='body1'>Order Details</Typography>
            <ExpandMore
              expand={expanded}
              aria-expanded={expanded}
              aria-label='show more'>
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent>
              <Stack spacing={2}>
                {order.products.map((item) => {
                  return (
                    <Paper key={order._id} elevation={20}>
                      <Stack
                        py={4}
                        px={2}
                        spacing={2}
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'>
                        <Stack>
                          <Typography py={1} variant='body1' gutterBottom>
                            Item: {item.name}
                          </Typography>
                          <Typography py={1} variant='body1' gutterBottom>
                            Qty: {item.quantity}
                          </Typography>
                        </Stack>
                        <Stack>
                          <Typography py={1} variant='body1' gutterBottom>
                            Total: € {(item.quantity * item.price).toFixed(2)}
                          </Typography>
                          <Typography py={1} variant='body1' gutterBottom>
                            Price: € {item.price.toFixed(2)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Paper>
                  );
                })}
              </Stack>
            </CardContent>
          </Collapse>
        </Stack>
      )}
    </Card>
  );
}

export default Order;
