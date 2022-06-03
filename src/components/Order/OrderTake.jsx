import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function OrderTake() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const getToken = localStorage.getItem("authToken");
  const orderPay = async () => {
    const body = {};
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_API_URL}/api/order/process/${orderId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      navigate(`/order/status/${orderId}`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    orderPay();
  }, []);

  return <div>Processing...</div>;
}

export default OrderTake;
