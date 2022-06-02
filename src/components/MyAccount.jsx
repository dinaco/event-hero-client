import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Ongoing from "./Ongoing";
import UpcomingEvents from "./UpcomingEvents";
import PastEvents from "./PastEvents";
import Balance from "./Balance";

function MyAccount() {
  let today = moment(new Date()).format();
  const [userInfo, setUserInfo] = useState(null);
  const getUserInfo = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/my-events`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      {!userInfo && <h2>Loading...</h2>}
      {userInfo && (
        <>
          <h2>Hi, {userInfo.name}</h2>
          <Balance balance={userInfo.balance} />
          <Ongoing userEvents={userInfo.events} today={today} />
          <UpcomingEvents userEvents={userInfo.events} today={today} />
          <PastEvents userEvents={userInfo.events} today={today} />
        </>
      )}
    </div>
  );
}

export default MyAccount;
