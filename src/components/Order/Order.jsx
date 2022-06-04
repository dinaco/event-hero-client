import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import QrCode from "./QrCode";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function Order() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState(null);

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
      console.log(err.response.data.errorMessage);
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
      console.log(err.response.data.errorMessage);
    }
  };

  useEffect(() => {
    getOrderInfo();
  }, []);

  return (
    <div>
      {!order && <h2>Order Not Found</h2>}
      {order && (
        <div style={{ backgroundColor: order.bgColor }}>
          {order.status !== "completed" && <h2>My name is: {user.name}</h2>}
          <h2>
            Amount €{order.total.toFixed(2)} @ {order.event.name}
          </h2>
          <h3>
            {order.staff && <p>Staff: {order.staff.name}</p>} Order Status:{" "}
            {order.status} | Order #{order._id.slice(-6)}{" "}
            {order.status !== "completed" && (
              <Button
                variant='contained'
                color='error'
                onClick={handleDelete}
                startIcon={<DeleteIcon />}>
                Delete
              </Button>
            )}
          </h3>
          {order.status !== "completed" && (
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
