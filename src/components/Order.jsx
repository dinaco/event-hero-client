import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import QrCode from "./QrCode";
import axios from "axios";

function Order() {
  const { orderId } = useParams();
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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrderInfo();
  }, []);

  return (
    <div>
      {!order && <h2>Loading...</h2>}
      {order && (
        <div style={{ backgroundColor: order.bgColor }}>
          <h2>My name is: {user.name}</h2>
          <h2>
            Total Amount to pay €{order.total.toFixed(2)} @ {order.event.name}
          </h2>
          <h3>Order Status: {order.status}</h3>
          <QrCode
            value={order._id}
            title={order.total.toFixed(2)}
            bgColor={order.bgColor}
          />
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
