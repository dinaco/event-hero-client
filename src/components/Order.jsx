import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QrCode from "./QrCode";
import axios from "axios";

function Order() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const getOrderInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/order/status/${orderId}`
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
          <h2>My name is: username</h2>
          <h2>
            Total Amount to pay €{order.total} @ {order.event.name}
          </h2>
          <h3>Order Status: {order.status}</h3>
          <QrCode
            value={order._id}
            title={order.total}
            bgColor={order.bgColor}
          />
          <h4>Check the details of your order bellow</h4>
          {order.products.map((item) => {
            return (
              <div key={item._id}>
                <p>
                  Name: {item.name} | Qty: {item.quantity} | Price: {item.price}{" "}
                  | Total: {item.quantity * item.price}
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
