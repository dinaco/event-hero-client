import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

function MyEvents() {
  const [userInfo, setUserInfo] = useState(null);
  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/my-events`
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
          <h2>Hi, {userInfo.email}</h2>
          {userInfo.events.map((event) => {
            return (
              <p key={event._id}>
                <Link to={`/event/${event._id}`}>{event.name}</Link>
                <span> | {moment(event.date).format("DD/MM/YYYY")}</span>
              </p>
            );
          })}
        </>
      )}
    </div>
  );
}

export default MyEvents;
