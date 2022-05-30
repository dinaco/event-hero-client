import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function OrderPayment() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const orderPay = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/order/status/${orderId}`
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    orderPay();
  }, []);

  return <div></div>;
}

export default OrderPayment;
