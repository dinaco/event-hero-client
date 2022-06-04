import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderTake() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const getToken = localStorage.getItem("authToken");

  const errorHandle = (message) => {
    toast.error(message, {
      position: "top-left",
      autoClose: 1000,
      closeOnClick: true,
      //hideProgressBar: true,
    });
  };

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
      navigate(`/order/${orderId}`);
    } catch (error) {
      errorHandle(error.response.data.errorMessage);
    }
  };
  useEffect(() => {
    orderPay();
  }, []);

  return (
    <div>
      <ToastContainer />
      Processing...
      <Link to='/'> Stuck? Go back to your account</Link>
    </div>
  );
}

export default OrderTake;
