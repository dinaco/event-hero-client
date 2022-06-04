import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import QrCode from "./QrCode";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Order() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState(null);

  const errorHandle = (message) => {
    toast.error(message, {
      position: "top-left",
      autoClose: 1000,
      closeOnClick: true,
      //hideProgressBar: true,
    });
  };

  const getToken = localStorage.getItem("authToken");

  const getOrderInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/order/status/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setOrder(response.data);
    } catch (err) {
      errorHandle(err.response.data.errorMessage);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_API_URL}/api/order/delete/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      navigate(`/event/${order.event._id}`);
    } catch (err) {
      errorHandle(err.response.data.errorMessage);
    }
  };

  const handleCharge = async () => {
    const body = {};
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_API_URL}/api/order/charge/${orderId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      navigate(`/orders/${order.event._id}`);
    } catch (err) {
      errorHandle(err.response.data.errorMessage);
    }
  };

  useEffect(() => {
    getOrderInfo();
  }, []);

  return (
    <div>
      <ToastContainer />
      {!order && <h2>Order Not Found</h2>}
      {order && (
        <div style={{ backgroundColor: order.bgColor }}>
          <h2>
            Amount €{order.total.toFixed(2)} @ {order.event.name}
          </h2>
          <h3>
            {order.status !== "completed" && user.role === "event-staff" && (
              <p>Customer: {order.customer.name}</p>
            )}
            {order.staff && user.role === "customer" && (
              <p>Staff: {order.staff.name}</p>
            )}{" "}
            Order Status: {order.status} | Order #{order._id.slice(-6)}{" "}
            {order.status !== "completed" && user.role === "customer" && (
              <Button
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
                  variant='contained'
                  color='error'
                  onClick={handleCharge}
                  startIcon={<DeleteIcon />}>
                  Charge
                </Button>
              )}
          </h3>
          {order.status === "pending" && user.role === "customer" && (
            <QrCode
              value={order._id}
              title={order.total.toFixed(2)}
              bgColor={order.bgColor}
            />
          )}
          <h4>Check the details of your order bellow</h4>
          {order.products.map((item) => {
            return (
              <div key={item._id}>
                <p>
                  Name: {item.name} | Qty: {item.quantity} | Price:{" "}
                  {item.price.toFixed(2)} | Total:{" "}
                  {(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Order;
