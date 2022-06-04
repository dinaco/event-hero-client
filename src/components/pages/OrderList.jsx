import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

function OrderList() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [ordersInfo, setOrdersInfo] = useState(null);
  const [totalSpent, setTotalSpent] = useState(0);
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
        const total = orders.reduce((a, b) => {
          if (b.status === "completed") {
            return a + b.total;
          } else return a;
        }, 0);
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
      {!userInfo && <h2>Loading...</h2>}
      {userInfo && (
        <>
          <img
            src={userInfo.events[0].splashImg}
            alt={userInfo.events[0].name}
            height='150px'
            width='100%'
          />
          <h2>
            {userInfo.events[0].name} | Total spent: {totalSpent} €
          </h2>
          <p>{moment(userInfo.events[0].date).format("DD/MM/YYYY")}</p>
          <p>{userInfo.events[0].description}</p>
          {ordersInfo < 1 && (
            <p>
              <b>No orders found for this event</b>
            </p>
          )}
          {ordersInfo.map((order) => {
            return (
              <p key={order._id} onClick={() => handleOrderDetails(order._id)}>
                <p>
                  Total: €{order.total.toFixed(2)} | Created at:{" "}
                  {moment(order.createdAt).format("DD/MM/YYYY - HH:mm")}
                </p>
                <p>
                  Status: {order.status} | Order #{order._id.slice(-6)}
                </p>
              </p>
            );
          })}
        </>
      )}
    </div>
  );
}

export default OrderList;
